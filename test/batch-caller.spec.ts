import { expect } from "chai";
import { deployContract, MockProvider } from "ethereum-waffle";
import BatchCaller from "../artifacts/BatchCaller.json";
import TestCounter from "../artifacts/TestCounter.json";
import { BatchCaller as tBatchCaller } from "../types/BatchCaller";
import { TestCounter as tTestCounter } from "../types/TestCounter";
import { decodeAbiNumber } from "../helpers/helpers";

describe("BatchCaller", () => {
  const [wallet] = new MockProvider().getWallets();
  let batchCaller: tBatchCaller;
  let testCounters: tTestCounter[] = [];
  let countEncodedCall: string;

  beforeEach(async () => {
    batchCaller = (await deployContract(wallet, BatchCaller)) as tBatchCaller;
    testCounters[0] = (await deployContract(
      wallet,
      TestCounter
    )) as tTestCounter;
    testCounters[1] = (await deployContract(
      wallet,
      TestCounter
    )) as tTestCounter;
    countEncodedCall = testCounters[0].interface.functions.count.encode([]);
  });

  it("batchCall() with 1 call", async () => {
    const increment = 20;
    await (await testCounters[0].increment(increment)).wait();
    const tx = await batchCaller.batchCall([
      {
        recipient: testCounters[0].address,
        data: countEncodedCall,
      },
    ]);
    expect(tx.length).to.equal(1);
    expect(tx[0].success).to.equal(true);
    expect(decodeAbiNumber(tx[0].data)).to.equal(increment);
  });

  it("batchCall() with 2 calls", async () => {
    const increments = [4, 6];
    await (await testCounters[0].increment(increments[0])).wait();
    await (await testCounters[1].increment(increments[1])).wait();
    const tx = await batchCaller.batchCall([
      {
        recipient: testCounters[0].address,
        data: countEncodedCall,
      },
      {
        recipient: testCounters[1].address,
        data: countEncodedCall,
      },
    ]);
    expect(tx.length).to.equal(2);
    expect(tx[0].success).to.equal(true);
    expect(decodeAbiNumber(tx[0].data)).to.equal(increments[0]);
    expect(tx[1].success).to.equal(true);
    expect(decodeAbiNumber(tx[1].data)).to.equal(increments[1]);
  });

  it("batchCall() reverts when trying to call a non-contract account", async () => {
    const txPromise = batchCaller.batchCall([
      {
        recipient: wallet.address,
        data: countEncodedCall,
      },
    ]);

    await expect(txPromise).to.be.revertedWith("INVALID_RECIPIENT");
  });
});
