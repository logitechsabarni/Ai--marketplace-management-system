import { Brain, Camera, MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Camera,
    title: "AI Image Recognition",
    description: "Our AI automatically tags and categorizes artisan products from photos, making discovery effortless.",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Brain,
    title: "Smart Recommendations",
    description: "Get personalized product suggestions based on your preferences and browsing history.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: MessageCircle,
    title: "Multilingual Support",
    description: "Chat with our AI assistant in your preferred language for seamless communication.",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "AI-powered quality checks ensure authentic, high-quality handcrafted products.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
];

export const AIFeatures = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Brain className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wide">AI-Powered Features</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Experience the Future of
            <span className="block bg-gradient-accent bg-clip-text text-transparent">
              Artisan Discovery
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our advanced AI technology enhances every aspect of your artisan marketplace experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-primary">✨ More AI features coming soon</span>
          </div>
        </div>
      </div>
    </section>
  );
};