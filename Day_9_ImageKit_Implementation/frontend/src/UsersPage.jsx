import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import AuroraBackground from './components/AuroraBackground';
import UserCard from './components/UserCard';
import { useGoogleFonts } from './hooks/useGoogleFonts';
import { axiosInstance } from './config/axiosInstance';

const UsersPage = () => {
    useGoogleFonts();

    const [users, setUsers] = useState([]);
    const [totalUser, setTotalUser] = useState(null);

    const fetchAllUser = async () => {
        try {
            let res = await axiosInstance.get('/getAllUser')
            console.log(res.data)
            setUsers(res.data.data)
            setTotalUser(res.data.totalUser)
        } catch (error) {
            console.log('getAll user api error: ', error)
        }
    }

    useEffect(() => {
        fetchAllUser()
    }, [])

    return (
        <div
            className="relative min-h-screen w-full px-6 py-14"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <AuroraBackground />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-10 flex flex-col items-center gap-2 text-center">
                    <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-300/80">
                        <Users size={12} />
                        {totalUser} {totalUser === 1 ? 'member' : 'members'}
                    </span>
                    <h1
                        className="text-3xl font-semibold text-violet-50"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        Member directory
                    </h1>
                    <p className="text-sm text-violet-200/50">
                        Everyone who's signed up, at a glance.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersPage;