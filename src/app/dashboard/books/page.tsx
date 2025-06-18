import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function Books() {

    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    return (
        <div>
            This is the Books list page.
        </div>
    )
}