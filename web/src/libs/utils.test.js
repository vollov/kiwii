describe('lodash function test', () => {
	it('test empty object', () => {
		const o = {}
		const r = o == null || Object.keys(o).length === 0
		expect(r).toBe(true)
	})
})
