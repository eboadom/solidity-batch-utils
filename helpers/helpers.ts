import { Contract, Signer, utils } from "ethers";
import { BuidlerRuntimeEnvironment } from "@nomiclabs/buidler/types";
import BigNumber from "bignumber.js";
import BN = require("bn.js");
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { tEthereumAddress, eContractid } from "./types";
import { BatchSender } from "../types/BatchSender";
import { BatchCaller } from "../types/BatchCaller";

export let BRE: BuidlerRuntimeEnvironment = {} as BuidlerRuntimeEnvironment;
export const setBRE = (_BRE: BuidlerRuntimeEnvironment) => {
  BRE = _BRE;
};

export const getDb = () => low(new FileSync("./deployed-contracts.json"));

export const registerContractInJsonDb = async (
  contractId: eContractid,
  contractInstance: Contract
) => {
  const currentNetwork = BRE.network.name;
  if (currentNetwork !== "buidlerevm") {
    console.log(`*** ${contractId} ***\n`);
    console.log(`Network: ${currentNetwork}`);
    console.log(`tx: ${contractInstance.deployTransaction.hash}`);
    console.log(`contract address: ${contractInstance.address}`);
    console.log(`deployer address: ${contractInstance.deployTransaction.from}`);
    console.log(`gas price: ${contractInstance.deployTransaction.gasPrice}`);
    console.log(`gas used: ${contractInstance.deployTransaction.gasLimit}`);
    console.log(`\n******`);
    console.log();
  }

  await getDb()
    .set(`${contractId}.${currentNetwork}`, {
      address: contractInstance.address,
      deployer: contractInstance.deployTransaction.from,
    })
    .write();
};

export const bnToBigNumber = (amount: BN): BigNumber =>
  new BigNumber(<any>amount);
export const stringToBigNumber = (amount: string): BigNumber =>
  new BigNumber(amount);

export const getEthersSigners = async (): Promise<Signer[]> =>
  await Promise.all(await BRE.ethers.signers());

export const getEthersSignersAddresses = async (): Promise<
  tEthereumAddress[]
> =>
  await Promise.all(
    (await BRE.ethers.signers()).map((signer) => signer.getAddress())
  );

export const getCurrentBlock = async () => {
  return BRE.ethers.provider.getBlockNumber();
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const deployContract = async <ContractType extends Contract>(
  contractName: string,
  args: any[]
): Promise<ContractType> =>
  (await (await BRE.ethers.getContract(contractName)).deploy(
    ...args
  )) as ContractType;

const getContract = async <ContractType extends Contract>(
  contractName: string,
  address: string
): Promise<ContractType> =>
  (await (await BRE.ethers.getContract(contractName)).attach(
    address
  )) as ContractType;

export const deployBatchSender = async () =>
  await deployContract<BatchSender>(eContractid.BatchSender, []);

export const deployBatchCaller = async () =>
  await deployContract<BatchCaller>(eContractid.BatchCaller, []);

export const decodeAbiNumber = (data: string): number =>
  parseInt(utils.defaultAbiCoder.decode(["uint256"], data).toString());
