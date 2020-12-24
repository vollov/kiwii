import { verifyKorTime } from './validators'

/**
 * Time string s must be either
 * - [1-12]m
 * - [1-48]w
 * return true if s is valid string
 */
describe('verifyKorTime validator', () => {
	it('verifyKorTime is a function', () => {
		expect(typeof verifyKorTime).toEqual('function')
	})

	it('12 => false', () => {
		let p = verifyKorTime(12)
		expect(p).toEqual(false)
	})

	it('null => false', () => {
		let p = verifyKorTime(null)
		expect(p).toEqual(false)
	})

	it('49w => false', () => {
		let p = verifyKorTime('49w')
		expect(p).toEqual(false)
	})

	it('13m => false', () => {
		let p = verifyKorTime('13m')
		expect(p).toEqual(false)
	})

	it('3 w => false', () => {
		let p = verifyKorTime(' 3 w ')
		expect(p).toEqual(false)
	})

	it('3w => true', () => {
		let p = verifyKorTime(' 3w ')
		expect(p).toBe(true)
	})

	it('48w => true', () => {
		let p = verifyKorTime('48w ')
		expect(p).toBe(true)
	})

	it('48W => true', () => {
		let p = verifyKorTime('48W ')
		expect(p).toBe(true)
	})

	it('12m => true', () => {
		let p = verifyKorTime('12m')
		expect(p).toBe(true)
	})

	it('111m => false', () => {
		let p = verifyKorTime('111m')
		expect(p).toBe(false)
	})

	it('2M => true', () => {
		let p = verifyKorTime(' 2M')
		expect(p).toBe(true)
	})

	it('2M2w => false', () => {
		let p = verifyKorTime(' 2M2w')
		expect(p).toBe(false)
	})

	it('2M2 => false', () => {
		let p = verifyKorTime(' 2M2')
		expect(p).toBe(false)
	})

	it('2W => true', () => {
		let p = verifyKorTime('2W ')
		expect(p).toBe(true)
	})
})
