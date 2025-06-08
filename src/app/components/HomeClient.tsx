
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeClient({ user }: { user: { name?: string | null }} ) {

    const [ darkMode, setDarkMode ] = useState(false);
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className="p-1 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="mb-4 px-4 py-2 border rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
            >
                Toggle {darkMode? 'Light' : 'Dark'} Mode
            </button>

            <div className="p-3">
                <h1>Welcome, {user?.name}!</h1>
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
