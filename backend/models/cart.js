const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      },
      price:{
        type:Number,
        default:0
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Cart', cartSchema);
