// Purely presentational — turns 8808249851 into "88082 49851"
// so it reads more like a phone number in the UI.
export const formatPhone = (phone) => {
    const digits = String(phone);
    if (digits.length !== 10) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5)}`;
};

// "uttarpradesh,india" -> "Uttarpradesh, India"
export const formatAddress = (address = '') =>
    address
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(', ');

export const getInitials = (firstName = '', lastName = '') =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();