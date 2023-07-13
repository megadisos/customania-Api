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

export interface PaymentInfo {
    token: string,
    issuer_id: string,
    payment_method_id: string,
    transaction_amount: number,
    installments: number,
    payer:PayerInfo
}

interface PayerInfo {
  email: string,
 identification:PayerIdentification
}

interface PayerIdentification {
  type: string,
  number: number
}