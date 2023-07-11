export interface Prefrence {
    purpose:string,
  items: Items[]
}


interface Items {
    id: string,
    title: string,
    quantity: number,
    unit_price: number
}