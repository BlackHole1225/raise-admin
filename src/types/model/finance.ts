export interface CurrencyModel {
    currency_uuid: string;
    currency_name: string;
}

export interface BlockchainModel {
  blockchain_uuid: string;
  blockchain_name: string;
}

export type WithdrawStatus = "pending" | "accepted" | "rejected";

export interface WalletModel {
  wallet_id: string;
  wallet_currency: string;
  wallet_balance: string;
}
export interface WithdrawModel {
  withdraw_uuid: string;
  withdraw_type: string;
  withdraw_status: WithdrawStatus;
  withdraw_amount: number;
  withdraw_wallet: WalletModel;
  withdraw_created_at: Date;
  withdraw_rate: number;
}
