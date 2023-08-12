interface Payer {
    email: string
    entity_type?:string
    identification?: Identification
}
interface Identification {
    type: string,
    number: string,
}
interface AditionalInfo { 
    ip_address:  string,
}
interface Delivery {
        name: string,
        city: string,
        address:  string,
}

export interface Items {
    id: string,
    title: string,
    quantity: number,
    unit_price: number,
    size?:string
}
export interface SaleStatus {
    status: string,
    status_detail:string,
    delivery_status:string,
}

export interface Sale {
    userId?: string
    transactionId: string,
    creationdate: string,
    status: string,
    status_detail: string
    payment_method_id:string,
    payer: Payer,
    additional_info?: AditionalInfo,
    isDelivery : boolean,
    delivery?:Delivery,
    delivery_status: string,
    items :Items[],
    ammount:Number
}

