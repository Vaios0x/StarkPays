import { InjectedConnector } from "@starknet-react/core";

export class KeplrConnector extends InjectedConnector {
  constructor() {
    super({
      options: {
        id: "keplr",
        name: "Keplr",
        icon: "https://wallet.keplr.app/assets/icon.svg",
      },
    });
  }

  async isAvailable(): Promise<boolean> {
    return typeof window !== "undefined" && !!window.keplr;
  }

  async connect(): Promise<any> {
    if (!(await this.isAvailable())) {
      throw new Error("Keplr wallet not found");
    }

    try {
      // Keplr doesn't have a direct connect method, so we'll return the keplr object
      return window.keplr;
    } catch (error) {
      throw new Error(`Failed to connect to Keplr: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    // Keplr doesn't have a disconnect method
    return Promise.resolve();
  }
}
