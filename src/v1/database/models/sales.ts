const mongooseSales =  require('mongoose');
const Schema = mongooseSales.Schema;

const salesSchema = new mongooseSales.Schema({
  userId: {
    type: Schema.ObjectId
  },
  transactionId: {
    required: true,
    type: String
  },
  creationdate: {
    required: true,
    type: Date,
    default:Date.now
  },
  status: {
    required: true,
    type: String
  },
  status_detail: {
    required: true,
    type: String
  },
  payment_method_id:{
    required: true,
    type: String
  },
  payer: {
    email: {
        required: true,
        type: String
      },
    entity_type:{
        type: String
      },
    identification: {
        type: {
            type: String
          },
        number: {
            type: String
          },
    },
 
},
additional_info: {
    ip_address:  {
        type: String
      },
},
isDelivery : {
    required: true,
    type: Boolean,
    default:true
},
delivery: {
    name:  {
        type: String
      },
    city:  {
        type: String
      },
    address:  {
        type: String
      },
},
delivery_status: {
    required: true,
    type: String,
},
items:[{
  id:  {
    required: true,
    type: Schema.ObjectId,
},
title:  {
    required: true,
    type: String,
},
  quantity:  {
    required: true,
    type: Number,
},
  unit_price: {
    required: true,
    type: Number
 },
 size: {
  type: String
}}
],
ammount:{
  required: true,
    type: Number
}
})
module.exports  =  mongooseSales.model('Sales', salesSchema)
