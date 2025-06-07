//import Image from "next/image";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        // redirect('/login');
        redirect('/api/auth/signin');
    }
    return (
        <div className="p-6">
            <h1> Welcome, {session.user?.name}! </h1>
        </div>
    );
}
