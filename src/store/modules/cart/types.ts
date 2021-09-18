
export type cartType = {
    id: string,
    store: string,
    title: string,
    price: string,
    image: string,
    uid: string | null,
    quantity: number,
}
export type cartState = {
    cart: Array<cartType>
}