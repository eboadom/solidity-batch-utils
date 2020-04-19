import { task } from "@nomiclabs/buidler/config";
import { setBRE, BRE } from "../../helpers/helpers";
import { eContractid } from "../../helpers/types";

task("full-deployment", "Deployment of all the batch contracts").setAction(
  async (_, _BRE) => {
    setBRE(_BRE);
    const { run } = BRE;
    const { BatchCaller, BatchSender } = eContractid;

    await run(`deploy-${BatchSender}`);
    await run(`deploy-${BatchCaller}`);
  }
);
