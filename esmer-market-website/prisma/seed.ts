import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.reservation.deleteMany({});
  await prisma.inventoryLog.deleteMany({});
  await prisma.product.deleteMany({});
  
  // Create sample products
  const products = [
    {
      name: "Organic Baklava",
      description: "Traditional Turkish baklava made with organic honey and pistachios",
      price: 15.99,
      category: "Desserts",
      quantity: 20,
      imageUrl: "https://images.unsplash.com/photo-1625806335358-5f73219a2c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    },
    {
      name: "Turkish Delight Box",
      description: "Assorted Turkish delights in an elegant gift box",
      price: 12.99,
      category: "Sweets",
      quantity: 30,
      imageUrl: "https://images.unsplash.com/photo-1573958668642-df0c353a36dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    },
    {
      name: "Homemade Börek",
      description: "Fresh börek with feta cheese and spinach filling",
      price: 8.99,
      category: "Savory",
      quantity: 15,
      imageUrl: "https://images.unsplash.com/photo-1584737480447-2a743bb74f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
    console.log(`Created product: ${product.name}`);
  }
  
  console.log(`Database has been seeded with ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 