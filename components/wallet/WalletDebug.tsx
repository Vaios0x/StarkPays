"use client";

import { useState, useEffect } from "react";
import { getStarknet } from "@starknet-io/get-starknet-core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function WalletDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkWalletStatus = async () => {
    setIsLoading(true);
    try {
      const starknet = getStarknet();
      const info: any = {
        starknetAvailable: !!starknet,
        timestamp: new Date().toISOString(),
      };

      if (starknet) {
        try {
          info.isPreauthorized = await (starknet as any).isPreauthorized();
        } catch (e) {
          info.isPreauthorizedError = e;
        }

        try {
          info.account = await (starknet as any).account;
        } catch (e) {
          info.accountError = e;
        }

        try {
          info.availableWallets = await starknet.getAvailableWallets();
        } catch (e) {
          info.availableWalletsError = e;
        }

        try {
          info.wallet = await starknet.enable();
        } catch (e) {
          info.walletError = e;
        }
      }

      setDebugInfo(info);
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkWalletStatus();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Debug de Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={checkWalletStatus} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Verificando..." : "Verificar Estado"}
        </Button>

        {debugInfo && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">Starknet Disponible:</span>
              {debugInfo.starknetAvailable ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Sí
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  No
                </Badge>
              )}
            </div>

            {debugInfo.isPreauthorized !== undefined && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Preautorizado:</span>
                {debugInfo.isPreauthorized ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Sí
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="w-3 h-3 mr-1" />
                    No
                  </Badge>
                )}
              </div>
            )}

            {debugInfo.account && (
              <div>
                <span className="font-medium">Cuenta:</span>
                <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                  {debugInfo.account.address || "Sin dirección"}
                </div>
              </div>
            )}

            {debugInfo.availableWallets && (
              <div>
                <span className="font-medium">Wallets Disponibles:</span>
                <div className="mt-1 space-y-1">
                  {debugInfo.availableWallets.map((wallet: any, index: number) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {wallet.name || wallet.id || "Unknown"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {debugInfo.error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-4 h-4" />
                <span>Error: {debugInfo.error}</span>
              </div>
            )}

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded">
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
