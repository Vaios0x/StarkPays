import { ExternalLinkIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";

/**
 * Block explorer button for mainnet
 */
export const BlockExplorer = () => {
  const { targetNetwork } = useTargetNetwork();

  if (targetNetwork.network !== "mainnet") {
    return null;
  }

  return (
    <a
      className="btn btn-sm font-normal gap-1 cursor-pointer border border-[#32BAC4] shadow-none"
      href={`https://starkscan.co/`}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLinkIcon className="h-4 w-4 text-[#32BAC4]" />
      <span>Starkscan</span>
    </a>
  );
};
