import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Coins, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserBalanceProps {
  user: any;
}

const UserBalance = ({ user }: UserBalanceProps) => {
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    if (user) {
      fetchBalance();
    }
  }, [user]);

  const fetchBalance = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("balance, tokens")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      
      setBalance(data.balance || 0);
      setTokens(data.tokens || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const addFunds = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ balance: balance + 100 })
        .eq("user_id", user.id);

      if (error) throw error;
      setBalance(balance + 100);
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const addTokens = async () => {
    try {
      const newTokens = tokens + 50;
      const { error } = await supabase
        .from("profiles")
        .update({ tokens: newTokens })
        .eq("user_id", user.id);

      if (error) throw error;

      // Record token transaction
      await supabase
        .from("user_tokens")
        .insert({
          user_id: user.id,
          amount: 50,
          transaction_type: "earned",
          description: "Bonus tokens"
        });

      setTokens(newTokens);
    } catch (error) {
      console.error("Error adding tokens:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex gap-4">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Wallet className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="font-bold">${balance.toFixed(2)}</p>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={addFunds}
            className="ml-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-accent/10 to-accent/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Coins className="h-5 w-5 text-accent-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Tokens</p>
            <p className="font-bold">{tokens}</p>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={addTokens}
            className="ml-2"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBalance;