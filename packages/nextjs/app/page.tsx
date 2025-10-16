import Link from "next/link";
import Image from "next/image";
import { ConnectedAddress } from "~~/components/ConnectedAddress";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Home = () => {
  // Read contract data
  const { data: paymentStats } = useScaffoldReadContract({
    contractName: "PaymentProcessor",
    functionName: "get_stats",
  });

  const { data: vaultStats } = useScaffoldReadContract({
    contractName: "RemesaVault", 
    functionName: "get_platform_stats",
  });

  const { data: tandaCount } = useScaffoldReadContract({
    contractName: "TandaSavings",
    functionName: "get_tanda_count",
  });

  return (
    <div className="flex items-center flex-col grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Welcome to</span>
          <span className="block text-4xl font-bold">StarkPays</span>
        </h1>
        <ConnectedAddress />
        <p className="text-center text-lg">
          Plataforma de pagos y remesas descentralizada en Starknet
        </p>
      </div>

      {/* Contract Stats Dashboard */}
      <div className="bg-container grow w-full mt-16 px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* PaymentProcessor Stats */}
          <div className="flex flex-col bg-base-100 relative text-[12px] px-6 py-8 text-center items-center max-w-sm rounded-3xl border border-gradient">
            <div className="trapeze"></div>
            <h3 className="text-xl font-bold mb-4 text-primary">PaymentProcessor</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Total Volume:</span>{" "}
                {paymentStats ? `${paymentStats[0]?.toString() || "0"} ETH` : "Loading..."}
              </p>
               <p className="text-sm">
                 <span className="font-semibold">Transactions:</span>{" "}
                 {paymentStats ? `${paymentStats[1]?.toString() || "0"}` : "Loading..."}
               </p>
            </div>
            <Link href="/debug" className="btn btn-primary btn-sm mt-4">
              Interact with Contract
            </Link>
          </div>

          {/* RemesaVault Stats */}
          <div className="flex flex-col bg-base-100 relative text-[12px] px-6 py-8 text-center items-center max-w-sm rounded-3xl border border-gradient">
            <div className="trapeze"></div>
            <h3 className="text-xl font-bold mb-4 text-secondary">RemesaVault</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Platform Volume:</span>{" "}
                {vaultStats ? `${vaultStats[0]?.toString() || "0"} ETH` : "Loading..."}
              </p>
               <p className="text-sm">
                 <span className="font-semibold">Total Transfers:</span>{" "}
                 {vaultStats ? `${vaultStats[1]?.toString() || "0"}` : "Loading..."}
               </p>
            </div>
            <Link href="/debug" className="btn btn-secondary btn-sm mt-4">
              Manage Vault
            </Link>
          </div>

          {/* TandaSavings Stats */}
          <div className="flex flex-col bg-base-100 relative text-[12px] px-6 py-8 text-center items-center max-w-sm rounded-3xl border border-gradient">
            <div className="trapeze"></div>
            <h3 className="text-xl font-bold mb-4 text-accent">TandaSavings</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Active Tandas:</span>{" "}
                {tandaCount ? `${tandaCount.toString()}` : "Loading..."}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span> Active
              </p>
            </div>
            <Link href="/debug" className="btn btn-accent btn-sm mt-4">
              Create Tanda
            </Link>
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="bg-base-100 rounded-3xl p-8 border border-gradient">
          <h2 className="text-2xl font-bold text-center mb-6">Deployed Contracts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-bold text-primary mb-2">PaymentProcessor</h3>
              <p className="text-xs break-all bg-base-200 p-2 rounded">
                0x7188039bb062bfa53b24c7d529301c9f0495abe1ef660788f4a12d86394e508
              </p>
              <Link 
                href="https://sepolia.starkscan.co/contract/0x7188039bb062bfa53b24c7d529301c9f0495abe1ef660788f4a12d86394e508"
                target="_blank"
                className="link link-primary text-xs mt-2"
              >
                View on Starkscan
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-secondary mb-2">RemesaVault</h3>
              <p className="text-xs break-all bg-base-200 p-2 rounded">
                0x6d919b7463697668ca357e40e33c488d28f84eed55914c98a6a5bfc7feff9a0
              </p>
              <Link 
                href="https://sepolia.starkscan.co/contract/0x6d919b7463697668ca357e40e33c488d28f84eed55914c98a6a5bfc7feff9a0"
                target="_blank"
                className="link link-secondary text-xs mt-2"
              >
                View on Starkscan
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-accent mb-2">TandaSavings</h3>
              <p className="text-xs break-all bg-base-200 p-2 rounded">
                0x6efe48d74ebdea9c5b797b399808a0f3770346cf7cdd6e240a06be5ea06e482
              </p>
              <Link 
                href="https://sepolia.starkscan.co/contract/0x6efe48d74ebdea9c5b797b399808a0f3770346cf7cdd6e240a06be5ea06e482"
                target="_blank"
                className="link link-accent text-xs mt-2"
              >
                View on Starkscan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
