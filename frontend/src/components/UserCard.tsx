import React from "react";
import Loading from "./Loading";
import Image from "next/image";
import { IUser } from "@/interfaces/user";

interface Props {
  user: IUser | null;
  isRandom?: boolean;
  onClick?: () => void
}

export default function UserCard({ user, isRandom = false, onClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] p-4">
      {user ? (
        <div className="bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ffce00] shadow-lg mb-6 group relative">
              <Image
                src={user.big_avatar}
                alt={user.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
              {isRandom && (<button
                className="cursor-pointer absolute inset-0 flex items-center justify-center bg-gray-700/80 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                type="button"
                onClick={onClick}
              >
                Другой человек
              </button>)}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {user.name} {user.surname}
          </h1>
          <span className="text-[#ffce00] text-base font-semibold uppercase mb-4 tracking-widest">
            {user.gender}
          </span>
          <div className="bg-white/10 rounded-xl p-5 w-full flex flex-col gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-semibold">Телефон:</span>
              <span className="text-white/90">{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-semibold">Email:</span>
              <span className="text-white/90">{user.email}</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-5 w-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-semibold">Адрес:</span>
              <span className="text-white/90">
                {user.street_name} {user.street_number}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-semibold">Город:</span>
              <span className="text-white/90">{user.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 font-semibold">Страна:</span>
              <span className="text-white/90">{user.country}</span>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
