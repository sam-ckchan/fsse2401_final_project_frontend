import {GetProductDto} from "../product/product.type.ts";

export interface GetTransactionDto {
    tid: number;
    buyer_uid: number;
    datetime: string;
    status: string;
    total: number;
    items: TransactionProductDto[];
}

export interface TransactionProductDto {
    tpid: number;
    quantity: number;
    product: GetProductDto;
    subtotal: number;
}
