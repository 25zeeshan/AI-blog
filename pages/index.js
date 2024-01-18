import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      This is home page
      {user && (
        <div>
          <Image src={user.picture} alt={user.name} width={50} height={50} />
          <div>{user.email}</div>

          <div>
            <Link href="/api/auth/logout">Logout</Link>
          </div>
        </div>
      )}
      {!user && (
        <div>
          <Link href="/api/auth/login">Login</Link>
        </div>
      )}
    </div>
  );
}
