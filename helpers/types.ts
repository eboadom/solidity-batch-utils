import BigNumber from "bignumber.js";

export enum eContractid {
  BatchSender = "BatchSender",
  BatchCaller = "BatchCaller",
}

export type tEthereumAddress = string;

export type tStringCurrencyUnits = string; // ex. 2.5
export type tStringDecimalUnits = string; // ex 2500000000000000000
export type tBigNumberCurrencyUnits = BigNumber;
export type tBigNumberDecimalUnits = BigNumber;
