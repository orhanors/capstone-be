import { Model } from "mongoose";

export type CacheOptions = { key?: string };

declare module "mongoose" {
	interface Query<T> {
		cache(options?: CacheOptions): Query<T>;
		useCache: boolean;
		hashKey: string;
		model: Model<T>;
	}
}
