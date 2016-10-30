/*
 * assets.db-lite.js
 *
 * this package will run a standalone, browser-compatible version of the db v1.8.0 database
 * with zero npm-dependencies
 *
 * browser example:
 *     <script src="assets.db-lite.js"></script>
 *     <script>
 *     var dbTable1;
 *     dbTable1 = window.db_lite.dbTableCreate({ name: "dbTable1" });
 *     dbTable1.dbIndexCreate({ fieldName: "field1" });
 *     dbTable1.crudInsertOrReplaceOne({
 *         field1: "hello",
 *         field2: "world"
 *     });
 *     console.log(dbTable1.crudFindMany({ query: { field1: "hello" } }));
 *     </script>
 *
 * node example:
 *     var db, dbTable1;
 *     db = require("./assets.db-lite.js");
 *     dbTable1 = db.dbTableCreate({ name: "dbTable1" });
 *     dbTable1.dbIndexCreate({ fieldName: "field1" });
 *     dbTable1.crudInsertOrReplaceOne({
 *         field1: "hello",
 *         field2: "world"
 *     });
 *     console.log(dbTable1.crudFindMany({ query: { field1: "hello" } }));
 */



/* istanbul instrument in package db-lite */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        local.local = local.db = local;
    }());



    /* istanbul ignore next */
    // run shared js-env code - pre-function
    (function (local) {
        local.utility2.assert = function (passed, message) {
        /*
         * this function will throw the error message if passed is falsey
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // if message is an error-object, then leave it as is
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            throw error;
        };

        local.utility2.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
        };

        local.utility2.jsonStringifyOrdered = function (element, replacer, space) {
        /*
         * this function will JSON.stringify the element,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (element) {
            /*
             * this function will recursively JSON.stringify the element,
             * with object-keys sorted and circular-references removed
             */
                // if element is an object, then recurse its items with object-keys sorted
                if (element &&
                        typeof element === 'object' &&
                        typeof element.toJSON !== 'function') {
                    // ignore circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recurse its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        // sort object-keys
                        .sort()
                        .map(function (key) {
                            tmp = stringify(element[key]);
                            return typeof tmp === 'string'
                                ? JSON.stringify(key) + ':' + tmp
                                : undefined;
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify as normal
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.utility2.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.utility2.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in the arg
         */
            arg = arg || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                defaults2 = defaults[key];
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    local.utility2.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.utility2.objectSetOverride = function (arg, overrides, depth) {
        /*
         * this function will recursively set overrides for items the arg
         */
            arg = arg || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        (arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2)) &&
                        // overrides2 is a non-null and non-array object
                        (overrides2 &&
                        typeof overrides2 === 'object' &&
                        !Array.isArray(overrides2))) {
                    local.utility2.objectSetOverride(arg2, overrides2, depth - 1);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === local.utility2.envDict
                    // if arg is envDict, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };
    }({ utility2: local }));



    // run shared js-env code - lib.storage.js
    local.storageDir = 'tmp/db-lite.storage.' + (local.modeJs === 'browser'
        ? 'undefined'
        : process.env.NODE_ENV);
    (function (local) {
        var child_process,
            clear,
            defer,
            deferList,
            fs,
            getItem,
            init,
            keys,
            length,
            modeJs,
            os,
            removeItem,
            setItem;

        // init modeJs
        modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        switch (modeJs) {
        case 'node':
            // require modules
            child_process = require('child_process');
            fs = require('fs');
            os = require('os');
            break;
        }



        clear = function (onError) {
        /*
         * this function will clear storage
         */
            defer({ action: 'clear' }, onError);
        };

        defer = function (options, onError) {
        /*
         * this function will defer options.action until storage is ready
         */
            var data, done, objectStore, onError2, request, tmp;
            if (!local.storage) {
                deferList.push(function () {
                    defer(options, onError);
                });
                init();
                return;
            }
            switch (modeJs) {
            case 'browser':
                onError2 = function () {
                    if (done) {
                        return;
                    }
                    done = true;
                    onError(
                        request && (request.error || request.transaction.error),
                        data || request.result
                    );
                };
                switch (options.action) {
                case 'clear':
                case 'removeItem':
                case 'setItem':
                    objectStore = local.storage
                        .transaction(local.storageDir, 'readwrite')
                        .objectStore(local.storageDir);
                    break;
                default:
                    objectStore = local.storage
                        .transaction(local.storageDir, 'readonly')
                        .objectStore(local.storageDir);
                }
                switch (options.action) {
                case 'clear':
                    request = objectStore.clear();
                    break;
                case 'getItem':
                    request = objectStore.get(options.key);
                    break;
                case 'keys':
                    data = [];
                    request = objectStore.openCursor();
                    request.onsuccess = function () {
                        if (!request.result) {
                            onError2();
                            return;
                        }
                        data.push(request.result.key);
                        request.result.continue();
                    };
                    break;
                case 'length':
                    request = objectStore.count();
                    break;
                case 'removeItem':
                    request = objectStore.delete(options.key);
                    break;
                case 'setItem':
                    request = objectStore.put(options.value, options.key);
                    break;
                }
                ['onabort', 'onerror', 'onsuccess'].forEach(function (handler) {
                    request[handler] = request[handler] || onError2;
                });
                // debug request
                local._debugStorageRequest = request;
                break;
            case 'node':
                switch (options.action) {
                case 'clear':
                    child_process.spawnSync(
                        'sh',
                        ['-c', 'rm -f ' + local.storage + '/*'],
                        { stdio: ['ignore', 1, 2] }
                    );
                    setTimeout(onError);
                    break;
                case 'getItem':
                    fs.readFile(
                        local.storage + '/' + encodeURIComponent(options.key),
                        'utf8',
                        // ignore error
                        function (error, data) {
                            onError(error && null, data || '');
                        }
                    );
                    break;
                case 'keys':
                    fs.readdir(local.storage, function (error, data) {
                        onError(error, data && data.map(decodeURIComponent));
                    });
                    break;
                case 'length':
                    fs.readdir(local.storage, function (error, data) {
                        onError(error, data && data.length);
                    });
                    break;
                case 'removeItem':
                    fs.unlink(
                        local.storage + '/' + encodeURIComponent(options.key),
                        // ignore error
                        function () {
                            onError();
                        }
                    );
                    break;
                case 'setItem':
                    tmp = os.tmpdir() + '/' + Date.now() + Math.random();
                    // save to tmp
                    fs.writeFile(tmp, options.value, function (error) {
                        // validate no error occurred
                        local.assert(!error, error);
                        // rename tmp to key
                        fs.rename(
                            tmp,
                            local.storage + '/' + encodeURIComponent(options.key),
                            onError
                        );
                    });
                    break;
                }
                break;
            }
        };

        deferList = [];

        getItem = function (key, onError) {
        /*
         * this function will get the item with the given key from storage
         */
            local.assert(typeof key === 'string', key);
            defer({ action: 'getItem', key: key }, onError);
        };

        init = function () {
        /*
         * this function will init storage
         */
            var onError, request;
            onError = function (error) {
                local.assert(!error, error);
                if (modeJs === 'browser') {
                    local.storage = window[local.storageDir];
                }
                while (deferList.length) {
                    deferList.shift()();
                }
            };
            if (modeJs === 'browser') {
                local.storage = window[local.storageDir];
            }
            if (local.storage) {
                onError();
                return;
            }
            switch (modeJs) {
            case 'browser':
                // init indexedDB
                try {
                    request = window.indexedDB.open(local.storageDir);
                    // debug request
                    local._debugStorageRequestIndexedDB = request;
                    request.onerror = onError;
                    request.onsuccess = function () {
                        window[local.storageDir] = request.result;
                        onError();
                    };
                    request.onupgradeneeded = function () {
                        if (!request.result.objectStoreNames.contains(local.storageDir)) {
                            request.result.createObjectStore(local.storageDir);
                        }
                    };
                } catch (ignore) {
                }
                break;
            case 'node':
                // mkdirp storage
                local.storage = local.storageDir;
                child_process.spawnSync(
                    'mkdir',
                    ['-p', local.storage],
                    { stdio: ['ignore', 1, 2] }
                );
                onError();
                break;
            }
        };

        keys = function (onError) {
        /*
         * this function will get all the keys in storage
         */
            defer({ action: 'keys' }, onError);
        };

        length = function (onError) {
        /*
         * this function will get the number of items in storage
         */
            defer({ action: 'length' }, onError);
        };

        removeItem = function (key, onError) {
        /*
         * this function will remove the item with the given key from storage
         */
            local.assert(typeof key === 'string', key);
            defer({ action: 'removeItem', key: key }, onError);
        };

        setItem = function (key, value, onError) {
        /*
         * this function will set the item with the given key and value to storage
         */
            local.assert(typeof key === 'string', key);
            local.assert(typeof value === 'string', value);
            defer({ action: 'setItem', key: key, value: value }, onError);
        };

        // init local
        local.storageClear = clear;
        local.storageDefer = defer;
        local.storageDeferList = deferList;
        local.storageGetItem = getItem;
        local.storageInit = init;
        local.storageKeys = keys;
        local.storageLength = length;
        local.storageRemoveItem = removeItem;
        local.storageSetItem = setItem;
    }(local));



    // run shared js-env code - lib.dbTable.js
    (function () {
        local._DbTable = function (options) {
        /*
         * this function will create a dbTable
         */
            this.name = String(options.name);
            // validate unique name
            local.assert(
                local.dbTableDict[this.name] === this || !local.dbTableDict[this.name],
                'non-unique name - ' + this.name
            );
            // register dbTable in dbTableDict
            local.dbTableDict[this.name] = this;
            this.dbRowCount = 0;
            this.dbRowList = [];
            this.idIndexList = [{ name: '_id', dict: {} }];
        };

        local._DbTable.prototype._get = function (options) {
        /*
         * this function will get the dbRow in the dbTable with the given options._id
         */
            var id, result, self;
            self = this;
            result = null;
            self.idIndexList.some(function (idIndex) {
                id = local.dbRowGetItem(options, idIndex.name);
                if (id !== null &&
                        // optimization - hasOwnProperty
                        idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id].data;
                    return result;
                }
            });
            return result;
        };

        local._DbTable.prototype._remove = function (options) {
        /*
         * this function will remove the dbRow from the dbTable with the given options._id
         */
            var container, id, result, self, tmp;
            self = this;
            result = null;
            self.idIndexList.forEach(function (idIndex) {
                id = local.dbRowGetItem(options, idIndex.name);
                if (id !== null &&
                        // optimization - hasOwnProperty
                        idIndex.dict.hasOwnProperty(id)) {
                    container = idIndex.dict[id];
                    if (container.data) {
                        tmp = container.data;
                        result = result || tmp;
                        // decrement dbRowCount
                        if (idIndex.name === '_id') {
                            self.dbRowCount -= 1;
                        }
                        container.data = null;
                        // recurse
                        self._remove(tmp);
                    }
                }
            });
            return result;
        };

        local._DbTable.prototype._set = function (dbRow) {
        /*
         * this function will set the dbRow into the dbTable
         */
            var container, id, result, self, tmp;
            self = this;
            result = self.dbRowNormalize(dbRow);
            // remove existing dbRow
            tmp = self._remove(result) || result;
            // increment dbRowCount
            self.dbRowCount += 1;
            self.idIndexList.forEach(function (idIndex) {
                // auto-set id
                id = local.dbRowSetId(tmp, idIndex);
                local.dbRowSetItem(result, idIndex.name, id);
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    idIndex.dict[id].data = result;
                } else {
                    container = { data: result };
                    idIndex.dict[id] = container;
                    self.dbRowList.push(container);
                }
            });
            return result;
        };

        local._DbTable.prototype._update = function (dbRow) {
        /*
         * this function will update the dbRow in the dbTable
         */
            var id, result, self;
            self = this;
            result = null;
            self.idIndexList.some(function (idIndex) {
                id = local.dbRowGetItem(dbRow, idIndex.name);
                if (id !== null &&
                        // optimization - hasOwnProperty
                        idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id].data;
                    if (result) {
                        // remove existing dbRow
                        self._remove(result);
                        // update dbRow
                        dbRow._timeCreated = undefined;
                        result = self.dbRowNormalize(local.objectSetOverride(
                            result,
                            dbRow,
                            Infinity
                        ));
                        return true;
                    }
                }
            });
            if (result) {
                // replace dbRow
                self._set(result);
            }
            return result;
        };

        local._DbTable.prototype.crudCountAll = function (onError) {
        /*
         * this function will return the total number of dbRow's in the dbTable
         */
            return local.setTimeoutOnError(onError, null, this.dbRowCount);
        };

        local._DbTable.prototype.crudGetOneById = function (options, onError) {
        /*
         * this function will get the dbRow in the dbTable with the given options._id
         */
            var result;
            result = local.jsonCopy(this._get(options));
            return local.setTimeoutOnError(onError, null, result);
        };

        local._DbTable.prototype.crudInsertOrReplaceOne = function (dbRow, onError) {
        /*
         * this function will insert-or-replace the dbRow into the dbTable
         */
            var result;
            result = local.jsonCopy(this._set(local.jsonCopy(dbRow)));
            return local.setTimeoutOnError(onError, null, result);
        };

        local._DbTable.prototype.crudRemoveOneById = function (options, onError) {
        /*
         * this function will remove the dbRow in the dbTable with the given options._id
         */
            var result;
            result = local.jsonCopy(this._remove(options));
            return local.setTimeoutOnError(onError, null, result);
        };

        local._DbTable.prototype.crudUpdateOne = function (dbRow, onError) {
        /*
         * this function will update the dbRow in the dbTable, if it exists
         */
            var result;
            result = local.jsonCopy(this._update(local.jsonCopy(dbRow)));
            return local.setTimeoutOnError(onError, null, result);
        };

        local._DbTable.prototype.idIndexCreate = function (options, onError) {
        /*
         * this function will create an idIndex with the given options.name
         */
            var idIndex, name, self;
            self = this;
            name = String(options.name);
            if (name === '_id') {
                return local.setTimeoutOnError(onError);
            }
            // remove existing idIndex
            self.idIndexRemove(options);
            // init idIndex
            idIndex = {
                dict: {},
                isInteger: options.isInteger,
                name: options.name
            };
            self.idIndexList.push(idIndex);
            self.dbRowList.forEach(function (container) {
                // auto-set id
                if (container.data) {
                    idIndex.dict[local.dbRowSetId(container.data, idIndex)] = {
                        data: container.data
                    };
                }
            });
            return local.setTimeoutOnError(onError);
        };

        local._DbTable.prototype.idIndexRemove = function (options, onError) {
        /*
         * this function will remove the idIndex with the given options.name
         */
            var name, self;
            self = this;
            name = String(options.name);
            self.idIndexList = self.idIndexList.filter(function (idIndex) {
                return idIndex.name !== name || idIndex.name === '_id';
            });
            return local.setTimeoutOnError(onError);
        };

        local._DbTable.prototype.dbRowNormalize = function (dbRow) {
        /*
         * this function will recursively normalize dbRow
         */
            var normalize, timeNow;
            normalize = function (dbRow) {
            /*
             * this function will recursively normalize dbRow
             */
                var value;
                if (dbRow && typeof dbRow === 'object') {
                    Object.keys(dbRow).forEach(function (key) {
                        value = dbRow[key];
                        // remove invalid property
                        if (key[0] === '$' ||
                                key.indexOf('.') >= 0 ||
                                value === null ||
                                (typeof value === 'number' && !Number.isFinite(value))) {
                            // optimization - soft-delete
                            dbRow[key] = undefined;
                            return;
                        }
                        // recurse
                        normalize(dbRow[key]);
                    });
                }
            };
            // update timestamp
            timeNow = new Date().toISOString();
            dbRow._timeCreated = dbRow._timeCreated || timeNow;
            dbRow._timeModified = timeNow;
            // normalize
            normalize(dbRow);
            return local.jsonCopy(dbRow);
        };

        local.dbIndexList = [];

        local.dbTableCreate = function (options, onError) {
        /*
         * this function will create a dbTable with the given options
         */
            var self;
            self = local.dbTableDict[options.name] =
                local.dbTableDict[options.name] || new local._DbTable(options);
            if (onError) {
                local.setTimeoutOnError(onError, null, self);
            }
            return self;
        };

        local.dbTableDict = {};

        local.dbRowGetItem = function (dbRow, key) {
        /*
         * this function will get the item with the given key from dbRow
         */
            var value;
            local.assert(typeof key === 'string');
            value = dbRow;
            key.split('.').some(function (element) {
                if (!(value && typeof value === 'object')) {
                    return true;
                }
                value = value[element];
            });
            return value === undefined
                ? null
                : value;
        };

        local.dbRowSetId = function (dbRow, idIndex) {
        /*
         * this function will set a random and unique id into dbRow for the given idIndex,
         * if it doesn't exist
         */
            var id;
            id = local.dbRowGetItem(dbRow, idIndex.name);
            if (!(id || id === 0)) {
                do {
                    id = Math.floor(Math.random() * 0x1ffffffffffffe);
                    if (!idIndex.isInteger) {
                        id = 's' + ('00000000000' + id.toString(36)).slice(-11);
                    }
                } while (idIndex.dict.hasOwnProperty(id));
                local.dbRowSetItem(dbRow, idIndex.name, id);
            }
            return id;
        };

        local.db.dbRowSetItem = function (dbRow, key, value) {
        /*
         * this function will set the item with the given key and value to dbRow
         */
            var tmp;
            local.db.assert(typeof key === 'string');
            key = key.split('.');
            key.slice(0, -1).forEach(function (element) {
                tmp = dbRow[element];
                if (!(tmp && typeof tmp === 'object' && !Array.isArray(tmp))) {
                    dbRow[element] = {};
                }
                dbRow = dbRow[element];
            });
            dbRow[key[key.length - 1]] = value;
        };

        local.setTimeoutOnError = function (onError, error, data) {
        /*
         * this function will asynchronously call onError
         */
            if (typeof onError === 'function') {
                setTimeout(function () {
                    onError(error, data);
                });
            }
            return data;
        };

        local.sortCompare = function (aa, bb) {
        /*
         * this function will compare aa vs bb and return:
         * -1 if aa < bb
         *  0 if aa === bb
         *  1 if aa > bb
         * the priority for comparing different typeof's is:
         * number < boolean < string < object < undefined
         */
            var typeof1, typeof2;
            if (aa === bb) {
                return 0;
            }
            // handle undefined case
            if (aa === undefined) {
                return 1;
            }
            if (bb === undefined) {
                return -1;
            }
            typeof1 = typeof aa;
            typeof2 = typeof bb;
            if (typeof1 === typeof2) {
                return typeof1 === 'object'
                    ? 0
                    : aa < bb
                    ? -1
                    : 1;
            }
            if (typeof1 === 'number') {
                return -1;
            }
            if (typeof2 === 'number') {
                return 1;
            }
            if (typeof1 === 'boolean') {
                return -1;
            }
            if (typeof2 === 'boolean') {
                return 1;
            }
            if (typeof1 === 'string') {
                return -1;
            }
            if (typeof2 === 'string') {
                return 1;
            }
            return 0;
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.db_lite = local.global.utility2_db = local.db;
        break;



    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        // init exports
        module.exports = module['./lib.db.js'] = local.db;
        local.__dirname = __dirname;
        break;
    }
}());
