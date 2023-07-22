const mongooseMd =  require('mongoose');

const productsSchema = new mongooseMd.Schema({
  ammount: {
    required: true,
    type: Number
  },
  available: {
    required: true,
    type: Number
  },
  created: {
    required: true,
    type: Date,
    default:Date.now
  },
  name: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  imagesPaths: {
    required: true,
    type: {
      path1: {
        required: true,
        type: String
      },
      path2: {
        required: false,
        type: String
      },
      path3: {
        required: false,
        type: String
      }
    }
  },
  offer: {
    required: false,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  rating: {
    required: true,
    type: Number
  },
  sizes: [{
    size: {
      required: false,
      type: String
    },
    ammount: {
      required: false,
      type: Number
    },
    available: {
      required: false,
      type: Number
    },
    price: {
      required: false,
      type: Number
    }
  }],
})
module.exports  =  mongooseMd.model('Products', productsSchema)
