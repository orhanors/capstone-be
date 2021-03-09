import { model, Schema, Model } from "mongoose";
import { userRoles, userPlaceholderImg } from "../../settings/constants";
import { logger } from "../../utils/logger/winston";
import { IUser, IUserModel } from "./user.types";
const bcrypt = require("bcrypt");

const UserSchema: Schema = new Schema(
	{
		name: { type: String },
		surname: { type: String },
		email: { type: String },
		password: { type: String },
		role: {
			type: String,
			enum: [userRoles.admin, userRoles.seller, userRoles.user],
			default: userRoles.user,
		},
		facebookId: { type: String },
		googleId: { type: String },
		refreshTokens: [{ token: String }],
		image: {
			type: String,
			default: userPlaceholderImg,
		},
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
	try {
		if (this.isModified("password")) {
			const salt = await bcrypt.genSalt(10);
			this.password = await bcrypt.hash(this.password, salt);
		}
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

UserSchema.statics.findByCredentials = async function (
	email: string,
	password: string
) {
	const user: any = await this.findOne({ email });

	if (user) {
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) return user;
		else return null;
	} else return null;
};

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject: any = user.toObject();

	delete userObject.password;
	delete userObject.__v;
	delete userObject.googleId;
	delete userObject.facebookId;
	return userObject;
};
const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);

export default User;
