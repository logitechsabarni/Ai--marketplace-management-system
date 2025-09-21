import { useState } from "react";
import { Upload as UploadIcon, Camera, Tag, DollarSign, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    
    // Simulate AI analysis
    if (files.length > 0) {
      setIsAnalyzing(true);
      setTimeout(() => {
        // Mock AI-generated tags based on image analysis
        const mockTags = ["handmade", "artisan", "unique", "crafted", "traditional"];
        setAiTags(mockTags);
        setIsAnalyzing(false);
        toast({
          title: "AI Analysis Complete",
          description: "Product tags have been automatically generated!",
        });
      }, 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Listed Successfully!",
      description: "Your handcrafted item is now available in the marketplace.",
    });
    
    // Reset form
    setFormData({ name: "", price: "", description: "", category: "" });
    setSelectedFiles([]);
    setAiTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              List Your Artisan Product
            </h1>
            <p className="text-muted-foreground">
              Share your handcrafted creations with the community. Our AI will help optimize your listing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Product Images</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <UploadIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload Product Images
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop or click to select images
                    </p>
                    <Button type="button" variant="outline">
                      Choose Files
                    </Button>
                  </label>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Selected Images ({selectedFiles.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm">{file.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Tags */}
                {isAnalyzing && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm text-primary">AI is analyzing your images...</span>
                    </div>
                  </div>
                )}

                {aiTags.length > 0 && (
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">AI-Generated Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {aiTags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Product Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Product Name</label>
                    <Input
                      placeholder="e.g., Handwoven Ceramic Bowl"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Price (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="number"
                        placeholder="45.00"
                        className="pl-10"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Input
                    placeholder="e.g., Ceramics, Jewelry, Art"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    placeholder="Describe your handcrafted item, materials used, techniques, and what makes it special..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 px-12"
                disabled={!selectedFiles.length || !formData.name || !formData.price}
              >
                List Product
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Upload;