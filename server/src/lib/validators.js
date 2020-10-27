// Tools and reference
// https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285
// https://regex101.com/r/cO8lqs/22

/**
 * Time string s must be either
 * - [1-12]m
 * - [1-48]w
 * return true if s is valid string
 */
export const verifyKorTime = (s) => {
	let str = ('' + s).trim()
	const regex = RegExp(
		'^[1-9][mM]$|^1[0-2][mM]$|^[1-9][wW]$|^[1-3][0-9][wW]$|^4[0-8][wW]$'
	)
	return regex.test(str)
}

/**
 * Canadia postcode should be N2N 2W3
 * - change the character to uppercase
 * - add the space if there are not
 * - return false if input is invalid
 */
export const verifyPostcode = (s) => {
	let str = ('' + s).trim()
	const regex = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/
	return regex.test(str)
}
