import { model, Schema } from 'mongoose'
import cfg from '~/src/config'

const BrandSchema = new Schema({
	name: String,
	year: Number,
	image: String,
})

const Brand = model('Brand', BrandSchema)

/**
 * Product Image
 */
const ProductImageSchema = new Schema(
	{
		sku: String,
		name: String,
		sequence: Number,
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
)

ProductImageSchema.virtual('path').get(function () {
	return (
		'/products/' +
		this.sku +
		'/' +
		this.name +
		'-' +
		cfg.media.image.main +
		'.jpg'
	)
})

ProductImageSchema.virtual('thumbs').get(function () {
	return (
		'/products/' +
		this.sku +
		'/thumbs/' +
		this.name +
		'-' +
		cfg.media.image.thumb +
		'.jpg'
	)
})

const ProductImage = model('ProductImage', ProductImageSchema)

const ProductSchema = new Schema(
	{
		sku: String,
		name: String,
		brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
		description: String,
		price: Number,
		cost: Number,
		hits: Number,
		image: String, // path of the default image
		images: [{ type: Schema.Types.ObjectId, ref: 'ProductImage' }],
		specification: Schema.Types.Mixed,
		features: Schema.Types.Mixed,
		package: Schema.Types.Mixed,
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
)

ProductSchema.virtual('imageUrl').get(function () {
	return (
		'/products/' +
		this.sku +
		'/list/' +
		this.sku +
		'-' +
		cfg.media.image.list +
		'.jpg'
	)
})

const Product = model('Product', ProductSchema)

export { Brand, ProductImage, Product }
