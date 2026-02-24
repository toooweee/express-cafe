export type AggregateId = string;

export type EntityMeta = {
	id: AggregateId;
	createdAt: Date;
	updatedAt: Date | undefined;
};

export type CreateEntityProps<T> = {
	id: AggregateId;
	props: T;
	createdAt?: Date;
	updatedAt?: Date;
};

export abstract class Entity<EntityProps> {
	protected _id: AggregateId;
	protected readonly props: EntityProps;
	private readonly _createdAt: Date;
	private _updatedAt: Date | undefined;

	protected constructor({
		id,
		props,
		createdAt,
		updatedAt
	}: CreateEntityProps<EntityProps>) {
		this._id = id;
		this.props = props;
		const now = new Date();
		this._createdAt = createdAt ?? now;
		this._updatedAt = updatedAt;
	}

	get id() {
		return this._id;
	}

	get createdAt() {
		return this._createdAt;
	}

	get updatedAt() {
		return this._updatedAt;
	}

	static isEntity(entity: unknown): entity is Entity<unknown> {
		return entity instanceof Entity;
	}

	getProps(): EntityMeta & EntityProps {
		const propsCopy = {
			id: this._id,
			createdAt: this._createdAt,
			updatedAt: this._updatedAt,
			...this.props
		};

		return Object.freeze(propsCopy);
	}
}
