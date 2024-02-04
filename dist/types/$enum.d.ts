import { EnumWrapper } from "./EnumWrapper";
import { StringKeyOf } from "./types";
import * as symbols from "./symbols";
import { visitEnumValue } from "./visitEnumValue";
import { mapEnumValue } from "./mapEnumValue";
/**
 * Gets a cached EnumWrapper for an enum-like object with number values.
 * Creates and caches a new EnumWrapper if one is not already cached.
 * @param enumObj - An enum-like object with number values.
 * @return An instance of EnumWrapper for the provided enumObj.
 *
 * @template T - Type of the enum-like object that is being wrapped.
 */
export declare function $enum<V extends number, T extends Record<StringKeyOf<T>, number>>(enumObj: T): EnumWrapper<number, T>;
/**
 * Gets a cached EnumWrapper for an enum-like object with string values.
 * Creates and caches a new EnumWrapper if one is not already cached.
 * @param enumObj - An enum-like object with string values.
 * @return An instance of EnumWrapper for the provided enumObj.
 *
 * @template T - Type of the enum-like object that is being wrapped.
 */
export declare function $enum<T extends Record<StringKeyOf<T>, string>>(enumObj: T): EnumWrapper<string, T>;
/**
 * Gets a cached EnumWrapper for an enum-like object with a mixture of number
 * and string values.
 * Creates and caches a new EnumWrapper if one is not already cached.
 * @param enumObj - An enum-like object with a mixture of number and string
 *        values.
 * @return An instance of EnumWrapper for the provided enumObj.
 *
 * @template T - Type of the enum-like object that is being wrapped.
 */
export declare function $enum<T extends Record<StringKeyOf<T>, number | string>>(enumObj: T): EnumWrapper<number | string, T>;
export declare namespace $enum {
    var handleNull: typeof symbols.handleNull;
    var handleUndefined: typeof symbols.handleUndefined;
    var handleUnexpected: typeof symbols.handleUnexpected;
    var unhandledEntry: typeof symbols.unhandledEntry;
    var visitValue: typeof visitEnumValue;
    var mapValue: typeof mapEnumValue;
}
//# sourceMappingURL=$enum.d.ts.map