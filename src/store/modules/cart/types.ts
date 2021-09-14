import { productType } from "../products/types";

export type cartState = {
    cart: Array<{
        product: productType,
        uid: string | null,
        quantity: number,
    }>
}