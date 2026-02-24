export type Primitives = string | number | boolean;

export type DomainPrimitive<T extends Primitives | Date> = {
	value: T;
};

type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class ValueObject<T> {
	private readonly props: ValueObjectProps<T>;

	protected constructor(props: ValueObjectProps<T>) {
		this.props = props;
	}

	getValue() {
		return (this.props as DomainPrimitive<T & (Primitives | Date)>).value;
	}

	private isDomainPrimitive(
		obj: unknown
	): obj is DomainPrimitive<T & (Primitives | Date)> {
		return Object.prototype.hasOwnProperty.call(obj, 'value');
	}
}
