'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div className="flex item-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md text-center">
                <h1 className="text-2xl font-semibold mb-6">Login to Library App</h1>
                <button onClick={() => signIn('github')}
                    className="bg-black text-white px-2 py-4 hover:bg-gray-800 transition"   
                >
                    Sign In Using GitHub</button>
            </div>
        </div>
    )
}