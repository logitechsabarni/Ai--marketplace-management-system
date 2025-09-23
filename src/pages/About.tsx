import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe, Heart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const About = () => {
  const stats = [
    { icon: Users, label: "Active Artisans", value: "500+" },
    { icon: Award, label: "Handcrafted Products", value: "2,000+" },
    { icon: Globe, label: "Countries Served", value: "50+" },
    { icon: Heart, label: "Happy Customers", value: "10,000+" },
  ];

  const values = [
    {
      title: "Authentic Craftsmanship",
      description: "Every product is handmade by skilled artisans who have perfected their craft over generations.",
    },
    {
      title: "Fair Trade",
      description: "We ensure fair compensation for all artisans, supporting sustainable livelihoods.",
    },
    {
      title: "Cultural Preservation",
      description: "By supporting traditional crafts, we help preserve cultural heritage for future generations.",
    },
    {
      title: "Quality Assurance",
      description: "Each product undergoes careful quality checks to ensure it meets our high standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-primary">ArtisanConnect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connecting you with authentic, handcrafted treasures from skilled artisans around the world. 
            Every purchase supports traditional craftsmanship and sustainable communities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="text-center p-6">
                <CardContent className="pt-6">
                  <IconComponent className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <Card className="mb-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We believe that behind every handcrafted item lies a story of passion, tradition, and skill. 
              Our mission is to bridge the gap between talented artisans and customers who appreciate authentic, 
              sustainable, and beautifully crafted products. Through our platform, we empower artisans to reach 
              a global audience while preserving time-honored crafting techniques.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-6 opacity-90">
              Discover unique handcrafted products and support artisans worldwide
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explore Products
            </a>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;