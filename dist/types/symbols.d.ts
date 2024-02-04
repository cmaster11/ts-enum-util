/**
 * Unique symbol to be used as the value of an entry in a value
 * visitor/mapper implementation to indicate that the entry is explicitly
 * not handled.
 * If the corresponding value is encountered at run-time, then an error is
 * thrown.
 */
export declare const unhandledEntry: unique symbol;
/**
 * Unique symbol used as a property name in value visitor/mapper
 * implementations to define a special null value handler.
 * A symbol is used to avoid any possibility of a collision with an actual
 * string enum value.
 */
export declare const handleNull: unique symbol;
/**
 * Unique symbol used as a property name in value visitor/mapper
 * implementations to define a special undefined value handler.
 * A symbol is used to avoid any possibility of a collision with an actual
 * string enum value.
 */
export declare const handleUndefined: unique symbol;
/**
 * Unique symbol used as a property name in value visitor/mapper
 * implementations to define a special "unexpected" value handler (handles
 * values at run-time that are unexpected based on compile time type).
 * A symbol is used to avoid any possibility of a collision with an actual
 * string enum value.
 */
export declare const handleUnexpected: unique symbol;
//# sourceMappingURL=symbols.d.ts.map