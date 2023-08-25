
type ProductType = 't-shirts' | 'Mugs' | 'Caps' | 'Hoddies' | 'collectibles'
export type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export type SectionType = 'Offers' | 'Recent' | 'outstanding'
export type RatingType = '1' |'2'|'3'|'4'|'5'
export interface Product {
    _id?:string,
    name:string,
    description:string,
    price:number,
    rating:RatingType,
    type:ProductType,
    amount: number,
    sizes: null | Sizes[],
    imagesPaths: ImagesPaths,
    available:number,
    created:string,
    offer:  number,
}

interface Sizes {
    id:string,
    size:SizeType,
    amount:number,
    available:number,
    price: number
}

export interface ImagesPaths {
    path1:string,
    pathd2:string,
    path3:string
}

