import { ProductCard } from "@/components/products/ProductCard";

const featuredProducts = [
  {
    id: "1",
    name: "Handwoven Ceramic Bowl",
    price: 45,
    description: "Beautiful artisan-crafted ceramic bowl with traditional glazing techniques",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    artisan: "Sarah Chen",
    rating: 4.9,
    tags: ["ceramic", "handmade", "traditional"],
    featured: true,
  },
  {
    id: "2",
    name: "Wooden Statement Necklace",
    price: 28,
    description: "Eco-friendly wooden jewelry piece with intricate carved details",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    artisan: "Maya Rodriguez",
    rating: 4.8,
    tags: ["jewelry", "wood", "eco-friendly"],
    featured: true,
  },
  {
    id: "3",
    name: "Artisan Leather Tote",
    price: 120,
    description: "Premium handcrafted leather tote bag with hand-stitched details",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    artisan: "James Wilson",
    rating: 4.7,
    tags: ["leather", "bag", "handstitched"],
    featured: true,
  },
  {
    id: "4",
    name: "Watercolor Art Print",
    price: 35,
    description: "Original watercolor painting of local landscape, limited edition print",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    artisan: "Elena Hoffman",
    rating: 4.9,
    tags: ["art", "watercolor", "landscape"],
    featured: true,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured Artisan Creations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of exceptional handcrafted pieces from talented local artisans
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};