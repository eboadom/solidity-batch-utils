/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { TransactionOverrides } from ".";
import { TestCounter } from "./TestCounter";

export class TestCounterFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: TransactionOverrides): Promise<TestCounter> {
    return super.deploy(overrides) as Promise<TestCounter>;
  }
  getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction {
    return super.getDeployTransaction(overrides);
  }
  attach(address: string): TestCounter {
    return super.attach(address) as TestCounter;
  }
  connect(signer: Signer): TestCounterFactory {
    return super.connect(signer) as TestCounterFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestCounter {
    return new Contract(address, _abi, signerOrProvider) as TestCounter;
  }
}

const _abi = [
  {
    inputs: [],
    name: "count",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      }
    ],
    name: "incrementWithValue",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b50610144806100246000396000f3fe6080604052600436106100345760003560e01c806306661abd146100395780637cf5dab01461006057806393ac216f1461008c575b600080fd5b34801561004557600080fd5b5061004e6100a9565b60408051918252519081900360200190f35b34801561006c57600080fd5b5061008a6004803603602081101561008357600080fd5b50356100af565b005b61008a600480360360208110156100a257600080fd5b50356100ba565b60005481565b600080549091019055565b348114610103576040805162461bcd60e51b8152602060048201526012602482015271494e434f4e53495354454e545f56414c554560701b604482015290519081900360640190fd5b50600080543401905556fea2646970667358221220d09909735e1944ad7ea2a4e596536046af23457bd034d4f4c1aaee135076a3c064736f6c63430006060033";
