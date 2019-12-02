interface LRUinterface {
  cache: object;
  maxSize: number;
  data: string[];
}

class LRUCache implements LRUinterface {
  cache: object = {};
  data: string[] = [];
  maxSize: number = 0;

  constructor(size: number) {
    this.maxSize = size;
  }

  _addData = (key: string) => {
    const { cache, data, maxSize, _deleteData } = this;

    // if replacing, find old data and delete it
    _deleteData(key);
    data.push(key);

    // if adding, check size of cache and cleanup
    if (data.length > maxSize) {
      const deleteItem = data[0];
      delete cache[deleteItem];
      data.splice(0, 1);
    }
  };

  _deleteData = (key: string) => {
    const keyIndex = this.data.indexOf(key);
    if (keyIndex > -1) this.data.splice(keyIndex, 1);
  };

  //Value could be a string or object too if required
  put = (key: string, value: number) => {
    this.cache[key] = value;
    this._addData(key);
  };

  get = (key: string) => {
    const result: number = this.cache[key];
    if (result) this._addData(key);
    return result;
  };

  del = (key: string) => {
    delete this.cache[key];
    this._deleteData(key);
  };

  reset = () => {
    this.cache = {};
    this.data = [];
  };
}

const myCache = new LRUCache(4);

myCache.put("key1", 5);
myCache.put("key2", 22);
myCache.put("key3", 8);
myCache.put("key4", 3);
myCache.put("key5", 13);

// Now we get the LRU cache to dump the first key
console.log(`First key value is kicked out and returns: `, myCache.get("key1"));

const tryIt = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});


tryIt.question(`Try another key to get (key1 - key5): `, (key: string) => {
  console.log(myCache.get(key));
  tryIt.close();
});


module.exports = LRUCache;
