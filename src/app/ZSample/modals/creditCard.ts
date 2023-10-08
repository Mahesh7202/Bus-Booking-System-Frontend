import { UserAccount } from "./useraccount";

export interface CreditCard{
   cardID?: number;
   userID: number;
   userAccount?: UserAccount;
   cardNumber: string;
   expireYear: string;
   expireMonth: string;
   cvc: string;
   cardHolderFullName: string;
   balance: number;

}
