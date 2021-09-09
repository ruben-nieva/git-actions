// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
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

const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;

  const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgUpdateNym: (data: MsgUpdateNym): EncodeObject => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgUpdateNym", value: data }),
    msgDeleteNym: (data: MsgDeleteNym): EncodeObject => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgDeleteNym", value: data }),
    msgCreateNym: (data: MsgCreateNym): EncodeObject => ({ typeUrl: "/cheqdid.cheqdnode.cheqd.MsgCreateNym", value: data }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
