import { usePlugin, BuidlerConfig } from "@nomiclabs/buidler/config";
import path from "path";
import fs from "fs";
// @ts-ignore
import { accounts } from "./test-wallets.js";

usePlugin("@nomiclabs/buidler-ethers");
usePlugin("buidler-typechain");
usePlugin("@nomiclabs/buidler-waffle");

["deployments", "migrations"].forEach((folder) => {
  const tasksPath = path.join(__dirname, "tasks", folder);
  fs.readdirSync(tasksPath).forEach((task) => require(`${tasksPath}/${task}`));
});

const DEFAULT_BLOCK_GAS_LIMIT = 500000;
const DEFAULT_GAS_PRICE = 10;

const config: BuidlerConfig = {
  solc: {
    version: "0.6.6",
    optimizer: { enabled: true, runs: 200 },
    evmVersion: "istanbul",
  },
  typechain: {
    outDir: "types",
    target: "ethers",
  },
  defaultNetwork: "buidlerevm",
  mocha: {
    enableTimeouts: false,
  },
  networks: {
    kovan: {
      url: "YOUR_ETHEREUM_PROVIDER_URL_HERE",
      hardfork: "istanbul",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gasMultiplier: DEFAULT_GAS_PRICE,
      chainId: 42,
      accounts: {
        mnemonic:
          "YOUR_MNEMONIC_HERE",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    ropsten: {
      url: "YOUR_ETHEREUM_PROVIDER_URL_HERE",
      hardfork: "istanbul",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gasMultiplier: DEFAULT_GAS_PRICE,
      chainId: 3,
      accounts: {
        mnemonic:
          "YOUR_MNEMONIC_HERE",
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
      },
    },
    buidlerevm: {
      hardfork: "istanbul",
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      gas: DEFAULT_BLOCK_GAS_LIMIT,
      gasPrice: 8000000000,
      chainId: 31337,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      accounts: accounts.map(
        ({ secretKey, balance }: { secretKey: string; balance: string }) => ({
          privateKey: secretKey,
          balance,
        })
      ),
    },
  },
};

export default config;
