import { task } from "@nomiclabs/buidler/config";
import {
  setBRE,
  registerContractInJsonDb,
  deployBatchSender,
} from "../../helpers/helpers";
import { eContractid } from "../../helpers/types";

const { BatchSender } = eContractid;

task(`deploy-${BatchSender}`, `Deploys the ${BatchSender}`).setAction(
  async (_, BRE) => {
    setBRE(BRE);

    console.log(`Deploying ${BatchSender}...\n`);
    const batchSender = await deployBatchSender();

    await registerContractInJsonDb(BatchSender, batchSender);
  }
);
