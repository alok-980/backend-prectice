// Seeds 10,000,000 users into MongoDB -> db: "index", collection: "users"
// Run: npm install mongodb && node seed-users.js

const { MongoClient } = require("mongodb");

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "index";
const COLLECTION = "users";

const TOTAL = 10_000_000;
const BATCH_SIZE = 10_000; // docs per insertMany
const CONCURRENCY = 4;     // parallel insert workers

const FIRST_NAMES = ["Aarav", "Vivaan", "Aditya", "Ananya", "Diya", "Isha", "Rohan", "Priya", "Arjun", "Neha",
    "John", "Emma", "Liam", "Olivia", "Noah", "Sophia", "Lucas", "Mia", "Ethan", "Ava",
    "Mohammed", "Fatima", "Chen", "Wei", "Yuki", "Hiroshi", "Carlos", "Sofia", "Hans", "Anna"];
const LAST_NAMES = ["Sharma", "Verma", "Singh", "Gupta", "Patel", "Khan", "Kumar", "Mishra", "Yadav", "Reddy",
    "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Müller", "Schmidt",
    "Wang", "Li", "Zhang", "Tanaka", "Sato", "Silva", "Santos", "Ali", "Hassan", "Rossi"];

const LOCATIONS = [
    { country: "India", cities: ["Delhi", "Mumbai", "Bengaluru", "Lucknow", "Kolkata", "Chennai", "Hyderabad", "Pune"] },
    { country: "USA", cities: ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston"] },
    { country: "UK", cities: ["London", "Manchester", "Birmingham", "Leeds"] },
    { country: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"] },
    { country: "Japan", cities: ["Tokyo", "Osaka", "Kyoto", "Nagoya"] },
    { country: "Brazil", cities: ["São Paulo", "Rio de Janeiro", "Brasília"] },
    { country: "Canada", cities: ["Toronto", "Vancouver", "Montreal"] },
    { country: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"] },
];

const ROLES = ["user", "admin", "moderator", "editor", "viewer"];
const ROLE_WEIGHTS = [70, 2, 3, 10, 15]; // percent, sums to 100

const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];

function pickRole() {
    let r = rand(100);
    for (let i = 0; i < ROLES.length; i++) {
        if (r < ROLE_WEIGHTS[i]) return ROLES[i];
        r -= ROLE_WEIGHTS[i];
    }
    return "user";
}

const NOW = Date.now();
const THREE_YEARS_MS = 3 * 365 * 24 * 60 * 60 * 1000;

function makeUser(i) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const loc = pick(LOCATIONS);
    return {
        name: `${first} ${last}`,
        // index `i` guarantees a unique email
        email: `${first}.${last}.${i}@example.com`.toLowerCase(),
        age: 18 + rand(63), // 18–80
        city: pick(loc.cities),
        country: loc.country,
        role: pickRole(),
        createdAt: new Date(NOW - rand(THREE_YEARS_MS)),
    };
}

function makeBatch(start, size) {
    const docs = new Array(size);
    for (let i = 0; i < size; i++) docs[i] = makeUser(start + i);
    return docs;
}

async function main() {
    const client = new MongoClient(URI);
    await client.connect();
    const col = client.db(DB_NAME).collection(COLLECTION);

    console.log(`Connected. Inserting ${TOTAL.toLocaleString()} users into ${DB_NAME}.${COLLECTION}...`);

    let nextStart = 0;
    let inserted = 0;
    const t0 = Date.now();

    async function worker() {
        while (true) {
            const start = nextStart;
            if (start >= TOTAL) return;
            nextStart += BATCH_SIZE;
            const size = Math.min(BATCH_SIZE, TOTAL - start);

            await col.insertMany(makeBatch(start, size), { ordered: false });

            inserted += size;
            if (inserted % 100_000 === 0 || inserted === TOTAL) {
                const secs = (Date.now() - t0) / 1000;
                console.log(
                    `${inserted.toLocaleString()} / ${TOTAL.toLocaleString()} ` +
                    `(${((inserted / TOTAL) * 100).toFixed(1)}%) - ${Math.round(inserted / secs)} docs/sec`
                );
            }
        }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    // Create indexes after the bulk insert (much faster than before)
    console.log("Creating indexes...");
    await col.createIndex({ email: 1 }, { unique: true });
    await col.createIndex({ country: 1, city: 1 });

    console.log(`Done in ${((Date.now() - t0) / 1000 / 60).toFixed(2)} minutes.`);
    await client.close();
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});