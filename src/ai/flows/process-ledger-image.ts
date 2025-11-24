
export interface ProcessLedgerImageOutput {
    transactions: {
        customerName: string;
        bottleQuantity: number;
        amount: number;
        address: string;
        isNewCustomer: boolean;
    }[];
}
