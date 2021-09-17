import { productType } from "../products/types";
export type cartType={
    product: productType,
    uid: string | null,
    quantity: number,
}
export type cartState = {
    cart: Array<cartType>
}