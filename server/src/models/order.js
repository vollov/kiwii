import { model, Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const PurchaseItemSchema = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	quantity: Number,
})

/**
 * Cart item: items[sku]=quantity
 */
const CartSchema = new Schema({
	purchases: Schema.Types.Mixed,
	user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Cart = model('Cart', CartSchema)

const OrderSchema = new Schema({
	purchases: [PurchaseItemSchema],
	user: { type: Schema.Types.ObjectId, ref: 'User' },
})

OrderSchema.plugin(timestamps)
OrderSchema.index({ createdAt: 1, updatedAt: 0 })

const Order = model('Order', OrderSchema)

export { Cart, Order }
