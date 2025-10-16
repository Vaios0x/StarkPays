import { ExternalLinkIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";

/**
 * Block explorer button for devnet
 */
export const BlockExplorerDevnet = () => {
  const { targetNetwork } = useTargetNetwork();

  if (targetNetwork.network !== "devnet") {
    return null;
  }

  return (
    <a
      className="btn btn-sm font-normal gap-1 cursor-pointer border border-[#32BAC4] shadow-none"
      href={`http://localhost:5050/`}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLinkIcon className="h-4 w-4 text-[#32BAC4]" />
      <span>Devnet Explorer</span>
    </a>
  );
};
