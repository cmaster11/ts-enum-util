import { StringKeyOf } from "./types";
/**
 * A generic wrapper for any enum-like object.
 * Provides utilities for runtime processing of an enum's values and keys, with strict compile-time
 * type safety.
 *
 * EnumWrapper cannot be directly instantiated. Use {@link $enum} to get/create an EnumWrapper
 * instance.
 *
 * @template V - Type of the enum value.
 * @template T - Type of the enum-like object that is being wrapped.
 */
export declare class EnumWrapper<V extends number | string = number | string, T extends Record<StringKeyOf<T>, V> = any> implements Iterable<EnumWrapper.Entry<T>>, ArrayLike<EnumWrapper.Entry<T>> {
    private readonly enumObj;
    /**
     * List of all keys for this enum, in the original defined order of the enum.
     */
    private readonly keysList;
    /**
     * List of all values for this enum, in the original defined order of the enum.
     */
    private readonly valuesList;
    /**
     * Map of enum value -> enum key.
     * Used for reverse key lookups.
     * NOTE: Performance tests show that using a Map (even if it's a slow polyfill) is faster than building a lookup
     *       string key for values and using a plain Object:
     *       {@link https://www.measurethat.net/Benchmarks/Show/2514/1/map-keyed-by-string-or-number}
     */
    private readonly keysByValueMap;
    /**
     * The number of entries in this enum.
     * Part of the Map-like interface.
     */
    readonly size: number;
    /**
     * The number of entries in this enum.
     * Part of the ArrayLike interface.
     */
    readonly length: number;
    /**
     * Index signature.
     * Part of the ArrayLike interface.
     */
    readonly [key: number]: EnumWrapper.Entry<T>;
    /**
     * Create a new EnumWrapper instance.
     * This is for internal use only.
     * Use {@link $enum} to publicly get/create an EnumWrapper
     *
     * @param enumObj - An enum-like object.
     */
    constructor(enumObj: T);
    /**
     * @return "[object EnumWrapper]"
     */
    toString(): string;
    /**
     * Get an iterator for this enum's keys.
     * Iteration order is based on the original defined order of the enum.
     * Part of the Map-like interface.
     * @return An iterator that iterates over this enum's keys.
     */
    keys(): IterableIterator<StringKeyOf<T>>;
    /**
     * Get an iterator for this enum's values.
     * Iteration order is based on the original defined order of the enum.
     * Part of the Map-like interface.
     * NOTE: If there are duplicate values in the enum, then there will also be duplicate values
     *       in the result.
     * @return An iterator that iterates over this enum's values.
     */
    values(): IterableIterator<T[StringKeyOf<T>]>;
    /**
     * Get an iterator for this enum's entries as [key, value] tuples.
     * Iteration order is based on the original defined order of the enum.
     * @return An iterator that iterates over this enum's entries as [key, value] tuples.
     */
    entries(): IterableIterator<EnumWrapper.Entry<T>>;
    /**
     * Get an iterator for this enum's entries as [key, value] tuples.
     * Iteration order is based on the original defined order of the enum.
     * @return An iterator that iterates over this enum's entries as [key, value] tuples.
     */
    [Symbol.iterator](): IterableIterator<EnumWrapper.Entry<T>>;
    /**
     * Calls the provided iteratee on each item in this enum.
     * Iteration order is based on the original defined order of the enum.
     * See {@link EnumWrapper.Iteratee} for the signature of the iteratee.
     * The return value of the iteratee is ignored.
     * @param iteratee - The iteratee.
     * @param context - If provided, then the iteratee will be called with the context as its "this" value.
     */
    forEach(iteratee: EnumWrapper.Iteratee<void, V, T>, context?: any): void;
    /**
     * Maps this enum's entries to a new list of values.
     * Iteration order is based on the original defined order of the enum.
     * Builds a new array containing the results of calling the provided iteratee on each item in this enum.
     * See {@link EnumWrapper.Iteratee} for the signature of the iteratee.
     * @param iteratee - The iteratee.
     * @param context - If provided, then the iteratee will be called with the context as its "this" value.
     * @return A new array containg the results of the iteratee.
     *
     * @template R - The of the mapped result for each entry.
     */
    map<R>(iteratee: EnumWrapper.Iteratee<R, V, T>, context?: any): R[];
    /**
     * Get a list of this enum's keys.
     * Order of items in the list is based on the original defined order of the enum.
     * @return A list of this enum's keys.
     */
    getKeys(): StringKeyOf<T>[];
    /**
     * Get a list of this enum's values.
     * Order of items in the list is based on the original defined order of the enum.
     * NOTE: If there are duplicate values in the enum, then there will also be duplicate values
     *       in the result.
     * @return A list of this enum's values.
     */
    getValues(): T[StringKeyOf<T>][];
    /**
     * Get a list of this enum's entries as [key, value] tuples.
     * Order of items in the list is based on the original defined order of the enum.
     * @return A list of this enum's entries as [key, value] tuples.
     */
    getEntries(): EnumWrapper.Entry<T>[];
    /**
     * Get the index of a key based on the original defined order of this enum.
     * @param key A valid key for this enum.
     * @return The index of the key based on the original defined order of this enum.
     */
    indexOfKey(key: StringKeyOf<T>): number;
    /**
     * Get the index of a value based on the original defined order of this enum.
     * @param value A valid value for this enum.
     * @return The index of the value based on the original defined order of this enum.
     */
    indexOfValue(value: T[StringKeyOf<T>]): number;
    /**
     * Tests if the provided string is actually a valid key for this enum
     * Acts as a type guard to confirm that the provided value is actually the enum key type.
     * @param key - A potential key value for this enum.
     * @return True if the provided key is a valid key for this enum.
     */
    isKey(key: string | null | undefined): key is StringKeyOf<T>;
    /**
     * Casts a string to a properly-typed key for this enum.
     * Throws an error if the key is invalid.
     * @param key - A potential key value for this enum.
     * @return The provided key value, cast to the type of this enum's keys.
     * @throws {Error} if the provided string is not a valid key for this enum.
     */
    asKeyOrThrow(key: string | null | undefined): StringKeyOf<T>;
    /**
     * Casts a string to a properly-typed key for this enum.
     * Returns a default key if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultKey - The key to be returned if the provided key is invalid.
     * @return The provided key value, cast to the type of this enum's keys.
     *         Returns `defaultKey` if the provided key is invalid.
     */
    asKeyOrDefault(key: string | null | undefined, defaultKey: StringKeyOf<T>): StringKeyOf<T>;
    /**
     * Casts a string to a properly-typed key for this enum.
     * Returns a default key if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultKey - The key to be returned if the provided key is invalid.
     * @return The provided key value, cast to the type of this enum's keys.
     *         Returns `defaultKey` if the provided key is invalid.
     */
    asKeyOrDefault(key: string | null | undefined, defaultKey?: StringKeyOf<T>): StringKeyOf<T> | undefined;
    /**
     * Casts a string to a properly-typed key for this enum.
     * Returns a default key if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultKey - The key to be returned if the provided key is invalid.
     * @return The provided key value, cast to the type of this enum's keys.
     *         Returns `defaultKey` if the provided key is invalid.
     */
    asKeyOrDefault(key: string | null | undefined, defaultKey: string): string;
    /**
     * Casts a string to a properly-typed key for this enum.
     * Returns a default key if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultKey - The key to be returned if the provided key is invalid.
     * @return The provided key value, cast to the type of this enum's keys.
     *         Returns `defaultKey` if the provided key is invalid.
     */
    asKeyOrDefault(key: string | null | undefined, defaultKey: string | undefined): string | undefined;
    /**
     * Tests if the provided value is a valid value for this enum.
     * Acts as a type guard to confirm that the provided value is actually the enum value type.
     * @param value - A potential value for this enum.
     * @return True if the provided value is valid for this enum.
     */
    isValue(value: V | null | undefined): value is T[StringKeyOf<T>];
    /**
     * Casts a value to a properly-typed value for this enum.
     * Throws an error if the value is invalid.
     * @param value - A potential value for this enum.
     * @return The provided value, cast to the type of this enum's values.
     * @throws {Error} if the provided value is not a valid value for this enum.
     */
    asValueOrThrow(value: V | null | undefined): T[StringKeyOf<T>];
    /**
     * Casts a value to a properly-typed value for this enum.
     * Returns a default value if the provided value is invalid.
     * @param value - A potential value for this enum.
     * @param defaultValue - The value to be returned if the provided value is invalid.
     * @return The provided value, cast to the type of this enum's values.
     *         Returns `defaultValue` if the provided value is invalid.
     */
    asValueOrDefault(value: V | null | undefined, defaultValue: T[StringKeyOf<T>]): T[StringKeyOf<T>];
    /**
     * Casts a value to a properly-typed value for this enum.
     * Returns a default value if the provided value is invalid.
     * @param value - A potential value for this enum.
     * @param defaultValue - The value to be returned if the provided value is invalid.
     * @return The provided value, cast to the type of this enum's values.
     *         Returns `defaultValue` if the provided value is invalid.
     */
    asValueOrDefault(value: V | null | undefined, defaultValue?: T[StringKeyOf<T>]): T[StringKeyOf<T>] | undefined;
    /**
     * Casts a value to a properly-typed value for this enum.
     * Returns a default value if the provided value is invalid.
     * @param value - A potential value for this enum.
     * @param defaultValue - The value to be returned if the provided value is invalid.
     * @return The provided value, cast to the type of this enum's values.
     *         Returns `defaultValue` if the provided value is invalid.
     */
    asValueOrDefault(value: V | null | undefined, defaultValue: V): V;
    /**
     * Casts a value to a properly-typed value for this enum.
     * Returns a default value if the provided value is invalid.
     * @param value - A potential value for this enum.
     * @param defaultValue - The value to be returned if the provided value is invalid.
     * @return The provided value, cast to the type of this enum's values.
     *         Returns `defaultValue` if the provided value is invalid.
     */
    asValueOrDefault(value: V | null | undefined, defaultValue: V | undefined): V | undefined;
    /**
     * Performs a reverse lookup from enum value to corresponding enum key.
     * Throws an error if the value is invalid.
     * NOTE: If this enum has any duplicate values, then one of the keys for the duplicated value is
     *       arbitrarily returned.
     * @param value - A potential value for this enum.
     * @return The key for the provided value.
     * @throws {Error} if the provided value is not a valid value for this enum.
     */
    getKeyOrThrow(value: V | null | undefined): StringKeyOf<T>;
    /**
     * Performs a reverse lookup from enum value to corresponding enum key.
     * Returns a default key if the provided value is invalid.
     * NOTE: If this enum has any duplicate values, then one of the keys for the duplicated value is
     *       arbitrarily returned.
     * @param value - A potential value for this enum.
     * @param defaultKey - The key to be returned if the provided value is invalid.
     * @return The key for the provided value.
     *         Returns `defaultKey` if the provided value is invalid.
     */
    getKeyOrDefault(value: V | null | undefined, defaultKey: StringKeyOf<T>): StringKeyOf<T>;
    /**
     * Performs a reverse lookup from enum value to corresponding enum key.
     * Returns a default key if the provided value is invalid.
     * NOTE: If this enum has any duplicate values, then one of the keys for the duplicated value is
     *       arbitrarily returned.
     * @param value - A potential value for this enum.
     * @param defaultKey - The key to be returned if the provided value is invalid.
     * @return The key for the provided value.
     *         Returns `defaultKey` if the provided value is invalid.
     */
    getKeyOrDefault(value: V | null | undefined, defaultKey?: StringKeyOf<T>): StringKeyOf<T> | undefined;
    /**
     * Performs a reverse lookup from enum value to corresponding enum key.
     * Returns a default key if the provided value is invalid.
     * NOTE: If this enum has any duplicate values, then one of the keys for the duplicated value is
     *       arbitrarily returned.
     * @param value - A potential value for this enum.
     * @param defaultKey - The key to be returned if the provided value is invalid.
     * @return The key for the provided value.
     *         Returns `defaultKey` if the provided value is invalid.
     */
    getKeyOrDefault(value: V | null | undefined, defaultKey: string): string;
    /**
     * Performs a reverse lookup from enum value to corresponding enum key.
     * Returns a default key if the provided value is invalid.
     * NOTE: If this enum has any duplicate values, then one of the keys for the duplicated value is
     *       arbitrarily returned.
     * @param value - A potential value for this enum.
     * @param defaultKey - The key to be returned if the provided value is invalid.
     * @return The key for the provided value.
     *         Returns `defaultKey` if the provided value is invalid.
     */
    getKeyOrDefault(value: V | null | undefined, defaultKey: string | undefined): string | undefined;
    /**
     * Gets the enum value for the provided key.
     * Throws an error if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @return The enum value for the provided key.
     * @throws {Error} if the provided string is not a valid key for this enum.
     */
    getValueOrThrow(key: string | null | undefined): T[StringKeyOf<T>];
    /**
     * Gets the enum value for the provided key.
     * Returns a default value if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultValue - The value to be returned if the provided key is invalid.
     * @return The enum value for the provided key.
     *         Returns `defaultValue` if the provided key is invalid.
     */
    getValueOrDefault(key: string | null | undefined, defaultValue: T[StringKeyOf<T>]): T[StringKeyOf<T>];
    /**
     * Gets the enum value for the provided key.
     * Returns a default value if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultValue - The value to be returned if the provided key is invalid.
     * @return The enum value for the provided key.
     *         Returns `defaultValue` if the provided key is invalid.
     */
    getValueOrDefault(key: string | null | undefined, defaultValue?: T[StringKeyOf<T>]): T[StringKeyOf<T>] | undefined;
    /**
     * Gets the enum value for the provided key.
     * Returns a default value if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultValue - The value to be returned if the provided key is invalid.
     * @return The enum value for the provided key.
     *         Returns `defaultValue` if the provided key is invalid.
     */
    getValueOrDefault(key: string | null | undefined, defaultValue: V): V;
    /**
     * Gets the enum value for the provided key.
     * Returns a default value if the provided key is invalid.
     * @param key - A potential key value for this enum.
     * @param defaultValue - The value to be returned if the provided key is invalid.
     * @return The enum value for the provided key.
     *         Returns `defaultValue` if the provided key is invalid.
     */
    getValueOrDefault(key: string | null | undefined, defaultValue: V | undefined): V | undefined;
}
export declare namespace EnumWrapper {
    /**
     * A tuple containing the key and value of a single entry in an enum.
     * @template T - Type of an enum-like object.
     */
    type Entry<T extends Record<StringKeyOf<T>, number | string> = any> = Readonly<[StringKeyOf<T>, T[StringKeyOf<T>]]>;
    /**
     * A function used in iterating all key/value entries in an enum.
     * @param value - An enum value.
     * @param key - An enum key.
     * @param enumWrapper - The EnumWrapper instance being iterated..
     * @param index - The index of the enum entry, based on the original defined order of the enum.
     * @return A result. The significance of the result depends on the type of iteration being performed.
     *
     * @template R - The type of the result.
     * @template V - Type of the enum value.
     * @template T - Type of an enum-like object.
     */
    type Iteratee<R = any, V extends number | string = number | string, T extends Record<StringKeyOf<T>, V> = any> = (this: any, value: T[StringKeyOf<T>], key: StringKeyOf<T>, enumWrapper: EnumWrapper<V, T>, index: number) => R;
}
/**
 * Type alias for an {@link EnumWrapper} for any type of enum-like object that contains only number values.
 *
 * @template T - Type of an enum-like object that contains only number values.
 */
export type NumberEnumWrapper<T extends Record<StringKeyOf<T>, number> = any> = EnumWrapper<number, T>;
export declare namespace NumberEnumWrapper {
    /**
     * Type alias for an {@link EnumWrapper.Entry} for any type of enum-like object that contains only number values.
     *
     * @template T - Type of an enum-like object that contains only number values.
     */
    type Entry<T extends Record<StringKeyOf<T>, number> = any> = EnumWrapper.Entry<T>;
    /**
     * Type alias for an {@link EnumWrapper.Iteratee} for any type of enum-like object that contains only number values.
     *
     * @template R - The type of the result.
     * @template T - Type of an enum-like object that contains only number values.
     */
    type Iteratee<R = any, T extends Record<StringKeyOf<T>, number> = any> = EnumWrapper.Iteratee<R, number, T>;
}
/**
 * Type alias for an {@link EnumWrapper} for any type of enum-like object that contains only string values.
 *
 * @template T - Type of an enum-like object that contains only string values.
 */
export type StringEnumWrapper<T extends Record<StringKeyOf<T>, string> = any> = EnumWrapper<string, T>;
export declare namespace StringEnumWrapper {
    /**
     * Type alias for an {@link EnumWrapper.Entry} for any type of enum-like object that contains only string values.
     *
     * @template T - Type of an enum-like object that contains only string values.
     */
    type Entry<T extends Record<StringKeyOf<T>, string> = any> = EnumWrapper.Entry<T>;
    /**
     * Type alias for an {@link EnumWrapper.Iteratee} for any type of enum-like object that contains only string values.
     *
     * @template R - The type of the result.
     * @template T - Type of an enum-like object that contains only string values.
     */
    type Iteratee<R = any, T extends Record<StringKeyOf<T>, string> = any> = EnumWrapper.Iteratee<R, string, T>;
}
/**
 * Type alias for an {@link EnumWrapper} for any type of enum-like object that contains a mix of
 * number and string values.
 *
 * @template T - Type of an enum-like object that contains a mix of number and string values.
 */
export type MixedEnumWrapper<T extends Record<StringKeyOf<T>, number | string> = any> = EnumWrapper<number | string, T>;
export declare namespace MixedEnumWrapper {
    /**
     * Type alias for an {@link EnumWrapper.Entry} for any type of enum-like object that contains a mix of
     * number and string values.
     *
     * @template T - Type of an enum-like object that contains a mix of number and string values.
     */
    type Entry<T extends Record<StringKeyOf<T>, number | string> = any> = EnumWrapper.Entry<T>;
    /**
     * Type alias for an {@link EnumWrapper.Iteratee} for any type of enum-like object that contains a mix of
     * number and string values.
     *
     * @template R - The type of the result.
     * @template T - Type of an enum-like object that contains a mix of number and string values.
     */
    type Iteratee<R = any, T extends Record<StringKeyOf<T>, number | string> = any> = EnumWrapper.Iteratee<R, number | string, T>;
}
//# sourceMappingURL=EnumWrapper.d.ts.map