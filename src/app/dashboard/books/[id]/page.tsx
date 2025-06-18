import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BookDetailsPageProps {
    params: { id: string };
}

export default async function BookDetailsPage({ params }:BookDetailsPageProps) {
    const bookId = parseInt(params.id, 10);

    if (isNaN(bookId)) return notFound();

    const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: {
            bookAuthor: {
                include: { author: true },
            },
        },
    });

    if (!book) return notFound();

    const authorNames = book.bookAuthor.map(author => author.author.name).join(', ');

    return (
        <div className="p-6 max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-600 mb-4 space-x-1">
                <Link href={`/`} className="text-blue-600">Home</Link>
                <span>/</span>
                <Link href={`/dashboard/books`} className="text-blue-600">Books</Link>
                <span>/</span>
                <span>Book {book.id}</span>
            </nav>
            
            {/* Back Button */}
            <div className="mb-4">
                <Link href={`/dashboard/books`} className="inline-block text-sm text-blue-600"> Back to Book Lisk</Link>
            </div>

            {/* Book Details Card */}
            <h1 className="text-2xl font-semibold mb-4"> Book Details</h1>
            <div className="p-4 rounded-md shadow-sm max-w-md">
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="border font-medium px-4 py-2">Id</td>
                            <td className="border font-medium px-4 py-2">{book.id}</td>
                        </tr>
                        <tr>
                            <td className="border font-medium px-4 py-2">Name</td>
                            <td className="border font-medium px-4 py-2">{book.name}</td>
                        </tr>
                        <tr>
                            <td className="border font-medium px-4 py-2">Authors</td>
                            <td className="border font-medium px-4 py-2">{authorNames || '-'}</td>
                        </tr>
                        <tr>
                            <td className="border font-medium px-4 py-2">ISBN</td>
                            <td className="border font-medium px-4 py-2">{book.isbn}</td>
                        </tr>
                        <tr>
                            <td className="border font-medium px-4 py-2">Description</td>
                            <td className="border font-medium px-4 py-2">{book.description}</td>
                        </tr>
                        <tr>
                            <td className="border font-medium px-4 py-2">Year Published</td>
                            <td className="border font-medium px-4 py-2">{book.publishedAt || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}