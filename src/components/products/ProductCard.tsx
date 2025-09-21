import { Heart, Star, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  artisan: string;
  rating: number;
  tags: string[];
  featured?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  artisan,
  rating,
  tags,
  featured = false,
}: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <Card 
      className="group cursor-pointer hover:shadow-elegant transition-all duration-300 overflow-hidden"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-foreground"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-white/90 text-foreground"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span>{rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">by {artisan}</span>
            <span className="font-bold text-lg text-primary">${price}</span>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${id}`);
              }}
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-primary hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/checkout/${id}`);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;