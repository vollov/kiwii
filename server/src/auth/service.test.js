import _ from "lodash";

import {
	UNAUTHORIZED_REQUEST,
	DATABASE_ERROR
} from '../lib/codes'

const f1 = (n) => {

	switch(n){
		case 1:
			throw new Error(UNAUTHORIZED_REQUEST)
		case 2:
			throw new Error(DATABASE_ERROR)
		default:
			return 'ok'
	}
}

test("handle error", () => {
	try{
		let user = f1(2)
	} catch(err){
		console.log(`err.name=${err.code}, err=${JSON.stringify(err)}`);
	}
	//expect(sum(1, 2)).toBe(3);
});


test("merge user and token", () => {
	let user = {
		firstName: "data.given_name",
		lastName: "data.family_name",
		email: "data.email"
	};

	let r = { user: user, token: "x-token" };

	console.log(`r=${JSON.stringify(r)}`);
	//expect(sum(1, 2)).toBe(3);
});

test("assignIn be able to insert id into user", () => {
	let user = {
		firstName: "data.given_name",
		lastName: "data.family_name",
		email: "data.email"
	};

	let r = _.assign(user, { id: "mock-id" });

	console.log(`r=${JSON.stringify(r)}`);
	//expect(sum(1, 2)).toBe(3);
});
