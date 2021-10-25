# fixed-capacity-cache
A tiny, 0-dependency, npm library containing a cache class that stores a fixed number of items.

If the cache is configured to only store three items when the fourth item is stored the oldest* item is silently removed.

\*oldest is defined by the item which is either gotten or set least recently.

## Usage

#### TypeScript
```ts
const cacheCapacity = 3;

const key = 1;
const value = "value1";

const cache = new FixedCapacityCache<number, string>(cacheCapacity);
cache.set(key, value);

const retrievedValue = cache.get(key);
```
#### API
```ts
class FixedCapacityCache<TKey, TValue> {
  readonly maxSize: number;
  /**
   * A cache which only stores the most recent N items.
   * @param maxSize The maximum number of items to store in the cache.
   */
  constructor(maxSize: number);
  /**
   * Gets the value associated with the given key.
   * @param key The key to get the value for.
   * @returns The value for the given key, or undefined if the key is not in the cache.
   */
  get(key: TKey): TValue | undefined;
  /**
   * Adds a value to the cache.
   * This will remove an old value if the cache is full.
   * @param key The key to associate with the given value.
   * @param value The value to associate with the given key.
   * @returns The new value associated with the given key.
   */
  set(key: TKey, value: TValue): TValue;
  /**
   * Removes the value associated with the given key.
   * @param key The key of the value to remove.
   */
  delete(key: TKey): void;
  /**
   * Returns the number of items in the cache.
   * @returns The number of items in the cache.
   */
  size(): number;
  /**
   * Clears the cache.
   */
  clear(): void;
}
```

## Building the library yourself
```bash
npm ci
npm build
```

## License
#### ISC
Copyright (c) 2021 Toby Smith

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.

