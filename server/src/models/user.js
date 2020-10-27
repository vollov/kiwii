import { model, Schema } from "mongoose";

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		unique: true
	}
});

const User = model("User", UserSchema);
export default User;
