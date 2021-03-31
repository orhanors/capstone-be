import { Document, Model, ObjectId } from "mongoose";

type Token = {
	token: string | undefined;
};

type FindByCredentials = (
	email: string,
	password: string
) => Promise<IUser | null>;

export interface IUser extends Document {
	_id: string;
	name: string;
	surname: string;
	email: string;
	password?: string;
	role: string;
	facebookId?: string;
	googleId?: string;
	refreshTokens: Array<Token>;
	cart: string | ObjectId;
}

export interface IUserModel extends Model<IUser> {
	// declare any static methods here
	findByCredentials: FindByCredentials;
}
