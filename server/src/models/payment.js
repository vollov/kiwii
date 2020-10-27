import { model, Schema } from 'mongoose'
import { verifyPostcode } from '~/src/lib/validators'

const AddressSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	firstName: String,
	lastName: String,
	street: String,
	unit: String,
	city: String,
	province: String,
	postcode: {
		type: String,
		validate: {
			validator: verifyPostcode,
			message: (props) => `${props.value} is not a valid postcode`,
		},
		required: [true, 'postcode required'],
	},
	phone: String,
	default: { type: Boolean, default: false }, //default as billing
	type: String, // B-billing, S-Shipping
})

const Address = model('Address', AddressSchema)

export { Address }
