import { expect } from "chai";
import { deployContract, MockProvider } from "ethereum-waffle";
import BatchSender from "../artifacts/BatchSender.json";
import BatchCaller from "../artifacts/BatchCaller.json";
import TestCounter from "../artifacts/TestCounter.json";
import { BatchSender as tBatchSender } from "../types/BatchSender";
import { BatchCaller as tBatchCaller } from "../types/BatchCaller";
import { TestCounter as tTestCounter } from "../types/TestCounter";

describe("BatchSender", () => {
  const [wallet] = new MockProvider().getWallets();
  let batchSender: tBatchSender;
  let batchCaller: tBatchCaller;
  let testCounters: tTestCounter[] = [];

  beforeEach(async () => {
    batchSender = (await deployContract(wallet, BatchSender)) as tBatchSender;
    batchCaller = (await deployContract(wallet, BatchCaller)) as tBatchCaller;
    testCounters[0] = (await deployContract(
      wallet,
      TestCounter
    )) as tTestCounter;
    testCounters[1] = (await deployContract(
      wallet,
      TestCounter
    )) as tTestCounter;
  });

  it("batchSend() with 1 calls without msg.value", async () => {
    const tx = await batchSender.batchSend(
      [
        {
          recipient: testCounters[0].address,
          gas: 300000,
          value: 0,
          data: testCounters[0].interface.functions.increment.encode([4]),
        },
      ],
      { value: 0 }
    );
    await tx.wait();
    expect(await testCounters[0].count()).to.equal(4);
  });

  it("batchSend() with 2 calls without msg.value", async () => {
    const tx = await batchSender.batchSend(
      [
        {
          recipient: testCounters[0].address,
          gas: 300000,
          value: 0,
          data: testCounters[0].interface.functions.increment.encode([4]),
        },
        {
          recipient: testCounters[1].address,
          gas: 300000,
          value: 0,
          data: testCounters[1].interface.functions.increment.encode([5]),
        },
      ],
      { value: 0 }
    );
    await tx.wait();
    expect(await testCounters[0].count()).to.equal(4);
    expect(await testCounters[1].count()).to.equal(5);
  });

  it("batchSend() with 2 calls with not enough msg.value", async () => {
    const txPromise = batchSender.batchSend(
      [
        {
          recipient: testCounters[0].address,
          gas: 300000,
          value: 3,
          data: testCounters[1].interface.functions.incrementWithValue.encode([
            3,
          ]),
        },
        {
          recipient: testCounters[1].address,
          gas: 300000,
          value: 4,
          data: testCounters[1].interface.functions.incrementWithValue.encode([
            4,
          ]),
        },
      ],
      { value: 2 }
    );
    await expect(txPromise).to.be.reverted;
  });

  it("batchSend() with 3 calls with enough msg.value", async () => {
    await batchSender.batchSend(
      [
        {
          recipient: testCounters[0].address,
          gas: 300000,
          value: 3,
          data: testCounters[0].interface.functions.incrementWithValue.encode([
            3,
          ]),
        },
        {
          recipient: testCounters[1].address,
          gas: 300000,
          value: 4,
          data: testCounters[1].interface.functions.incrementWithValue.encode([
            4,
          ]),
        },
        {
          recipient: testCounters[1].address,
          gas: 300000,
          value: 2,
          data: testCounters[1].interface.functions.incrementWithValue.encode([
            2,
          ]),
        },
      ],
      { value: 9 }
    );
    expect(await testCounters[0].count()).to.equal(3);
    expect(await testCounters[1].count()).to.equal(6);
  });
});
