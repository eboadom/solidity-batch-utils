import { task } from "@nomiclabs/buidler/config";
import {
  setBRE,
  registerContractInJsonDb,
  deployBatchCaller,
} from "../../helpers/helpers";
import { eContractid } from "../../helpers/types";

const { BatchCaller } = eContractid;

task(`deploy-${BatchCaller}`, `Deploys the ${BatchCaller}`).setAction(
  async (_, BRE) => {
    setBRE(BRE);

    console.log(`Deploying ${BatchCaller}...\n`);
    const batchCaller = await deployBatchCaller();

    await registerContractInJsonDb(BatchCaller, batchCaller);
  }
);
