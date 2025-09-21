import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const allProducts = [
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
  },
  {
    id: "5",
    name: "Handknit Wool Scarf",
    price: 65,
    description: "Soft merino wool scarf with traditional cable knit pattern",
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=300&fit=crop",
    artisan: "Anna Thompson",
    rating: 4.6,
    tags: ["clothing", "wool", "handknit"],
  },
  {
    id: "6",
    name: "Copper Wire Sculpture",
    price: 89,
    description: "Abstract copper wire sculpture with oxidized finish",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
    artisan: "Robert Kim",
    rating: 4.8,
    tags: ["sculpture", "copper", "abstract"],
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["all", "ceramic", "jewelry", "leather", "art", "clothing", "sculpture"];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === "all" || product.tags.includes(filterBy);
    
    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.featured ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Artisan Products
            </h1>
            <p className="text-muted-foreground">
              Discover {allProducts.length} unique handcrafted items from local artisans
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-lg p-6 mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search products, artisans, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {sortedProducts.length} of {allProducts.length} products</span>
              {searchTerm && (
                <span>Search results for "{searchTerm}"</span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;