import { FixedCapacityCache } from "../index";

describe("FixedCapacityCache", () => {
  describe("constructor", () => {
    [1, 2, 5, 10, Infinity].forEach(size =>
      it(`should set the max size (${size})`, () => {
        const cache = new FixedCapacityCache(size);
        expect(cache.maxSize).toBe(size);
      })
    );

    [0, -1, -2, -5, -10, -Infinity].forEach(size =>
      it(`should set the maxSize to 1 if a number below 1 is given (${size})`, () => {
        const cache = new FixedCapacityCache(size);
        expect(cache.maxSize).toBe(1);
      })
    );

    [null, undefined].forEach(size =>
      it(`should set the maxSize to 1 if a falsy is given (${size})`, () => {
        const cache = new FixedCapacityCache(size as unknown as number);
        expect(cache.maxSize).toBe(1);
      })
    );
  });

  describe("get", () => {
    it("should get a set value", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set("unwanted1", "unwanted1");
      cache.set("unwanted2", "unwanted2");
      cache.set(key, value);
      cache.set("unwanted3", "unwanted3");

      const result = cache.get(key);
      expect(result).toBe(value);
    });

    it("should return undefined if the key is not set", () => {
      const key = "key1";

      const cache = new FixedCapacityCache(3);
      cache.set("unwanted1", "unwanted1");
      cache.set("unwanted2", "unwanted2");
      cache.set("unwanted3", "unwanted3");

      const result = cache.get(key);
      expect(result).toBeUndefined();
    });

    it("should return undefined if the key is not set and the cache is empty", () => {
      const key = "key1";

      const cache = new FixedCapacityCache(3);

      const result = cache.get(key);
      expect(result).toBeUndefined();
    });

    it("should return undefined if a key was in the cache but has been overwritten by a new value", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);
      cache.set("unwanted1", "unwanted1");
      cache.set("unwanted2", "unwanted2");
      cache.set("unwanted3", "unwanted3");

      const result = cache.get(key);
      expect(result).toBeUndefined();
    });

    it("should reset the overwrite presidence of a key/value pair", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);
      cache.set("unwanted1", "unwanted1");
      cache.set("unwanted2", "unwanted2");

      cache.get(key);

      cache.set("unwanted3", "unwanted3");
      cache.set("unwanted4", "unwanted4");

      const result = cache.get(key);
      expect(result).toBe(value);
    });
  });

  describe("set", () => {
    it("should set a key/value pair", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);

      const result = cache.get(key);
      expect(result).toBe(value);
    });

    it("should overwrite the value for a key if it already exists", () => {
      const key = "key1";
      const value = "value1";
      const value2 = "value2";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);
      cache.set(key, value2);

      const result = cache.get(key);
      expect(result).toBe(value2);
    });

    [3, 5, 9].forEach(cacheSize =>
      it(`should remove a key/value pair if the cache is full (cacheSize: ${cacheSize})`, () => {
        const key = "key1";
        const value = "value1";

        let cache = new FixedCapacityCache(cacheSize);
        cache.set(key, value);

        // Fill the cache
        for (let i = 0; i < cacheSize - 1; i++) {
          cache.set(`unwanted${i}`, `unwanted${i}`);
        }

        const resultWhenExactlyFull = cache.get(key);
        expect(resultWhenExactlyFull).toBe(value);

        cache = new FixedCapacityCache(cacheSize);
        cache.set(key, value);

        // Overflow the cache
        for (let i = 0; i < cacheSize; i++) {
          cache.set(`unwanted${i}`, `unwanted${i}`);
        }

        const result = cache.get(key);
        expect(result).toBeUndefined();
      })
    );

    it("should reset the overwrite presidence of a key/value pair", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);
      cache.set("unwanted1", "unwanted1");
      cache.set("unwanted2", "unwanted2");

      cache.get(key);

      cache.set("unwanted3", "unwanted3");
      cache.set("unwanted4", "unwanted4");

      const result = cache.get(key);
      expect(result).toBe(value);
    });

    it("should not fill up the cache when re-using the same key", () => {
      const key = "key1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, "value1");
      cache.set(key, "value2");
      cache.set(key, "value3");
      cache.set(key, "value4");
      cache.set(key, "value5");

      const result = cache.size();
      expect(result).toBe(1);
    });
  });

  describe("delete", () => {
    it("should remove a cached key/value pair if it exists", () => {
      const key = "key1";
      const value = "value1";

      const cache = new FixedCapacityCache(3);
      cache.set(key, value);

      const sizeAfterSet = cache.size();
      expect(sizeAfterSet).toBe(1);

      cache.delete(key);

      const sizeAfterDelete = cache.size();
      expect(sizeAfterDelete).toBe(0);

      const result = cache.get(key);
      expect(result).toBeUndefined();
    });

    it("should not error if a key already does not exist", () => {
      const key = "key1";

      const cache = new FixedCapacityCache(3);
      cache.delete(key);

      const sizeAfterDelete = cache.size();
      expect(sizeAfterDelete).toBe(0);

      const result = cache.get(key);
      expect(result).toBeUndefined();
    });
  });

  describe("size", () => {
    [1, 3, 5, 9].forEach(cacheSize =>
      it(`should return the number of cached key/value pairs (${cacheSize})`, () => {
        const cache = new FixedCapacityCache(cacheSize + 1);

        for (let i = 0; i < cacheSize; i++) {
          cache.set(`key${i}`, `value${i}`);
        }

        const result = cache.size();
        expect(result).toBe(cacheSize);
      })
    );

    [1, 3, 5, 9].forEach(cacheSize =>
      it(`should return the cache max size when it is full (${cacheSize})`, () => {
        const cache = new FixedCapacityCache(cacheSize - 1);

        for (let i = 0; i < cacheSize; i++) {
          cache.set(`key${i}`, `value${i}`);
        }

        const result = cache.size();
        expect(result).toBe(cache.maxSize);
      })
    );

    it("should return 0 when the cache is empty", () => {
      const cache = new FixedCapacityCache(3);

      const result = cache.size();
      expect(result).toBe(0);
    });

    it("should return 0 when the cache has been cleared", () => {
      const cache = new FixedCapacityCache(3);

      cache.set("key1", "value1");
      cache.set("key2", "value2");
      cache.set("key3", "value3");

      cache.clear();

      const result = cache.size();
      expect(result).toBe(0);
    });
  });

  describe("clear", () => {
    it("should remove all cached key/value pairs", () => {
      const cache = new FixedCapacityCache(3);

      cache.set("key1", "value1");
      cache.set("key2", "value2");
      cache.set("key3", "value3");

      const sizeAfterSet = cache.size();
      expect(sizeAfterSet).toBe(3);

      cache.clear();

      const sizeAfterClear = cache.size();
      expect(sizeAfterClear).toBe(0);
    });

    it("should not error if the cache is already empty", () => {
      const cache = new FixedCapacityCache(3);

      cache.clear();

      const sizeAfterClear = cache.size();
      expect(sizeAfterClear).toBe(0);
    });
  });
});
