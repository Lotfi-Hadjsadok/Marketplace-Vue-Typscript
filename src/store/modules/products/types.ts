export type productType = {
    id: string,
    title: string,
    image: string,
    images?: Array<string>,
    price: number,
    commission: number,
    createdAt: any
}
export interface productsState {
    products: Array<productType>,
    productsLoader: boolean,
    productsError: string,
    productsCount: number,
    lastProduct: any //LAst firebase Doc from pagination
}