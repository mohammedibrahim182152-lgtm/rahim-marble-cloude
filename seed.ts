import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed testimonials
  await prisma.testimonial.createMany({
    data: [
      { name: "Rajesh Sharma", location: "Delhi", rating: 5, review: "Rahim Marble Company transformed our entire home with stunning Italian marble. The quality is exceptional and the team was highly professional.", product: "Italian Marble Flooring", active: true, order: 1 },
      { name: "Priya Mehta", location: "Gurgaon", rating: 5, review: "We ordered a custom marble dining table and the craftsmanship exceeded our expectations. Every detail was perfect.", product: "Custom Marble Dining Table", active: true, order: 2 },
      { name: "Anil Kumar", location: "Noida", rating: 5, review: "The marble mandir they crafted for our home is a masterpiece. The carving details are incredible and the white Makrana marble glows beautifully.", product: "Marble Mandir", active: true, order: 3 },
    ],
    skipDuplicates: true,
  });

  // Seed products
  await prisma.product.createMany({
    data: [
      { name: "Italian Marble", category: "Natural Marble", description: "Exquisite Italian marble sourced directly from Carrara, Calacatta, and Statuario quarries.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", featured: true, active: true, order: 1 },
      { name: "Onyx Marble", category: "Natural Marble", description: "Translucent and stunning onyx marble that glows when backlit. Available in green, honey, red, and white varieties.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", featured: true, active: true, order: 2 },
      { name: "Makrana Marble", category: "Indian Marble", description: "The legendary white marble from Makrana, Rajasthan — the same marble used in the Taj Mahal.", image: "https://images.unsplash.com/photo-1574739782594-db4ead022697?w=600&q=80", featured: true, active: true, order: 3 },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
