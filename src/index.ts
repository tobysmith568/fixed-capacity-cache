/*!
 * ISC
 * Copyright (c) 2022 Toby Smith
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * A cache that only stores the most recent N items.
 */
export class FixedCapacityCache<TKey, TValue> {
  private readonly cache: Map<TKey, TValue> = new Map();
  private readonly keySet: Set<TKey> = new Set();

  public readonly maxSize: number;

  /**
   * A cache that only stores the most recent N items.
   * @param maxSize The maximum number of items to store in the cache.
   */
  constructor(maxSize: number) {
    if (!maxSize || maxSize < 1) {
      maxSize = 1;
    }

    this.maxSize = maxSize;
  }

  /**
   * Gets the value associated with the given key.
   * @param key The key to get the value for.
   * @returns The value for the given key, or undefined if the key is not in the cache.
   */
  public get(key: TKey): TValue | undefined {
    if (!this.keySet.has(key)) {
      return undefined;
    }

    this.moveKeyToEnd(key);

    return this.cache.get(key);
  }

  /**
   * Adds a value to the cache.
   * This will remove an old value if the cache is full.
   * @param key The key to associate with the given value.
   * @param value The value to associate with the given key.
   * @returns The new value associated with the given key.
   */
  public set(key: TKey, value: TValue): TValue {
    if (this.cache.has(key)) {
      this.cache.set(key, value);

      this.moveKeyToEnd(key);
      return value;
    }

    this.cache.set(key, value);
    this.keySet.add(key);

    if (this.keySet.size > this.maxSize) {
      const keyToRemove = this.keySet.values().next().value;

      this.cache.delete(keyToRemove);
      this.keySet.delete(keyToRemove);
    }

    return value;
  }

  /**
   * Removes the value associated with the given key.
   * @param key The key of the value to remove.
   */
  public delete(key: TKey): void {
    this.cache.delete(key);
    this.keySet.delete(key);
  }

  /**
   * Returns the number of items in the cache.
   * @returns The number of items in the cache.
   */
  public size(): number {
    return this.keySet.size;
  }

  /**
   * Clears the cache.
   */
  public clear(): void {
    this.cache.clear();
    this.keySet.clear();
  }

  private moveKeyToEnd(key: TKey): void {
    this.keySet.delete(key);
    this.keySet.add(key);
  }
}
