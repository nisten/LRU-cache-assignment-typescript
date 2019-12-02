var LRUCache = /** @class */ (function () {
    function LRUCache(size) {
        var _this = this;
        this.cache = {};
        this.data = [];
        this._addData = function (key) {
            var _a = _this, cache = _a.cache, data = _a.data, maxSize = _a.maxSize, _deleteData = _a._deleteData;
            // if replacing, find old data and delete
            _deleteData(key);
            data.push(key);
            // if adding, check size of cache and cleanup
            if (data.length > maxSize) {
                var deleteItem = data[0];
                delete cache[deleteItem];
                data.splice(0, 1);
            }
        };
        this._deleteData = function (key) {
            var keyIndex = _this.data.indexOf(key);
            if (keyIndex > -1)
                _this.data.splice(keyIndex, 1);
        };
        //Value could be a string or object too if required
        this.put = function (key, value) {
            _this.cache[key] = value;
            _this._addData(key);
        };
        this.get = function (key) {
            var result = _this.cache[key];
            if (result)
                _this._addData(key);
            return result;
        };
        this.del = function (key) {
            delete _this.cache[key];
            _this._deleteData(key);
        };
        this.reset = function () {
            _this.cache = {};
            _this.data = [];
        };
        this.maxSize = size;
    }
    return LRUCache;
}());
var myCache = new LRUCache(4);
myCache.put("key1", 5);
myCache.put("key2", 1);
myCache.put("key3", 8);
myCache.put("key4", 3);
myCache.put("key5", 13);
console.log("First key value is kicked out and returns: ", myCache.get("key1"));
var tryIt = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
// at this point I'd expect my LRU cache to dump the first key
tryIt.question("Try another key to get (key1 - key5): ", function (key) {
    console.log(myCache.get(key));
    tryIt.close();
});
module.exports = LRUCache;
