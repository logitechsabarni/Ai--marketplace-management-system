import { Palette, Gem, Home, Shirt, Coffee, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "Art & Prints",
    icon: Palette,
    count: 124,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    name: "Jewelry",
    icon: Gem,
    count: 89,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    name: "Home Decor",
    icon: Home,
    count: 156,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    name: "Clothing",
    icon: Shirt,
    count: 67,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    name: "Ceramics",
    icon: Coffee,
    count: 43,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    name: "Gifts",
    icon: Gift,
    count: 92,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
];

export const Categories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground">
            Find exactly what you're looking for in our curated categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} items
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};