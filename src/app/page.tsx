'use client';

//import Image from "next/image";

import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        // redirect('/login');
        redirect('/api/auth/signin');
    }
    return (
        <div>
            <div className="p-3">
                <h1> Welcome, {session.user?.name}! </h1>
            </div>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Library Dashboard</h1>
                <table className="table-auto border border-black">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-2"> 
                                <Link href="/books" className="text-blue-600 underline hover:text-blue-800"> Books </Link> 
                            </th>
                            <th className="border border-black px-4 py-2"> 
                                <Link href="/authors" className="text-blue-600 underline hover:text-blue-800"> Authors </Link> 
                            </th>
                            <th className="border border-black px-4 py-2"> 
                                <Link href="/borrowers" className="text-blue-600 underline hover:text-blue-800"> Borrowers </Link> 
                            </th>
                            <th className="border border-black px-4 py-2"> 
                                <Link href="/borrow" className="text-blue-600 underline hover:text-blue-800"> Borrow </Link> 
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}
