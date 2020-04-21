# solidity-batch-utils

Something that sooner or later a Solidity developer finds while trying to optimize smart contracts or applications consuming is the need to do aggregated "read actions" (not modifying the on-chain state), aggregated "write actions" (modifying the on-chain state) or aggregated contracts' deployments from another contract (factory).

Aggregation of "reads" is useful in order to decrease the traffic between applications and Ethereum nodes and to insure the atomicity of these (same block). 

Meanwhile, aggregation of "writes" and deployments are potentially useful for different reason on smart contract -> smart contract communication and to for example simplify test scenarios involving communication between smart contrat wallet and other contracts.

This repo contains the following contracts which enable those aggregations:
- **BatchCaller**. Aggregation of "reads".
- **BatchSender**. Aggregation of "writes".
- **BatchCreator**. Aggregation of contracts' deployments (factory).

## Repository structure
This repository is configured to use the [Buidler](https://buidler.dev/) with Typescript, [https://github.com/ethereum-ts/TypeChain](https://github.com/ethereum-ts/TypeChain) for typescript typed bindings on top of the smart contracts, [Waffle](https://getwaffle.io/) and [ethers.js](https://github.com/ethers-io/ethers.js/).

The folder structure is:
- **contracts/** for the Solidity code
- **helpers/** for misc helpers, including typescript abstractions over the available smart contract, builder-related helpers or the custom types of the project, amongst others.
- **tasks/** for the buidlers tasks, splitted in *deployments* for "atomic" tasks per contract and *migrations* for sequences of other tasks.
- **test/** for the Waffle tests.
- **types/** for the Typechain-generated types.

## Available npm scripts
`docker-compose up` will start a docker container to which is possible to connect by using `docker-compose exec contracts-env bash` from another console. From withing that container, it's possible to execute all the available npm scripts contained on the *package.json* in order to compile the contracts, execute the tests, generate the Typechain types or deploy to buidlerevm, Kovan or Ropsten.

To deploy on Kovan or Ropsten, it's necessary first to introduce a correct Ethereum network provider url and a wallet mnemonic in the corresponding object on *buidler.config.ts*.


## Warning
Even if tested, the contracts included on this repository are not audited and as they are thought to be general enough, don't include extra protections that in some codebases could be desirable (e.g. non-reentrancy on BatchSender).

**Feel free to use them, but with responsibility**

## License
This repository is released under [MIT License](LICENSE)