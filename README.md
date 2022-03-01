<a href="https://www.npmjs.com/package/fixed-capacity-cache" target="_blank" alt="npm version">
  <img alt="npm version" src="https://img.shields.io/npm/v/fixed-capacity-cache?logo=npm">
</a>
<a href="https://app.fossa.com/projects/custom%2B29651%2Fgithub.com%2Ftobysmith568%2Ffixed-capacity-cache?ref=badge_shield" target="_blank" alt="FOSSA Status">
  <img alt="FOSSA Status" src="https://app.fossa.com/api/projects/custom%2B29651%2Fgithub.com%2Ftobysmith568%2Ffixed-capacity-cache.svg?type=shield"/>
</a>
<a href="https://bundlephobia.com/package/fixed-capacity-cache" target="_blank" alt="npm bundle size">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/fixed-capacity-cache">
</a>
<a href="https://app.codecov.io/gh/tobysmith568/fixed-capacity-cache" target="_blank" alt="Codecov">
  <img alt="Codecov" src="https://img.shields.io/codecov/c/gh/tobysmith568/fixed-capacity-cache">
</a>

# fixed-capacity-cache

A tiny, 0-dependency, npm library containing a cache class that stores a fixed number of items.

If the cache is configured to only store three items when the fourth item is stored the oldest\* item is silently removed.

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

fixed-capacity-cache is licensed under the [ISC License](./LICENSE.md).

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B29651%2Fgithub.com%2Ftobysmith568%2Ffixed-capacity-cache.svg?type=large)](https://app.fossa.com/projects/custom%2B29651%2Fgithub.com%2Ftobysmith568%2Ffixed-capacity-cache?ref=badge_large)
