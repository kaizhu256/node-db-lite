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
        local.db = {};
        local.db.local = local;
    }());



    /* istanbul ignore next */
    // run shared js-env code - utility2 function
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

        local.utility2.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
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

        local.utility2.onErrorDefault = function (error) {
        /*
         * this function will print error.stack or error.message to stderr
         */
            // if error is defined, then print error.stack
            if (error && !local.global.__coverage__) {
                console.error('\nonErrorDefault - error\n' +
                    error.message + '\n' + error.stack + '\n');
            }
        };

        local.utility2.onErrorWithStack = function (onError) {
        /*
         * this function will return a new callback that will call onError,
         * and append the current stack to any error
         */
            var stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            return function (error, data, meta) {
                if (error && String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
        };

        local.utility2.onNext = function (options, onError) {
        /*
         * this function will wrap onError inside the recursive function options.onNext,
         * and append the current stack to any error
         */
            options.onNext = local.utility2.onErrorWithStack(function (error, data, meta) {
                try {
                    options.modeNext = error
                        ? Infinity
                        : options.modeNext + 1;
                    onError(error, data, meta);
                } catch (errorCaught) {
                    // throw errorCaught to break infinite recursion-loop
                    if (options.errorCaught) {
                        throw options.errorCaught;
                    }
                    options.errorCaught = errorCaught;
                    options.onNext(errorCaught, data, meta);
                }
            });
            return options;
        };

        local.utility2.onParallel = function (onError, onDebug) {
        /*
         * this function will return a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var self;
            onError = local.utility2.onErrorWithStack(onError);
            onDebug = onDebug || local.utility2.nop;
            self = function (error) {
                onDebug(error, self);
                // if previously counter === 0 or error occurred, then return
                if (self.counter === 0 || self.error) {
                    return;
                }
                // handle error
                if (error) {
                    self.error = error;
                    // ensure counter will decrement to 0
                    self.counter = 1;
                }
                // decrement counter
                self.counter -= 1;
                // if counter === 0, then call onError with error
                if (self.counter === 0) {
                    onError(error);
                }
            };
            // init counter
            self.counter = 0;
            // return callback
            return self;
        };

        local.utility2.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            try {
                local.utility2._debugTryCatchErrorCaught = null;
                return fnc();
            } catch (errorCaught) {
                local.utility2._debugTryCatchErrorCaught = errorCaught;
                return onError(errorCaught);
            }
        };
    }({ utility2: local.db }));



    // run shared js-env code - function
    (function () {
        local.db.dbClear = function (onError) {
        /*
         * this function will clear db and its persistence
         */
            Object.keys(local.db.dbTableDict).forEach(function (key) {
                // clear dbTable
                local.db.dbTableDict[key].dbTableClear();
            });
            // clear persistence
            local.db.dbStorageClear(onError);
        };

        local.db.dbExport = function (onError) {
        /*
         * this function will export db as a serialized dbTableList
         */
            var data;
            data = '';
            Object.keys(local.db.dbTableDict).forEach(function (key) {
                data += local.db.dbTableDict[key].dbTableExport() + '\n\n\n\n';
            });
            data = data.trim();
            return local.db.setTimeoutOnError(onError, null, data);
        };

        local.db.dbImport = function (dbTableList, onError) {
        /*
         * this function will import the serialized dbTableList
         */
            dbTableList.trim().split('\n\n\n\n').forEach(function (dbTable) {
                local.db.dbTableCreate({
                    isImported: true,
                    name: JSON.parse((/"name":("[^"].*?")/).exec(dbTable)[1])
                }).dbTableImport(dbTable);
            });
            return local.db.setTimeoutOnError(onError);
        };

        local.db.dbRowGetItem = function (dbRow, key) {
        /*
         * this function will get the item with the given key from dbRow
         */
            var value;
            local.db.assert(typeof key === 'string');
            value = dbRow;
            key.split('.').some(function (element) {
                if (!(value && typeof value === 'object')) {
                    return true;
                }
                value = value[element];
            });
            return local.db.valueNormalize(value);
        };

        local.db.dbRowRemoveItem = function (dbRow, key) {
        /*
         * this function will remove the item with the given key from dbRow
         */
            local.db.assert(typeof key === 'string');
            key = key.split('.');
            // if item doesn't exist, then do nothing
            if (key.slice(0, -1).some(function (element) {
                    dbRow = dbRow[element];
                    if (!(dbRow && typeof dbRow === 'object')) {
                        return true;
                    }
                })) {
                return;
            }
            // delete item
            delete dbRow[key[key.length - 1]];
        };

        local.db.dbRowSetItem = function (dbRow, key, value) {
        /*
         * this function will set the item with the given key and value to dbRow
         */
            var tmp;
            local.db.assert(typeof key === 'string');
            if (local.db.valueNormalize(value) === null) {
                local.db.dbRowRemoveItem(dbRow, key);
                return;
            }
            key = key.split('.');
            key.slice(0, -1).forEach(function (element) {
                tmp = dbRow[element];
                if (!(tmp && typeof tmp === 'object')) {
                    dbRow[element] = {};
                }
                dbRow = tmp;
            });
            dbRow[key[key.length - 1]] = value;
        };

        local.db.dbStorageClear = function (onError) {
        /*
         * this function will clear dbStorage
         */
            local.db.dbStorageDefer({ action: 'clear' }, onError);
        };

        local.db.dbStorageDefer = function (options, onError) {
        /*
         * this function will defer options.action until dbStorage is ready
         */
            var data, done, objectStore, onError2, request, tmp;
            if (!local.db.dbStorage) {
                local.db.dbStorageDeferList.push(function () {
                    local.db.dbStorageDefer(options, onError);
                });
                return;
            }
            switch (local.modeJs) {
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
                    objectStore = local.db.dbStorage
                        .transaction('db-lite', 'readwrite')
                        .objectStore('db-lite');
                    break;
                default:
                    objectStore = local.db.dbStorage
                        .transaction('db-lite', 'readonly')
                        .objectStore('db-lite');
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
                local.db._debugDbStorageRequest = request;
                break;
            case 'node':
                switch (options.action) {
                case 'clear':
                    local.child_process.spawn(
                        'sh',
                        ['-c', 'rm -f ' + local.db.dbStorage + '/*'],
                        { stdio: ['ignore', 1, 2] }
                    // ignore error
                    ).once('exit', function () {
                        onError();
                    });
                    break;
                case 'getItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.fs.readFile(
                        local.db.dbStorage + '/' + encodeURIComponent(options.key),
                        'utf8',
                        // ignore error
                        function (error, data) {
                            onError(error && null, data || '');
                        }
                    );
                    break;
                case 'keys':
                    local.fs.readdir(local.db.dbStorage, function (error, data) {
                        onError(error, data && data.map(decodeURIComponent));
                    });
                    break;
                case 'length':
                    local.fs.readdir(local.db.dbStorage, function (error, data) {
                        onError(error, data && data.length);
                    });
                    break;
                case 'removeItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.fs.unlink(
                        local.db.dbStorage + '/' + encodeURIComponent(options.key),
                        // ignore error
                        function () {
                            onError();
                        }
                    );
                    break;
                case 'setItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.db.assert(typeof options.value === 'string', options.value);
                    tmp = local.os.tmpdir() + '/' + Date.now() + Math.random();
                    // save to tmp
                    local.fs.writeFile(tmp, options.value, function (error) {
                        // validate no error occurred
                        local.db.assert(!error, error);
                        // rename tmp to key
                        local.fs.rename(
                            tmp,
                            local.db.dbStorage + '/' + encodeURIComponent(options.key),
                            onError
                        );
                    });
                    break;
                }
                break;
            }
        };

        local.db.dbStorageDeferList = [];

        local.db.dbStorageGetItem = function (key, onError) {
        /*
         * this function will get the item with the given key from dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.dbStorageDefer({ action: 'getItem', key: key }, onError);
        };

        local.db.dbStorageInit = function () {
        /*
         * this function will init dbStorage
         */
            var options, request;
            options = {};
            local.db.onNext(options, function (error) {
                // validate no error occurred
                local.db.assert(!error, error);
                if (local.modeJs === 'browser') {
                    local.db.dbStorage = local.global.db_lite_dbStorage;
                }
                switch (options.modeNext) {
                case 1:
                    if (local.db.dbStorage) {
                        options.onNext();
                        return;
                    }
                    switch (local.modeJs) {
                    case 'browser':
                        // init indexedDB
                        local.db.tryCatchOnError(function () {
                            request = local.global.indexedDB.open('db-lite');
                            request.onerror = options.onNext;
                            request.onsuccess = function () {
                                local.global.db_lite_dbStorage = request.result;
                                options.onNext();
                            };
                            request.onupgradeneeded = function () {
                                if (!request.result.objectStoreNames.contains('db-lite')) {
                                    request.result.createObjectStore('db-lite');
                                }
                            };
                        }, local.db.nop);
                        break;
                    case 'node':
                        // mkdirp dbStorage
                        local.db.dbStorage = 'tmp/db.storage.' + local.db.NODE_ENV;
                        local.child_process.spawnSync('mkdir', ['-p', local.db.dbStorage], {
                            stdio: ['ignore', 1, 2]
                        });
                        options.onNext();
                        break;
                    }
                    break;
                // run deferred actions
                case 2:
                    while (local.db.dbStorageDeferList.length) {
                        local.db.dbStorageDeferList.shift()();
                    }
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db.dbStorageKeys = function (onError) {
        /*
         * this function will get all the keys in dbStorage
         */
            local.db.dbStorageDefer({ action: 'keys' }, onError);
        };

        local.db.dbStorageLength = function (onError) {
        /*
         * this function will get the number of items in dbStorage
         */
            local.db.dbStorageDefer({ action: 'length' }, onError);
        };

        local.db.dbStorageRemoveItem = function (key, onError) {
        /*
         * this function will remove the item with the given key from dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.dbStorageDefer({ action: 'removeItem', key: key }, onError);
        };

        local.db.dbStorageSetItem = function (key, value, onError) {
        /*
         * this function will set the item with the given key and value to dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.assert(typeof value === 'string');
            local.db.dbStorageDefer({ action: 'setItem', key: key, value: value }, onError);
        };

        local.db.dbTableCreate = function (options, onError) {
        /*
         * this function will create a dbTable with the given options
         */
            var self;
            self = local.db.dbTableDict[options.name] =
                local.db.dbTableDict[options.name] || new local.db._DbTable(options);
            if (self.isImported) {
                return local.db.setTimeoutOnError(onError, null, self);
            }
            // import table from persistent-storage
            local.db.dbStorageGetItem(self.name, function (error, data) {
                // validate no error occurred
                local.db.assert(!error, error);
                if (!self.isImported) {
                    self.dbTableImport(data);
                }
                local.db.setTimeoutOnError(onError, null, self);
            });
            return self;
        };

        local.db.dbTableDict = {};

        local.db.operatorTest = function (operator, aa, bb) {
        /*
         * this function will test the operator with aa and bb
         */
            aa = local.db.valueNormalize(aa);
            bb = local.db.valueNormalize(bb);
            switch (operator) {
            case '$elemMatch':
                return !!(bb && typeof bb.some === 'function' && bb.some(function (element) {
                    return local.db.sortCompare(aa, element) === 0;
                }));
            case '$eq':
                return local.db.sortCompare(aa, bb) === 0;
            case '$exists':
                return !(!aa ^ local.db.isNullOrUndefined(bb));
            case '$gt':
                return local.db.sortCompare(aa, bb) > 0;
            case '$gte':
                return local.db.sortCompare(aa, bb) >= 0;
            case '$in':
                return !!(aa && typeof aa.some === 'function' && aa.some(function (element) {
                    return local.db.sortCompare(element, bb) === 0;
                }));
            case '$lt':
                return local.db.sortCompare(aa, bb) < 0;
            case '$lte':
                return local.db.sortCompare(aa, bb) <= 0;
            case '$ne':
                return local.db.sortCompare(aa, bb) !== 0;
            case '$nin':
                return !!(aa && typeof aa.every === 'function' && aa.every(function (element) {
                    return local.db.sortCompare(element, bb) !== 0;
                }));
            case '$regex':
                if (!(aa && typeof aa.test === 'function')) {
                    aa = new RegExp(aa);
                }
                return aa.test(bb);
            case '$size':
                return local.db.sortCompare(aa, bb) === 0;
            default:
                return false;
            }
        };

        local.db.setTimeoutOnError = function (onError, error, data) {
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

        local.db.sortCompare = function (aa, bb) {
        /*
         * this function will sort-compare aa vs bb
         */
            var typeof1, typeof2;
            aa = local.db.valueNormalize(aa);
            bb = local.db.valueNormalize(bb);
            // simple compare
            if (aa === bb) {
                return 0;
            }
            // null compare
            if (aa === null) {
                return 1;
            }
            if (bb === null) {
                return -1;
            }
            // compare different-types
            typeof1 = typeof aa;
            typeof2 = typeof bb;
            if (typeof1 !== typeof2) {
                if (typeof1 === 'boolean') {
                    return -1;
                }
                if (typeof2 === 'boolean') {
                    return 1;
                }
                if (typeof1 === 'number') {
                    return -1;
                }
                if (typeof2 === 'number') {
                    return 1;
                }
                return typeof1 === 'string'
                    ? -1
                    : 1;
            }
            // object compare
            if (typeof1 === 'object') {
                return 0;
            }
            // simple compare
            return aa < bb
                ? -1
                : 1;
        };

        local.db.valueNormalize = function (value) {
        /*
         * this function will normalize the value to a json-object
         */
            return value === undefined ||
                (typeof value === 'number' && !Number.isFinite(value))
                ? null
                : value;
        };

        // legacy
        local.db.isRegExp = function (obj) {
            return Object.prototype.toString.call(obj) === '[object RegExp]';
        };
        local.db.listUnique = function (list) {
        /*
         * this function will remove duplicate elements from the array
         */
            var seen;
            seen = {};
            return list.filter(function (element) {
                if (seen.hasOwnProperty(element)) {
                    return;
                }
                seen[element] = true;
                return true;
            });
        };
    }());



// init lib db
// https://github.com
// /louischatriot/db/blob/cadf4ef434e517e47c4e9ca1db5b89e892ff5981/browser-version/out/db.js
    (function () {
        local.db.logicalOperators = {};

        // ==============================================================
        // Updating dbRow's
        // ==============================================================

        function areThingsEqual(aa, bb) {
        /*
         * Check whether 'things' are equal
         * Things are defined as any native types (string, number, boolean, null, date)
         * and objects
         * In the case of object, we check deep equality
         * Returns true if they are, false otherwise
         */
            var aKeys, bKeys, ii;

            // Strings, booleans, numbers, null
            if (aa === null ||
                    typeof aa === 'string' ||
                    typeof aa === 'boolean' ||
                    typeof aa === 'number' ||
                    bb === null ||
                    typeof bb === 'string' ||
                    typeof bb === 'boolean' ||
                    typeof bb === 'number') {
                return aa === bb;
            }

            // Arrays (no match since arrays are used as aa $in)
            // undefined (no match since they mean field doesn't exist and can't be serialized)
            if ((!(Array.isArray(aa) &&
                    Array.isArray(bb)) &&
                    (Array.isArray(aa) || Array.isArray(bb))) ||
                    aa === undefined ||
                    bb === undefined) {
                return false;
            }

            // General objects (check for deep equality)
            // aa and bb should be objects at this point
            try {
                aKeys = Object.keys(aa);
                bKeys = Object.keys(bb);
            } catch (errorCaught) {
                return false;
            }

            if (aKeys.length !== bKeys.length) {
                return false;
            }
            for (ii = 0; ii < aKeys.length; ii += 1) {
                if (bKeys.indexOf(aKeys[ii]) === -1) {
                    return false;
                }
                if (!areThingsEqual(aa[aKeys[ii]], bb[aKeys[ii]])) {
                    return false;
                }
            }
            return true;
        }
        local.db.logicalOperators.$or = function (obj, query) {
        /*
         * Match any of the subqueries
         * @param {Model} obj
         * @param {Array of Queries} query
         */
            var ii;

            if (!Array.isArray(query)) {
                throw new Error('$or operator used without an array');
            }

            for (ii = 0; ii < query.length; ii += 1) {
                if (local.db.queryTest(query[ii], obj)) {
                    return true;
                }
            }

            return false;
        };
        local.db.logicalOperators.$and = function (obj, query) {
        /*
         * Match all of the subqueries
         * @param {Model} obj
         * @param {Array of Queries} query
         */
            var ii;

            if (!Array.isArray(query)) {
                throw new Error('$and operator used without an array');
            }

            for (ii = 0; ii < query.length; ii += 1) {
                if (!local.db.queryTest(query[ii], obj)) {
                    return false;
                }
            }

            return true;
        };
        local.db.logicalOperators.$not = function (obj, query) {
        /*
         * Inverted match of the query
         * @param {Model} obj
         * @param {Query} query
         */
            return !local.db.queryTest(query, obj);
        };
        local.db.logicalOperators.$where = function (obj, fnc) {
        /*
         * Use a function to match
         * @param {Model} obj
         * @param {Query} query
         */
            var result;

            if (typeof fnc !== 'function') {
                throw new Error('$where operator used without a function');
            }

            result = fnc.call(obj);
            if (typeof result !== 'boolean') {
                throw new Error('$where function must return boolean');
            }

            return result;
        };
        local.db.queryTest = function (query, dbRow) {
        /*
         * Tell if a given dbRow matches a query
         * @param {Object} dbRow to check
         * @param {Object} query
         */
            function matchQueryPart(dbRow, queryKey, queryValue, treatObjAsValue) {
            /*
             * Match an object against a specific { key: value } part of a query
             * if the treatObjAsValue flag is set, don't try to match every part separately,
             * but the array as a whole
             */
                var objValue, ii, keys, firstChars, dollarFirstChars, tmp;

                objValue = local.db.dbRowGetItem(dbRow, queryKey);

                // Check if the value is an array if we don't force a treatment as value
                if (Array.isArray(objValue) && !treatObjAsValue) {
                    // If the queryValue is an array, try to perform an exact match
                    if (Array.isArray(queryValue)) {
                        return matchQueryPart(dbRow, queryKey, queryValue, true);
                    }

                    // Check if we are using an array-specific comparison function
                    if (queryValue !== null &&
                            typeof queryValue === 'object' &&
                            !local.db.isRegExp(queryValue)) {
                        tmp = Object.keys(queryValue).some(function (key) {
                            switch (key) {
                            case '$elemMatch':
                            case '$size':
                                return matchQueryPart(dbRow, queryKey, queryValue, true);
                            }
                        });
                        if (tmp) {
                            return tmp;
                        }
                    }

                    // If not, treat it as an array of { dbRow, query }
                    // where there needs to be at least one match
                    for (ii = 0; ii < objValue.length; ii += 1) {
                        if (matchQueryPart({
                                key: objValue[ii]
                            }, 'key', queryValue)) {
                            return true;
                        } // key here could be any string
                    }
                    return false;
                }

                // queryValue is an actual object.
                // Determine whether it contains comparison operators
                // or only normal fields. Mixed objects are not allowed
                if (queryValue !== null &&
                        typeof queryValue === 'object' &&
                        !local.db.isRegExp(queryValue) &&
                        !Array.isArray(queryValue)) {
                    keys = Object.keys(queryValue);
                    firstChars = keys.map(function (item) {
                        return item[0];
                    });
                    dollarFirstChars = firstChars.filter(function (cc) {
                        return cc === '$';
                    });

                    if (dollarFirstChars.length !== 0 &&
                            dollarFirstChars.length !== firstChars.length) {
                        throw new Error('You cannot mix operators and normal fields');
                    }

                    // queryValue is an object of this form:
                    // { $comparisonOperator1: value1, ... }
                    if (dollarFirstChars.length > 0) {
                        return keys.every(function (key) {
                            return local.db.operatorTest(key, queryValue[key], objValue);
                        });
                    }
                }

                // queryValue is either a native value or a normal object
                // Basic matching is possible
                if (!areThingsEqual(objValue, queryValue)) {
                    return false;
                }

                return true;
            }

            // Primitive query against a primitive type
            // This is a bit of a hack since we construct an object with an arbitrary key
            // only to dereference it later
            // But I don't have time for a cleaner implementation now
            if (local.db.isNullOrUndefined(query) ||
                    typeof query !== 'object' ||
                    Array.isArray(query) ||
                    local.db.isNullOrUndefined(dbRow) ||
                    typeof dbRow !== 'object' ||
                    Array.isArray(dbRow)) {
                return matchQueryPart({ needAKey: dbRow }, 'needAKey', query);
            }

            // Normal query
            return Object.keys(query).every(function (key) {
                if (key[0] === '$') {
                    if (!local.db.logicalOperators[key]) {
                        throw new Error('Unknown logical operator ' + key);
                    }
                    if (!local.db.logicalOperators[key](dbRow, query[key])) {
                        return;
                    }
                } else if (!matchQueryPart(dbRow, key, query[key])) {
                    return;
                }
                return true;
            });
        };

        // Interface
        /*
         * Handle models (i.e. docs)
         * Serialization/deserialization
         * Copying
         * Querying, update
         */

        local.db._DbIndex = function (options) {
        /*
         * Create a new index
         * All methods on an index guarantee that either
         * the whole operation was successful and the index changed
         * or the operation was unsuccessful and an error is thrown
         * while the index is unchanged
         * @param {String} options.fieldName On which field should the index apply
         * (can use dot notation to index on sub fields)
         * @param {Boolean} options.unique Optional,
         * enforce a unique constraint (default: false)
         * (we can have dbRow's for which fieldName is undefined) (default: false)
         */
            this.fieldName = options.fieldName;
            this.isInteger = options.isInteger;
            this.isUnique = options.isUnique;
            // init dbTree
            this.dbTree = new local.db._DbTree({ isUnique: this.isUnique });
        };

        local.db._DbIndex.prototype.insertOrReplaceOne = function (dbRow) {
        /*
         * Insert a new dbRow in the index
         * If an array is passed, we insert all its elements
         * (if one insertion fails the index is not modified)
         * O(log(n))
         */
            var dbTree, keyValue, pathList, self;
            self = this;
            keyValue = local.db.dbRowGetItem(dbRow, self.fieldName);
            // auto-create unique keyValue
            if (self.isUnique && !keyValue && keyValue !== 0) {
                do {
                    keyValue = self.isInteger
                        ? Math.floor(Math.random() * 0x20000000000000)
                        : ('a' +
                            Math.random().toString(36).slice(2) +
                            Math.random().toString(36).slice(2)).slice(0, 16);
                } while (self.getMatching(keyValue).length);
                local.db.dbRowSetItem(dbRow, self.fieldName, keyValue);
            }
            // sparse index - ignore null keyValue
            if (local.db.isNullOrUndefined(keyValue)) {
                return;
            }
            dbTree = self.dbTree;
            pathList = [];
            // Empty tree, insert as root
            if (!self.dbTree.hasOwnProperty('keyValue')) {
                self.dbTree.keyValue = keyValue;
                self.dbTree.dbRowList.push(dbRow);
                self.dbTree.height = 1;
                return;
            }
            // Insert new leaf at the right place
            while (true) {
                // Same keyValue: no change in the tree structure
                if (local.db.sortCompare(dbTree.keyValue, keyValue) === 0) {
                    // if isUnique, then replace existing dbRow
                    if (dbTree.isUnique) {
                        // update timestamp
                        dbRow.createdAt = dbTree.dbRowList[0].createdAt;
                        dbTree.dbRowList[0] = dbRow;
                    // else insert new dbRow
                    } else {
                        dbTree.dbRowList.push(dbRow);
                    }
                    return;
                }
                pathList.push(dbTree);
                if (local.db.sortCompare(keyValue, dbTree.keyValue) < 0) {
                    if (!dbTree.left) {
                        dbTree.left = new local.db._DbTree({
                            keyValue: keyValue,
                            parent: dbTree,
                            isUnique: dbTree.isUnique,
                            dbRow: dbRow
                        });
                        pathList.push(dbTree.left);
                        break;
                    }
                    dbTree = dbTree.left;
                } else {
                    if (!dbTree.right) {
                        dbTree.right = new local.db._DbTree({
                            keyValue: keyValue,
                            parent: dbTree,
                            isUnique: dbTree.isUnique,
                            dbRow: dbRow
                        });
                        pathList.push(dbTree.right);
                        break;
                    }
                    dbTree = dbTree.right;
                }
            }
            self.dbTree = self.dbTree.rebalanceAlongPath(pathList);
        };

        local.db._DbIndex.prototype.removeOne = function (dbRow) {
        /*
         * Remove a dbRow from the index
         * If an array is passed, we remove all its elements
         * The remove operation is safe with regards to the 'unique' constraint
         * O(log(n))
         */
            var newData, dbTree, keyValue, pathList, replaceWith, self;
            self = this;
            keyValue = local.db.dbRowGetItem(dbRow, self.fieldName);
            // sparse index - ignore null keyValue
            if (local.db.isNullOrUndefined(keyValue)) {
                return;
            }
            newData = [];
            dbTree = self.dbTree;
            pathList = [];
            // Empty tree
            if (!self.dbTree.hasOwnProperty('keyValue')) {
                return;
            }
            // Either no match is found and the function will return from within the loop
            // Or a match is found and pathList will contain the path
            // from the root to the node to delete after the loop
            while (local.db.sortCompare(keyValue, dbTree.keyValue) !== 0) {
                pathList.push(dbTree);
                if (local.db.sortCompare(keyValue, dbTree.keyValue) < 0) {
                    if (dbTree.left) {
                        dbTree = dbTree.left;
                    // keyValue not found, no modification
                    } else {
                        return;
                    }
                } else {
                    // local.db.sortCompare(keyValue, dbTree.keyValue) is > 0
                    if (dbTree.right) {
                        dbTree = dbTree.right;
                    // keyValue not found, no modification
                    } else {
                        return;
                    }
                }
            }
            // Delete only a dbRow (no tree modification)
            if (dbTree.dbRowList.length > 1 && dbRow) {
                dbTree.dbRowList.forEach(function (d) {
                    if (d !== dbRow) {
                        newData.push(d);
                    }
                });
                dbTree.dbRowList = newData;
                return;
            }
            // Delete a whole node
            // Leaf
            if (!dbTree.left && !dbTree.right) {
                // This leaf is also the root
                if (dbTree === self.dbTree) {
                    delete dbTree.keyValue;
                    dbTree.dbRowList = [];
                    delete dbTree.height;
                    return;
                }
                if (dbTree.parent.left === dbTree) {
                    dbTree.parent.left = null;
                } else {
                    dbTree.parent.right = null;
                }
                self.dbTree = self.dbTree.rebalanceAlongPath(pathList);
                return;
            }
            // Node with only one child
            if (!dbTree.left || !dbTree.right) {
                replaceWith = dbTree.left || dbTree.right;
                // This node is also the root
                if (dbTree === self.dbTree) {
                    replaceWith.parent = null;
                    // height of replaceWith is necessarily 1
                    // because the tree was balanced before deletion
                    self.dbTree = replaceWith;
                    return;
                }
                if (dbTree.parent.left === dbTree) {
                    dbTree.parent.left = replaceWith;
                    replaceWith.parent = dbTree.parent;
                } else {
                    dbTree.parent.right = replaceWith;
                    replaceWith.parent = dbTree.parent;
                }
                self.dbTree = self.dbTree.rebalanceAlongPath(pathList);
                return;
            }
            // Node with two children
            // Use the in-order predecessor (no need to randomize since we actively rebalance)
            pathList.push(dbTree);
            replaceWith = dbTree.left;
            // Special case: the in-order predecessor is right below the node to delete
            if (!replaceWith.right) {
                dbTree.keyValue = replaceWith.keyValue;
                dbTree.dbRowList = replaceWith.dbRowList;
                dbTree.left = replaceWith.left;
                if (replaceWith.left) {
                    replaceWith.left.parent = dbTree;
                }
                self.dbTree = self.dbTree.rebalanceAlongPath(pathList);
                return;
            }
            // After this loop, replaceWith is the right-most leaf in the left subtree
            // and pathList the path from the root (inclusive) to replaceWith (exclusive)
            while (true) {
                if (replaceWith.right) {
                    pathList.push(replaceWith);
                    replaceWith = replaceWith.right;
                } else {
                    break;
                }
            }
            dbTree.keyValue = replaceWith.keyValue;
            dbTree.dbRowList = replaceWith.dbRowList;
            replaceWith.parent.right = replaceWith.left;
            if (replaceWith.left) {
                replaceWith.left.parent = replaceWith.parent;
            }
            self.dbTree = self.dbTree.rebalanceAlongPath(pathList);
        };

        local.db._DbIndex.prototype.getMatching = function (keyValue) {
        /*
         * Get all dbRow's in index whose keyValue match value (if it is a Thing)
         * or one of the elements of value (if it is an array of Things)
         * @param {Thing} value Value to match the keyValue against
         * @return {Array of dbRow's}
         */
            var self, _res = {}, res = [];
            self = this;
            if (!Array.isArray(keyValue)) {
                return self.dbTree.search(keyValue);
            }
            keyValue.forEach(function (keyValue) {
                self.getMatching(keyValue).forEach(function (dbRow) {
                    _res[dbRow._id] = dbRow;
                });
            });

            Object.keys(_res).forEach(function (_id) {
                res.push(_res[_id]);
            });

            return res;
        };


        local.db._DbTree = function (options) {
        /*
         * Constructor of the internal DbTree (AvlTree implementation)
         *
         * @param {Object} options Optional
         * @param {Key}      options.key Initialize this DbTree's key with key
         * @param {Node}     options.parent Parent node
         * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint
         * on the key or not
         * @param {Value}    options.dbRow Initialize this DbTree's dbRowList with [value]
         */
            if (options.hasOwnProperty('keyValue')) {
                this.keyValue = options.keyValue;
            }
            this.parent = options.parent;
            this.isUnique = options.isUnique;
            this.dbRowList = options.hasOwnProperty('dbRow')
                ? [options.dbRow]
                : [];
        };
        // ============================================
        // Methods used to actually work on the tree
        // ============================================

        local.db._DbIndex.prototype.dbRowListForEach = function (fnc) {
        /*
         * this function will recursively traverse dbIndex in sorted-order,
         * and call dbRowList.forEach(fnc)
         */
            var recurse;
            recurse = function (dbTree) {
                if (!dbTree) {
                    return;
                }
                recurse(dbTree.left);
                dbTree.dbRowList.forEach(fnc);
                recurse(dbTree.right);
            };
            recurse(this.dbTree);
        };

        local.db._DbIndex.prototype.dbTreeSome = function (fnc) {
        /*
         * this function will recursively traverse some of the dbTree in sorted-order,
         * and call fnc(dbTree, depth, ii)
         */
            var fnc2, ii, recurse;
            ii = 0;
            fnc2 = function (dbTree, depth) {
                ii += 1;
                return fnc(dbTree, depth, ii);
            };
            recurse = function (dbTree, depth) {
                if ((dbTree.left && recurse(dbTree.left, depth + 1)) ||
                        fnc2(dbTree, depth) ||
                        (dbTree.right && recurse(dbTree.right, depth + 1))) {
                    return true;
                }
                return false;
            };
            return recurse(this.dbTree, 1);
        };

        local.db._DbIndex.prototype.count = function () {
        /*
         * this function will count the number of dbRow's in dbIndex
         */
            var recurse, result;
            recurse = function (dbTree) {
                if (!dbTree) {
                    return;
                }
                result += dbTree.dbRowList.length;
                recurse(dbTree.left);
                recurse(dbTree.right);
            };
            result = 0;
            recurse(this.dbTree);
            return result;
        };

        local.db._DbTree.prototype.rotateLeft = function () {
        /*
         * Perform a left rotation of the tree if possible
         * and return the root of the resulting tree
         * The resulting tree's nodes' heights are also updated
         */
            var bb, pp, qq;
            pp = this;
            qq = this.right;
            bb = qq.left;
            // Alter tree structure
            if (pp.parent) {
                qq.parent = pp.parent;
                if (pp.parent.left === pp) {
                    pp.parent.left = qq;
                } else {
                    pp.parent.right = qq;
                }
            } else {
                qq.parent = null;
            }
            qq.left = pp;
            pp.parent = qq;
            pp.right = bb;
            if (bb) {
                bb.parent = pp;
            }
            // Update heights
            pp.height = Math.max((pp.left && pp.left.height) || 0, (bb && bb.height) || 0) + 1;
            qq.height = Math.max((qq.right && qq.right.height) || 0, pp.height) + 1;
            return qq;
        };

        local.db._DbTree.prototype.rotateRight = function () {
        /*
         * Perform a right rotation of the tree if possible
         * and return the root of the resulting tree
         * The resulting tree's nodes' heights are also updated
         */
            var bb, pp, qq;
            pp = this.left;
            qq = this;
            bb = pp.right;
            // Alter tree structure
            if (qq.parent) {
                pp.parent = qq.parent;
                if (qq.parent.left === qq) {
                    qq.parent.left = pp;
                } else {
                    qq.parent.right = pp;
                }
            } else {
                pp.parent = null;
            }
            pp.right = qq;
            qq.parent = pp;
            qq.left = bb;
            if (bb) {
                bb.parent = qq;
            }
            // Update heights
            qq.height = Math.max((bb && bb.height) || 0, (qq.right && qq.right.height) || 0) +
                1;
            pp.height = Math.max((pp.left && pp.left.height) || 0, qq.height) + 1;
            return pp;
        };

        local.db._DbIndex.prototype.print = function () {
        /*
         * this function will print the dbTree
         */
            var ii, recurse;
            recurse = function (dbTree, depth) {
                if (!dbTree) {
                    return;
                }
                ii += 1;
                depth = depth || '';
                console.log('[' + ii + ',' + (depth.length / 4) + '] ' + depth +
                    JSON.stringify(dbTree.keyValue));
                recurse(dbTree.left, depth + '*   ');
                recurse(dbTree.right, depth + '*   ');
            };
            ii = -1;
            recurse(this.dbTree);
        };

        local.db._DbTree.prototype.search = function (keyValue) {
        /*
         * Search for all dbRowList corresponding to a keyValue
         */
            if (!this.hasOwnProperty('keyValue')) {
                return [];
            }

            if (local.db.sortCompare(this.keyValue, keyValue) === 0) {
                return this.dbRowList;
            }

            if (local.db.sortCompare(keyValue, this.keyValue) < 0) {
                if (this.left) {
                    return this.left.search(keyValue);
                }
                return [];
            }
            if (this.right) {
                return this.right.search(keyValue);
            }
            return [];
        };

        local.db._DbIndex.prototype.validate = function (options) {
        /*
         * this function will validate dbTree
         */
            var height, keyValue, nn, tmp;
            if (typeof options.count === 'number') {
                local.utility2.assert(options.count === this.count());
            }
            keyValue = false;
            height = -1;
            nn = 0;
            this.dbTreeSome(function (dbTree, depth, ii) {
                // validate sort
                local.db.assert(
                    local.db.sortCompare(keyValue, dbTree.keyValue) <= 0,
                    [keyValue, dbTree.keyValue]
                );
                // validate nn
                nn += 1;
                local.db.assert(ii === nn, [ii, nn]);
                height = Math.max(depth, height);
            });
            // validate height
            // https://en.wikipedia.org/wiki/AVL_tree#Properties
            tmp = Math.log2(nn + 1);
            local.db.assert(tmp <= height, [tmp, height]);
            tmp = (1 / Math.log2(0.5 * (1 + Math.sqrt(5))));
            tmp = tmp * Math.log2(nn + 2) + 0.5 * tmp * Math.log2(5) - 2;
            tmp *= 1.000000000000001;
            local.db.assert(height < tmp, [height, tmp]);
        };

        // legacy
        local.db._DbTree.prototype.getLowerBoundMatcher = function (query) {
        /*
         * Return a function that tells whether a given key matches a lower bound
         */
            // No lower bound
            if (!query.hasOwnProperty('$gt') && !query.hasOwnProperty('$gte')) {
                return function () {
                    return true;
                };
            }

            if (query.hasOwnProperty('$gt') && query.hasOwnProperty('$gte')) {
                if (local.db.sortCompare(query.$gte, query.$gt) === 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$gt) > 0;
                    };
                }

                if (local.db.sortCompare(query.$gte, query.$gt) > 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$gte) >= 0;
                    };
                }
                return function (key) {
                    return local.db.sortCompare(key, query.$gt) > 0;
                };
            }

            if (query.hasOwnProperty('$gt')) {
                return function (key) {
                    return local.db.sortCompare(key, query.$gt) > 0;
                };
            }
            return function (key) {
                return local.db.sortCompare(key, query.$gte) >= 0;
            };
        };

        local.db._DbTree.prototype.getUpperBoundMatcher = function (query) {
        /*
         * Return a function that tells whether a given key matches an upper bound
         */
            // No lower bound
            if (!query.hasOwnProperty('$lt') && !query.hasOwnProperty('$lte')) {
                return function () {
                    return true;
                };
            }

            if (query.hasOwnProperty('$lt') && query.hasOwnProperty('$lte')) {
                if (local.db.sortCompare(query.$lte, query.$lt) === 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$lt) < 0;
                    };
                }

                if (local.db.sortCompare(query.$lte, query.$lt) < 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$lte) <= 0;
                    };
                }
                return function (key) {
                    return local.db.sortCompare(key, query.$lt) < 0;
                };
            }

            if (query.hasOwnProperty('$lt')) {
                return function (key) {
                    return local.db.sortCompare(key, query.$lt) < 0;
                };
            }
            return function (key) {
                return local.db.sortCompare(key, query.$lte) <= 0;
            };
        };

        // Append all elements in toAppend to array
        function append(array, toAppend) {
            var ii;

            for (ii = 0; ii < toAppend.length; ii += 1) {
                array.push(toAppend[ii]);
            }
        }
        local.db._DbTree.prototype.betweenBounds = function (query, lbm, ubm) {
        /*
         * Get all dbRowList for a key between bounds
         * Return it in key order
         * @param {Object} query Mongo-style query
         * where keys are $lt, $lte, $gt or $gte (other keys are not considered)
         * @param {Functions} lbm/ubm matching functions calculated at the first recursive step
         */
            var res = [];

            if (!this.hasOwnProperty('key')) {
                return [];
            } // Empty tree

            lbm = lbm || this.getLowerBoundMatcher(query);
            ubm = ubm || this.getUpperBoundMatcher(query);

            if (lbm(this.key) && this.left) {
                append(res, this.left.betweenBounds(query, lbm, ubm));
            }
            if (lbm(this.key) && ubm(this.key)) {
                append(res, this.dbRowList);
            }
            if (ubm(this.key) && this.right) {
                append(res, this.right.betweenBounds(query, lbm, ubm));
            }

            return res;
        };

        local.db._DbTree.prototype.balanceFactor = function () {
        /*
         * Return the balance factor
         */
            return ((this.left && this.left.height) || 0) -
                ((this.right && this.right.height) || 0);
        };

        local.db._DbTree.prototype.rebalanceAlongPath = function (path) {
        /*
         * Rebalance the tree along the given path.
         * The path is given reversed (as it was calculated
         * in the insert and delete functions).
         * Returns the new root of the tree
         * Of course, the first element of the path must be the root of the tree
         */
            // Empty tree
            var ii, rootCurrent, rotated;
            rootCurrent = this;
            if (!this.hasOwnProperty('keyValue')) {
                delete this.height;
                return this;
            }
            // Rebalance the tree and update all heights
            for (ii = path.length - 1; ii >= 0; ii -= 1) {
                path[ii].height = 1 + Math.max(path[ii].left
                    ? path[ii].left.height
                    : 0, path[ii].right
                    ? path[ii].right.height
                    : 0);
                if (path[ii].balanceFactor() > 1) {
                    // Right is not too small, don't change
                    if (path[ii].balanceFactor() <= 1) {
                        rotated = path[ii];
                    // Modify the tree if its right subtree is too small compared to the left
                    } else {
                        if (path[ii].left.balanceFactor() < 0) {
                            path[ii].left.rotateLeft();
                        }
                        rotated = path[ii].rotateRight();
                    }
                    if (ii === 0) {
                        rootCurrent = rotated;
                    }
                }
                if (path[ii].balanceFactor() < -1) {
                    // Left is not too small, don't change
                    if (path[ii].balanceFactor() >= -1) {
                        rotated = path[ii];
                    // Modify the tree if its left subtree is too small compared to the right
                    } else {
                        if (path[ii].right.balanceFactor() > 0) {
                            path[ii].right.rotateRight();
                        }
                        rotated = path[ii].rotateLeft();
                    }
                    if (ii === 0) {
                        rootCurrent = rotated;
                    }
                }
            }
            return rootCurrent;
        };

        local.projectForUnique = function (elt) {
        /*
         * Type-aware projection
         */
            if (elt === null) {
                return '$null';
            }
            if (typeof elt === 'string') {
                return '$string' + elt;
            }
            if (typeof elt === 'boolean') {
                return '$boolean' + elt;
            }
            if (typeof elt === 'number') {
                return '$number' + elt;
            }
            if (Array.isArray(elt)) {
                return '$date' + elt.getTime();
            }

            return elt; // Arrays and objects, will check for pointer equality
        };

        local.db._DbTable = function (options) {
        /*
         * this function will create a dbTable
         */
            this.isImported = this.isImported || options.isImported;
            this.name = options.name;
            // validate name
            local.db.assert(
                this.name && typeof this.name === 'string',
                'invalid name - ' + this.name
            );
            // validate unique name
            local.db.assert(
                local.db.dbTableDict[this.name] === this || !local.db.dbTableDict[this.name],
                'non-unique name - ' + this.name
            );
            // register dbTable in dbTableDict
            local.db.dbTableDict[this.name] = this;
            // init dbIndexDict
            this.dbIndexDict = {
                _id: new local.db._DbIndex({ fieldName: '_id', isUnique: true }),
                createdAt: new local.db._DbIndex({ fieldName: 'createdAt' }),
                updatedAt: new local.db._DbIndex({ fieldName: 'updatedAt' })
            };
            this.dbIndexTtlDict = {};
        };

        local.db._DbTable.prototype.crudCountMany = function (options, onError) {
        /*
         * this function will count the number of dbRow's in dbTable with the given options
         */
            var result;
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, { query: {} });
            result = 0;
            this.dbIndexCullMany(options.query).forEach(function (dbRow) {
                if (local.db.queryTest(options.query, dbRow)) {
                    result += 1;
                }
            });
            return local.db.setTimeoutOnError(onError, null, result);
        };

        local.db._DbTable.prototype.crudFindMany = function (options, onError) {
        /*
         * this function will find dbRow's in dbTable with the given options
         */
            var limit, projection, result, self, skip, sort, tmp;
            self = this;
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, {
                limit: Infinity,
                projection: {},
                query: {},
                skip: 0,
                sort: {}
            });
            result = [];
            sort = Object.keys(options.sort).map(function (key) {
                return {
                    key: key,
                    direction: options.sort[key]
                };
            });
            // optimization - no sort
            if (!sort.length) {
                limit = options.limit;
                skip = options.skip;
                self.dbIndexCullMany(options.query).some(function (dbRow) {
                    if (!local.db.queryTest(options.query, dbRow)) {
                        return;
                    }
                    skip -= 1;
                    if (skip >= 0) {
                        return;
                    }
                    result.push(dbRow);
                    limit -= 1;
                    if (limit <= 0) {
                        return true;
                    }
                });
            // sort
            } else {
                result = self.dbIndexCullMany(options.query)
                    .filter(function (dbRow) {
                        return local.db.queryTest(options.query, dbRow);
                    })
                    .sort(function (aa, bb) {
                        sort.some(function (element) {
                            tmp = element.direction * local.db.sortCompare(
                                local.db.dbRowGetItem(aa, element.key),
                                local.db.dbRowGetItem(bb, element.key)
                            );
                            return tmp;
                        });
                        return tmp;
                    })
                    // limit and skip
                    .slice(options.skip, options.skip + options.limit);
            }
            // projection
            projection = Object.keys(options.projection);
            if (projection.length) {
                // pick-type projection
                if (options.projection[projection[0]]) {
                    result = result.map(function (dbRow) {
                        tmp = {};
                        projection.forEach(function (key) {
                            tmp[key] = dbRow[key];
                        });
                        return tmp;
                    });
                // omit-type projection
                } else {
                    result = result.map(function (dbRow) {
                        tmp = {};
                        Object.keys(dbRow).forEach(function (key) {
                            if (!options.projection.hasOwnProperty(key)) {
                                tmp[key] = dbRow[key];
                            }
                        });
                        return tmp;
                    });
                }
            }
            return local.db.setTimeoutOnError(onError, null, result);
        };

        local.db._DbTable.prototype.crudFindOne = function (options, onError) {
        /*
         * this function will find one dbRow in dbTable with the given options
         */
            return this.crudFindMany({ limit: 1, query: options.query }, onError);
        };

        local.db._DbTable.prototype.crudRemoveMany = function (options, onError) {
        /*
         * this function will remove many dbRow's in dbTable with the given options
         */
            var result, self;
            self = this;
            result = [];
            self.dbIndexCullMany(options.query).some(function (dbRow) {
                if (local.db.queryTest(options.query, dbRow)) {
                    result.push(dbRow);
                    self.dbIndexList().forEach(function (dbIndex) {
                        dbIndex.removeOne(dbRow);
                    });
                    if (options.one) {
                        return true;
                    }
                }
            });
            self.dbTablePersist();
            return local.db.setTimeoutOnError(onError, null, result);
        };

        local.db._DbTable.prototype.crudRemoveOne = function (options, onError) {
        /*
         * this function will remove one dbRow in dbTable with the given options
         */
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, { one: true });
            return this.crudRemoveMany(options, onError);
        };

        local.db._DbTable.prototype.dbIndexCreate = function (options, onError) {
        /*
         * this function will create an index for the given dbTable
         */
        /*
         * Create an index is for this field. Same parameters as lib/indexes
         * For now this function is synchronous, we need to test how much time it takes
         * We use an async API for consistency with the rest of the code
         * @param {String} options.fieldName
         * @param {Boolean} options.isUnique
         * @param {Number} options.expireAfterSeconds - Optional, if set this index
         *     becomes a TTL index (only works on Date fields, not arrays of Date)
         * @param {Function} onError - callback, signature: error
         */
            var dbIndex;
            // validate options
            local.db.assert(!(options.fieldName &&
                options.fieldName === '_id' &&
                options.fieldName === 'createdAt' &&
                options.fieldName === 'updatedAt'), 'invalid fieldName ' + options.fieldName);
            dbIndex = this.dbIndexDict[options.fieldName] = new local.db._DbIndex(options);
            // With this implementation index creation is not necessary to ensure TTL
            // but we stick with MongoDB's API here
            if (options.expireAfterSeconds !== undefined) {
                this.dbIndexTtlDict[options.fieldName] = options.expireAfterSeconds;
            }
            this.dbIndexDict._id.dbRowListForEach(dbIndex.insertOrReplaceOne.bind(dbIndex));
            // We may want to force all options to be persisted including defaults,
            // not just the ones passed the index creation function
            this.dbTablePersist();
            return local.db.setTimeoutOnError(onError, null, this);
        };

        local.db._DbTable.prototype.dbIndexList = function () {
        /*
         * this function will list all dbIndex's in dbTable
         */
            var self;
            self = this;
            return Object.keys(self.dbIndexDict).map(function (key) {
                return self.dbIndexDict[key];
            });
        };

        local.db._DbTable.prototype.dbIndexRemove = function (options, onError) {
        /*
         * this function will remove the dbIndex from dbTable with the given options
         */
            // validate fieldName
            local.db.assert(!(options.fieldName &&
                options.fieldName === '_id' &&
                options.fieldName === 'createdAt' &&
                options.fieldName === 'updatedAt'), 'invalid fieldName ' + options.fieldName);
            delete this.dbIndexDict[options.fieldName];
            this.dbTablePersist();
            return local.db.setTimeoutOnError(onError, null, this);
        };

        local.db._DbTable.prototype.dbTableClear = function () {
        /*
         * this function will clear dbTable
         */
            var self;
            self = this;
            delete self.timerDbTableSave;
            self.isImported = true;
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.dbTree = new local.db._DbTree({ isUnique: dbIndex.isUnique });
            });
            // clear persistence
            local.db.dbStorageRemoveItem(self.name, local.db.onErrorDefault);
        };

        local.db._DbTable.prototype.dbTableExport = function () {
        /*
         * this function will export dbTable
         */
            var data, self;
            self = this;
            data = '####\n';
            data += JSON.stringify({ name: self.name }) + '\n';
            data += '#\n';
            self.dbIndexList().forEach(function (dbIndex) {
                switch (dbIndex.fieldName) {
                case '_id':
                case 'createdAt':
                case 'updatedAt':
                    return;
                }
                data += JSON.stringify({
                    fieldName: dbIndex.fieldName,
                    isInteger: dbIndex.isInteger,
                    isUnique: dbIndex.isUnique
                }) + '\n';
            });
            data += '#\n';
            self.dbIndexDict._id.dbRowListForEach(function (dbRow) {
                data += JSON.stringify(dbRow) + '\n';
            });
            data += '####';
            return data;
        };

        local.db._DbTable.prototype.dbTableImport = function (data) {
        /*
         * this function will import the data into dbTable
         */
            var self;
            self = this;
            self.isImported = true;
            if (!data) {
                return;
            }
            delete self.timerDbTableSave;
            data = data
                .replace((/^####/gm), '')
                .split('\n#')
                .map(function (element) {
                    return element
                        .trim()
                        .split('\n')
                        .filter(function (element) {
                            return element;
                        })
                        .map(function (element) {
                            return JSON.parse(element);
                        });
                });
            data[1].forEach(function (dbIndex) {
                dbIndex = self.dbIndexDict[dbIndex.fieldName] = new local.db._DbIndex(dbIndex);
                self.dbIndexDict._id.dbRowListForEach(dbIndex.insertOrReplaceOne.bind(dbIndex));
            });
            // insert data
            self.crudInsertOrReplaceMany(data[2], local.db.onErrorDefault);
        };

        local.db._DbTable.prototype.dbTablePersist = function () {
        /*
         * this function will persist dbTable to dbStorage
         */
            var self;
            self = this;
            // throttle dbStorage writes to 2 every 1000 ms
            if (self.timerDbTableSave) {
                return;
            }
            self.timerDbTableSave = setTimeout(function () {
                delete self.timerDbTableSave;
                local.db.dbStorageSetItem(
                    self.name,
                    self.dbTableExport(),
                    local.db.onErrorDefault
                );
            }, 1000);
            local.db.dbStorageSetItem(self.name, self.dbTableExport(), local.db.onErrorDefault);
        };

        local.db._DbTable.prototype.dbIndexCullMany = function (query) {
        /*
         * Return the dbRowList for a given query
         * Crude implementation for now, we return the dbRowList given
         * by the first usable index if any
         * We try the following query types,
         * in this order: basic match, $in match, comparison match
         * One way to make it better would be to enable the use of multiple indexes
         * if the first usable index
         * returns too much data. I may do it in the future.
         *
         * Returned dbRowList will be scanned to find and remove all expired dbRow's
         *
         * @param {Query} query
         */
            var result,
                self = this,
                options,
                usableQueryKeys;
            result = [];
            options = {};
            local.db.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // STEP 1: get dbRowList list by checking indexes
                // from most to least frequent usecase
                case 1:
                    // For a basic match
                    usableQueryKeys = Object.keys(query).filter(function (key) {
                        if (self.dbIndexDict.hasOwnProperty(key) &&
                                (typeof query[key] === 'string' ||
                                typeof query[key] === 'number' ||
                                typeof query[key] === 'boolean' ||
                                query[key] === null)) {
                            return true;
                        }
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(null, self.dbIndexDict[usableQueryKeys[0]]
                            .getMatching(query[usableQueryKeys[0]]));
                    }

                    // For a $in match
                    usableQueryKeys = [];
                    Object.keys(query).forEach(function (key) {
                        if (query[key] && query[key].hasOwnProperty('$in')) {
                            usableQueryKeys.push(key);
                        }
                    });
                    usableQueryKeys = usableQueryKeys.filter(function (element) {
                        return self.dbIndexDict.hasOwnProperty(element);
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(
                            null,
                            self.dbIndexDict[usableQueryKeys[0]]
                                .getMatching(query[usableQueryKeys[0]].$in)
                        );
                    }

                    // For a comparison match
                    usableQueryKeys = [];
                    Object.keys(query).forEach(function (key) {
                        if (query[key] && (query[key].hasOwnProperty('$lt') ||
                                query[key].hasOwnProperty('$lte') ||
                                query[key].hasOwnProperty('$gt') ||
                                query[key].hasOwnProperty('$gte'))) {
                            usableQueryKeys.push(key);
                        }
                    });
                    usableQueryKeys = usableQueryKeys.filter(function (element) {
                        return self.dbIndexDict.hasOwnProperty(element);
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(
                            null,
                            self.dbIndexDict[usableQueryKeys[0]].dbTree.betweenBounds(
                                query[usableQueryKeys[0]]
                            )
                        );
                    }

                    // By default, return all the DB data
                    data = [];
                    self.dbIndexDict._id.dbRowListForEach(function (dbRow) {
                        data.push(dbRow);
                    });
                    return options.onNext(null, data);
                // STEP 2: remove all expired dbRow's
                default:
                    // validate no error occurred
                    local.db.assert(!error, error);
                    var dbIndexTtlDictFieldNames = Object.keys(self.dbIndexTtlDict);
                    data.forEach(function (dbRow) {
                        var valid = true;
                        dbIndexTtlDictFieldNames.forEach(function (ii) {
                            if (dbRow[ii] !== undefined &&
                                    Date.now() > new Date(dbRow[ii]).getTime() +
                                    self.dbIndexTtlDict[ii] * 1000) {
                                valid = false;
                            }
                        });
                        if (valid) {
                            result.push(dbRow);
                        } else {
                            self.crudRemoveOne({ query: { _id: dbRow._id } });
                        }
                    });
                }
            });
            options.modeNext = 0;
            options.onNext();
            return result;
        };

        local.db._DbTable.prototype.crudInsertOrReplaceMany = function (dbRowList, onError) {
        /*
         * Insert or Replace a new dbRow
         * @param {Function} onError - callback, signature: error, insertedDoc
         */
            var self;
            self = this;
            return local.db.setTimeoutOnError(onError, null, dbRowList.map(function (dbRow) {
                return self.crudInsertOrReplaceOne(dbRow)[0];
            }));
        };

        local.db._DbTable.prototype.crudInsertOrReplaceOne = function (dbRow, onError) {
        /*
         * this function will insert or replace the dbRow in dbTable
         */
            var dbRowNormalize, self, timeNow;
            self = this;
            // normalize dbRow
            dbRowNormalize = function (dbRow) {
            /*
             * this function will normalize dbRow by recursively removing invalid properties
             */
                if (Array.isArray(dbRow)) {
                    // recurse
                    dbRow.forEach(dbRowNormalize);
                } else if (dbRow && typeof dbRow === 'object') {
                    Object.keys(dbRow).forEach(function (key) {
                        if (key[0] === '$' || key.indexOf('.') >= 0 || dbRow[key] === null) {
                            // remove invalid property
                            delete dbRow[key];
                            return;
                        }
                        // recurse
                        dbRowNormalize(dbRow[key]);
                    });
                }
                return dbRow;
            };
            dbRow = local.db.jsonCopy(dbRowNormalize(local.db.jsonCopy(dbRow)));
            // update timestamp
            timeNow = new Date().toISOString();
            dbRow.createdAt = dbRow.createdAt || timeNow;
            dbRow.updatedAt = timeNow;
            // insert dbRow into dbIndex
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.insertOrReplaceOne(dbRow);
            });
            self.dbTablePersist();
            return local.db.setTimeoutOnError(onError, null, [dbRow]);
        };

        local.db._DbTable.prototype.crudUpdateMany = function (options, onError) {
        /*
         * this function will update many dbRow's in dbTable with the given options.query
         */
            var result, self, timeNow;
            self = this;
            options = local.db.objectSetDefault({}, options);
            timeNow = new Date().toISOString();
            result = self.crudFindMany(options);
            result.forEach(function (dbRow) {
                local.db.objectSetOverride(dbRow, options.$set, Infinity);
                // update timestamp
                dbRow.updatedAt = timeNow;
            });
            result = self.crudInsertOrReplaceMany(result);
            return local.db.setTimeoutOnError(onError, null, result);
        };

        local.db._DbTable.prototype.crudUpdateOne = function (options, onError) {
        /*
         * this function will update one dbRow in dbTable with the given options.query
         */
            return this.crudUpdateMany({
                $set: options.$set,
                limit: 1,
                query: options.query
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.db_lite = local.global.utility2_db = local.db;
        local.db.NODE_ENV = 'undefined';
        break;



    // run node js-env code - post-init
    case 'node':
        // require modules
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.os = require('os');
        // init exports
        module.exports = module['./lib.db.js'] = local.db;
        local.db.__dirname = __dirname;
        local.db.NODE_ENV = process.env.NODE_ENV;
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init dbStorage
        local.db.dbStorageInit();
    }());
}());
