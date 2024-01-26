import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

import Image from "next/image";

export const AppLayout = ({ children }) => {
  const { user } = useUser();

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white bg-black p-2 overflow-hidden">

        <div>
          <Link href="/post/new" className="flex justify-between items-center transition-colors duration-500 hover:bg-gray-600 p-2 rounded-md">
            <div className="flex items-center gap-2">
              <Image src='/favicon.png' width={40} height={40} alt='logo' className="rounded-full" />
              <div className="font-bold text-lg">New Blog</div>
            </div>

            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-md"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        </div>

        <Link href="/topup" className="flex items-center justify-center">
          <Image src={"/token.png"} alt="token" width={50} height={50} />
          <div>
            0 tokens available
          </div>
        </Link>

        <div className="flex-1 overflow-auto">list of posts</div>

        <div className="flex gap-2 border-t-2 border-t-gray-400/50 pt-3">
          {user && (
            <>
              <Image
                src={user.picture}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className=" flex-1 px-2 py-1 rounded-md">
                <div className="font-bold">{user.name}</div>
                <Link className="text-small cursor-pointer"  href="/api/auth/logout">
                  Logout
                </Link>
              </div>
            </>
          )}
          {!user && (
            <div>
              <Link href="/api/auth/login">Login</Link>
            </div>
          )}
        </div>
      </div>
      <div className="bg-green-500">
        <div>IntelliBlog 1.0</div>
        {children}
      </div>
    </div>
  );
};
