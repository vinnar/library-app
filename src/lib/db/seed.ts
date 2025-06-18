import { PrismaClient, Book } from '@prisma/client';
import seedData from "./../../../tmp/seed_book_data.json";

const prisma = new PrismaClient();

async function seedIfNeeded(force = false) {
    const existing = await prisma.book.count();
    if (existing > 0 && !force) {
        console.log("Seed skipped: table not empty.");
        return;
    }

    for (const item of seedData) {
        await prisma.book.create({
            data: {
                name: item.title,
                description: item.description.join(' '),
                publishedAt: item.date || 'NA',
                isbn: item.call_number[0] || 'NA',
                bookAuthor: {
                    create: item.authors.map(author => ({
                        author: {
                            create: {
                                name: author
                            }
                        }
                    }))
                },
            }
        });
    }

    console.log("✅ Seeding complete.");
}

seedIfNeeded(process.argv.includes('--force'));
