import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export function PayWithChipiButton({
  costumerWallet,
  amountUsd,
  label = "Pay with Chipi",
}: {
  costumerWallet: any;
  amountUsd: number;
  label?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const pay = async () => {
    setIsLoading(true);
    
    try {
      // Simulate payment for development
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 8);
      toast.success("Payment successful ✨ (Demo Mode)", { 
        position: "bottom-center",
        description: `Transaction: ${mockTxHash}...`
      });
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error("Error in payment", { 
        position: "bottom-center",
        description: error.message || "Unknown error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={pay} 
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all"
      tabIndex={0}
      aria-label={`${label} - ${amountUsd} USD`}
    >
      {isLoading ? "Processing..." : label}
    </Button>
  );
}
