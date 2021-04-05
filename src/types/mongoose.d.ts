import { Document, Model, Query } from "mongoose";

//type CacheOptions = { key?: string };

declare module "mongoose" {
	interface Query<T> {
		cache(): Query<T>;
		useCache: boolean;
		hashKey: string;
		model: Model<T>;
	}
}
