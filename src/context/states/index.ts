export interface InitialState {
  metamask_information: {
    account_id: string;
    chain_id: number;
    connected: boolean;
    balance: any;
  };
}

export const InitialValue: InitialState = {
  metamask_information: {
    account_id: "",
    chain_id: 0,
    connected: false,
    balance: 0,
  },
};
