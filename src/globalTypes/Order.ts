import { cartType } from "@/store/modules/cart/types";
import { productType } from "@/store/modules/products/types";
export  type orderType = null |{
    uid:string
    username:string
    surname:string
    email:string
    products:Array<cartType>
    adresse:{
        state:string,
        city:string,
        full:string
    }
    phone:string
    createdAt:any
}
