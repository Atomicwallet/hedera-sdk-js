/**
 * @template T
 * @typedef {import("../EntityId.js").default<T>} EntityId<T>
 */

/**
 * @abstract
 * @template {EntityId<*>} KeyT
 * @template ValueT
 */
export default class ObjectMap {
    /**
     * @param {(s: string) => KeyT} fromString
     */
    constructor(fromString) {
        /** @type {Map<string, ValueT>} */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this._map = new Map();

        /** @type {Map<KeyT, ValueT>} */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.__map = new Map();

        this._fromString = fromString;
    }

    /**
     * @param {KeyT | string} key
     * @returns {?ValueT}
     */
    get(key) {
        const k = typeof key === "string" ? key : key.toString();

        const value = this._map.get(k);
        return value != null ? value : null;
    }

    /**
     * @internal
     * @param {KeyT} key
     * @param {ValueT} value
     */
    _set(key, value) {
        const k = typeof key === "string" ? key : key.toString();

        this._map.set(k, value);
        this.__map.set(typeof k === "string" ? this._fromString(k) : k, value);
    }

    /**
     * @returns {IterableIterator<ValueT>}
     */
    values() {
        return this._map.values();
    }

    /**
     * @returns {IterableIterator<KeyT>}
     */
    keys() {
        return this.__map.keys();
    }

    /**
     * @returns {IterableIterator<[KeyT, ValueT]>}
     */
    [Symbol.iterator]() {
        return this.__map[Symbol.iterator]();
    }
}
