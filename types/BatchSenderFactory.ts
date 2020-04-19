/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";

import { TransactionOverrides } from ".";
import { BatchSender } from "./BatchSender";

export class BatchSenderFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: TransactionOverrides): Promise<BatchSender> {
    return super.deploy(overrides) as Promise<BatchSender>;
  }
  getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction {
    return super.getDeployTransaction(overrides);
  }
  attach(address: string): BatchSender {
    return super.attach(address) as BatchSender;
  }
  connect(signer: Signer): BatchSenderFactory {
    return super.connect(signer) as BatchSenderFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BatchSender {
    return new Contract(address, _abi, signerOrProvider) as BatchSender;
  }
}

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BatchSender.Call[]",
        name: "_calls",
        type: "tuple[]"
      }
    ],
    name: "batchSend",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103c2806100206000396000f3fe60806040526004361061001e5760003560e01c8063e52b647814610023575b600080fd5b6100366100313660046101df565b610038565b005b60005b8151811015610155576000606083838151811061005457fe5b6020026020010151600001516001600160a01b031684848151811061007557fe5b60200260200101516020015185858151811061008d57fe5b6020026020010151604001518686815181106100a557fe5b6020026020010151606001516040516100be91906102d3565b600060405180830381858888f193505050503d80600081146100fc576040519150601f19603f3d011682016040523d82523d6000602084013e610101565b606091505b50915091508161014b57606060405180604001604052808581526020018381525060405160200161013291906102ef565b6040516020818303038152906040529050805181602001fd5b505060010161003b565b5050565b80356001600160a01b038116811461017057600080fd5b92915050565b600082601f830112610186578081fd5b813567ffffffffffffffff81111561019c578182fd5b6101af601f8201601f1916602001610335565b91508082528360208285010111156101c657600080fd5b8060208401602084013760009082016020015292915050565b600060208083850312156101f1578182fd5b823567ffffffffffffffff80821115610208578384fd5b81850186601f820112610219578485fd5b8035925081831115610229578485fd5b6102368485850201610335565b83815284810190828601875b868110156102c45781358501608080601f19838f03011215610262578a8bfd5b61026b81610335565b6102778e8c8501610159565b81526040838101358c830152606084013590820152818301358981111561029c578c8dfd5b6102aa8f8d83870101610176565b606083015250865250509287019290870190600101610242565b50909998505050505050505050565b600082516102e581846020870161035c565b9190910192915050565b600060208252825160208301526020830151604080840152805180606085015261032081608086016020850161035c565b601f01601f1916929092016080019392505050565b60405181810167ffffffffffffffff8111828210171561035457600080fd5b604052919050565b60005b8381101561037757818101518382015260200161035f565b83811115610386576000848401525b5050505056fea26469706673582212205182f9712afecc764b22e1870d4f9485da5571e16f3db03eab777a091e4c247264736f6c63430006060033";
