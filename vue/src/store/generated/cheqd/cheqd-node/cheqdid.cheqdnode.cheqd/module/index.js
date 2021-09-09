// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgUpdateNym } from "./types/cheqd/tx";
import { MsgDeleteNym } from "./types/cheqd/tx";
import { MsgCreateNym } from "./types/cheqd/tx";
const types = [
    ["/cheqdid.cheqdnode.cheqd.MsgUpdateNym", MsgUpdateNym],
    ["/cheqdid.cheqdnode.cheqd.MsgDeleteNym", MsgDeleteNym],
    ["/cheqdid.cheqdnode.cheqd.MsgCreateNym", MsgCreateNym],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgUpdateNym: (data) => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgUpdateNym", value: data }),
        msgDeleteNym: (data) => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgDeleteNym", value: data }),
        msgCreateNym: (data) => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgCreateNym", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
