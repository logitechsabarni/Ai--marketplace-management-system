import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Wallet, Coins } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface Profile {
  balance: number;
  tokens: number;
}

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (id && user) {
      fetchData();
    }
  }, [id, user]);

  const fetchData = async () => {
    try {
      // Fetch product
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, price, image_url")
        .eq("id", id)
        .single();

      if (productError) throw productError;

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("balance, tokens")
        .eq("user_id", user.id)
        .single();

      if (profileError) throw profileError;

      setProduct(productData);
      setProfile(profileData);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load checkout data",
      });
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!product || !profile || !user) return;

    setProcessing(true);
    try {
      let success = false;

      if (paymentMethod === "balance") {
        if (profile.balance >= product.price) {
          // Deduct from balance
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ balance: profile.balance - product.price })
            .eq("user_id", user.id);

          if (updateError) throw updateError;
          success = true;
        } else {
          throw new Error("Insufficient balance");
        }
      } else if (paymentMethod === "tokens") {
        const tokensRequired = Math.ceil(product.price * 10); // 1 token = $0.10
        if (profile.tokens >= tokensRequired) {
          // Deduct tokens
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ tokens: profile.tokens - tokensRequired })
            .eq("user_id", user.id);

          if (updateError) throw updateError;

          // Record token transaction
          await supabase
            .from("user_tokens")
            .insert({
              user_id: user.id,
              amount: -tokensRequired,
              transaction_type: "spent",
              description: `Purchase: ${product.name}`
            });

          success = true;
        } else {
          throw new Error("Insufficient tokens");
        }
      }

      if (success) {
        // Create order
        const { error: orderError } = await supabase
          .from("orders")
          .insert({
            buyer_id: user.id,
            product_id: product.id,
            total_amount: product.price,
            status: 'paid',
            payment_method: paymentMethod
          });

        if (orderError) throw orderError;

        toast({
          title: "Payment Successful!",
          description: `You have successfully purchased ${product.name}`,
        });

        navigate("/orders");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error.message,
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid gap-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {product && (
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="balance" id="balance" />
                    <Label htmlFor="balance" className="flex items-center gap-2 flex-1 cursor-pointer">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Account Balance</p>
                        <p className="text-sm text-muted-foreground">
                          Available: ${profile?.balance.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="tokens" id="tokens" />
                    <Label htmlFor="tokens" className="flex items-center gap-2 flex-1 cursor-pointer">
                      <Coins className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Tokens</p>
                        <p className="text-sm text-muted-foreground">
                          Available: {profile?.tokens || 0} tokens
                          {product && ` (Need ${Math.ceil(product.price * 10)} tokens)`}
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                    <RadioGroupItem value="stripe" id="stripe" disabled />
                    <Label htmlFor="stripe" className="flex items-center gap-2 flex-1">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-muted-foreground">Credit Card</p>
                        <p className="text-sm text-muted-foreground">Coming soon</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={processing || !product || !profile}
                className="flex-1"
              >
                {processing ? "Processing..." : `Pay $${product?.price.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;