import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Books() {

    const session = await getServerSession(nextAuthOptions);

    if (!session) {
        redirect('/api/auth/signin')
    }

    const books = await prisma.book.findMany({
        select: {
            id: true,
            name: true,
            bookAuthor: {
                include: {
                    author: true,
                }
            },
            isbn: true,
        },
        orderBy: { id: 'asc' },
    });

    return (
        <div className="p-6">
            <h3 className="text-xl mb-3">
                <Link href={`/`} className="text-blue-600"> Back to Dashboard</Link>
            </h3>
            <h1 className="text-2xl font-semibold mb-4">Books</h1>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">Id</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Authors</th>
                        <th className="border px-4 py-2 text-left">ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id} className="hover:bg-gray-50">
                            <td className="border px-4 py-2">
                                <Link href={`/dashboard/books/${book.id}`} className="text-blue-600 hover:underline">
                                    {book.id}
                                </Link>
                            </td>
                            <td className="border px-4 py-2">{book.name}</td>
                            <td className="border px-4 py-2">{book.bookAuthor.map(auth => auth.author.name).join(', ')}</td>
                            <td className="border px-4 py-2">{book.isbn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}