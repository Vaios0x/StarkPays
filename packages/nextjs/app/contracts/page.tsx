import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useState } from "react";
import { parseEther } from "viem";

const ContractsPage = () => {
  const [merchantAddress, setMerchantAddress] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [tandaName, setTandaName] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

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

  // Write contract functions
  const { writeContractAsync: processPayment } = useScaffoldWriteContract({
    contractName: "PaymentProcessor",
    functionName: "process_payment",
  });

  const { writeContractAsync: initiateTransfer } = useScaffoldWriteContract({
    contractName: "RemesaVault",
    functionName: "initiate_transfer",
  });

  const { writeContractAsync: completeTransfer } = useScaffoldWriteContract({
    contractName: "RemesaVault",
    functionName: "complete_transfer",
  });

  const { writeContractAsync: createTanda } = useScaffoldWriteContract({
    contractName: "TandaSavings",
    functionName: "create_tanda",
  });

  const { writeContractAsync: joinTanda } = useScaffoldWriteContract({
    contractName: "TandaSavings",
    functionName: "join_tanda",
  });

  const { writeContractAsync: contribute } = useScaffoldWriteContract({
    contractName: "TandaSavings",
    functionName: "contribute",
  });

  const handleProcessPayment = async () => {
    if (!merchantAddress || !paymentAmount) return;
    
    try {
      await processPayment({
        args: [merchantAddress, BigInt(paymentAmount)],
      });
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleInitiateTransfer = async () => {
    if (!transferTo || !transferAmount) return;
    
    try {
      await initiateTransfer({
        args: [transferTo, BigInt(transferAmount)],
      });
    } catch (error) {
      console.error("Error initiating transfer:", error);
    }
  };

  const handleCompleteTransfer = async () => {
    if (!transferTo || !transferAmount) return;
    
    try {
      await completeTransfer({
        args: [transferTo, BigInt(transferAmount)],
      });
    } catch (error) {
      console.error("Error completing transfer:", error);
    }
  };

  const handleCreateTanda = async () => {
    if (!tandaName || !contributionAmount || !maxMembers || !tokenAddress) return;
    
    try {
      await createTanda({
        args: [tandaName, BigInt(contributionAmount), BigInt(maxMembers), tokenAddress],
      });
    } catch (error) {
      console.error("Error creating tanda:", error);
    }
  };

  const handleJoinTanda = async () => {
    const tandaId = prompt("Enter Tanda ID:");
    if (!tandaId) return;
    
    try {
      await joinTanda({
        args: [BigInt(tandaId)],
      });
    } catch (error) {
      console.error("Error joining tanda:", error);
    }
  };

  const handleContribute = async () => {
    const tandaId = prompt("Enter Tanda ID:");
    if (!tandaId) return;
    
    try {
      await contribute({
        args: [BigInt(tandaId)],
      });
    } catch (error) {
      console.error("Error contributing:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">StarkPays Contracts</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-xl font-bold text-primary mb-4">PaymentProcessor</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Total Volume:</span> {paymentStats ? `${paymentStats[0]?.toString() || "0"}` : "Loading..."}</p>
            <p><span className="font-semibold">Transactions:</span> {paymentStats ? `${paymentStats[1]?.toString() || "0"}` : "Loading..."}</p>
          </div>
        </div>
        
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-xl font-bold text-secondary mb-4">RemesaVault</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Platform Volume:</span> {vaultStats ? `${vaultStats[0]?.toString() || "0"}` : "Loading..."}</p>
            <p><span className="font-semibold">Total Transfers:</span> {vaultStats ? `${vaultStats[1]?.toString() || "0"}` : "Loading..."}</p>
          </div>
        </div>
        
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-xl font-bold text-accent mb-4">TandaSavings</h3>
          <div className="space-y-2">
            <p><span className="font-semibold">Active Tandas:</span> {tandaCount ? `${tandaCount.toString()}` : "Loading..."}</p>
            <p><span className="font-semibold">Status:</span> Active</p>
          </div>
        </div>
      </div>

      {/* Contract Interactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PaymentProcessor */}
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-2xl font-bold text-primary mb-6">PaymentProcessor</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Merchant Address</label>
              <input
                type="text"
                value={merchantAddress}
                onChange={(e) => setMerchantAddress(e.target.value)}
                className="input input-bordered w-full"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (wei)</label>
              <input
                type="text"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="input input-bordered w-full"
                placeholder="1000000000000000000"
              />
            </div>
            <button
              onClick={handleProcessPayment}
              className="btn btn-primary w-full"
              disabled={!merchantAddress || !paymentAmount}
            >
              Process Payment
            </button>
          </div>
        </div>

        {/* RemesaVault */}
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-2xl font-bold text-secondary mb-6">RemesaVault</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Transfer To</label>
              <input
                type="text"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="input input-bordered w-full"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount (wei)</label>
              <input
                type="text"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="input input-bordered w-full"
                placeholder="1000000000000000000"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInitiateTransfer}
                className="btn btn-secondary flex-1"
                disabled={!transferTo || !transferAmount}
              >
                Initiate Transfer
              </button>
              <button
                onClick={handleCompleteTransfer}
                className="btn btn-outline btn-secondary flex-1"
                disabled={!transferTo || !transferAmount}
              >
                Complete Transfer
              </button>
            </div>
          </div>
        </div>

        {/* TandaSavings */}
        <div className="bg-base-100 p-6 rounded-lg border border-gradient">
          <h3 className="text-2xl font-bold text-accent mb-6">TandaSavings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tanda Name</label>
              <input
                type="text"
                value={tandaName}
                onChange={(e) => setTandaName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="My Tanda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contribution Amount (wei)</label>
              <input
                type="text"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                className="input input-bordered w-full"
                placeholder="1000000000000000000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Members</label>
              <input
                type="text"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="input input-bordered w-full"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Token Address</label>
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="input input-bordered w-full"
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <button
                onClick={handleCreateTanda}
                className="btn btn-accent w-full"
                disabled={!tandaName || !contributionAmount || !maxMembers || !tokenAddress}
              >
                Create Tanda
              </button>
              <button
                onClick={handleJoinTanda}
                className="btn btn-outline btn-accent w-full"
              >
                Join Tanda
              </button>
              <button
                onClick={handleContribute}
                className="btn btn-outline btn-accent w-full"
              >
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;
