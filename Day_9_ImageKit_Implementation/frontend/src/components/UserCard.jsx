import React, { useState } from 'react';
import { Mail, Phone, MapPin, BadgeCheck } from 'lucide-react';
import { formatPhone, formatAddress, getInitials } from '../utils/formatters';

const UserCard = ({ user }) => {
    const { firstName, lastName, email, phone, address, image } = user;
    const [imgOk, setImgOk] = useState(true);
    const fullName = `${firstName} ${lastName}`;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1.5">
            {/* Banner */}
            <div className="relative h-24 w-full overflow-hidden">
                {imgOk ? (
                    <img
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full scale-125 object-cover opacity-40 blur-lg"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-violet-600/40 to-teal-400/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A17] via-[#0B0A17]/10 to-transparent" />
            </div>

            {/* Avatar overlapping the banner */}
            <div className="absolute left-1/2 top-9 -translate-x-1/2">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-[3px] border-[#120E1F] bg-gradient-to-br from-violet-500 to-teal-400 shadow-lg">
                    {imgOk ? (
                        <img
                            src={image}
                            alt={fullName}
                            onError={() => setImgOk(false)}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-white">
                            {getInitials(firstName, lastName)}
                        </span>
                    )}
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#120E1F] bg-teal-400">
                    <BadgeCheck size={13} className="text-[#0B0A17]" strokeWidth={2.5} />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-14">
                <div className="text-center">
                    <h3
                        className="text-base font-semibold text-violet-50"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        {fullName}
                    </h3>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal-300/70">
                        Member
                    </span>
                </div>

                <div className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                    <InfoRow icon={Mail} text={email} />
                    <InfoRow icon={Phone} text={formatPhone(phone)} />
                    <InfoRow icon={MapPin} text={formatAddress(address)} />
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-2.5 text-[13px] text-violet-100/80">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-violet-300">
            <Icon size={12} strokeWidth={2.25} />
        </span>
        <span className="truncate">{text}</span>
    </div>
);

export default UserCard;