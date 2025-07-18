import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import HomeClient from "./../components/HomeClient";

export async function Dashboard() {

    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return <HomeClient user={session.user} />;
}