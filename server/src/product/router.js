import express from 'express'
import log from '~/src/lib/logger'

const router = express.Router()

import {
	list,
	add,
	find,
	update,
	remove,
	batchInsert,
} from './services/product'

import { listImages, addImage, findImage, updateImage, removeImage, batchAddImages, getFirst } from './services/productImage'

// import {DATABASE_ERROR,
// 	SERVER_ERROR // 500
// } from '~/src/lib/codes'

//==================================
// Public APIs
//==================================
/**
 * list all products
 */
router.get('/', async (req, res) => {
	try {
		const data = await list()
		return res.status(200).json(data)
	} catch (err) {
		log.error(`list product error: ${err}`)
		// const error = new ServerError(DATABASE_ERROR, SERVER_ERROR)
		return res.status(500).json(err)
	}
})

/**
 * find a product by sku
 */
router.get('/:sku', async (req, res) => {
	const sku = req.params.sku
	try {
		log.trace(`[Product service] find(${JSON.stringify(sku)})`)
		const data = await find(sku)
		log.trace(`[Product service] find, return data=${JSON.stringify(data)}`)
		// // TODO: populate the images in the array
		// const images = await findImages(data.sku)
		// log.trace(`[products] router, images=${images}`)

		// let p = data.toObject()

		// log.trace(`[products] router, find product=${JSON.stringify(p)}`)
		// const product = Object.assign(p, { images: images })
		// log.trace(`[products] router, return product=${product}`)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`find product sku=${sku}, error=${err}`)
		return res.status(500).json(err)
	}
})

router.get('/image/:sku', async (req, res) => {
	const sku = req.params.sku
	try {
		const data = await getFirst(sku)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`find product image by sku=${sku}, error=${err}`)
		return res.status(500).json(err)
	}
})

router.get('/:sku/images/', async (req, res) => {
	const sku = req.params.sku
	try {
		const data = await listImages(sku)
		return res.status(200).json(data)
	} catch (err) {
		log.error(`find product images by sku=${sku}, error=${err}`)
		return res.status(500).json(err)
	}
})

//==================================
// Admin APIs
//==================================

router.post('/', async (req, res) => {
	try {
		const data = await add(req.body)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.post('/batch', async (req, res) => {
	try {
		const data = await batchInsert(req.body)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.post('/images/', async (req, res) => {
	try {
		const data = await addImage(req.body)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.post('/images/batch', async (req, res) => {
	try {
		const data = await batchAddImages(req.body)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.put('/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await update(id, req.body)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

router.delete('/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await remove(id)
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json(err)
	}
})

export default router
