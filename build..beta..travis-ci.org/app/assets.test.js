/* istanbul instrument in package db */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        var err;
        if (passed) {
            return;
        }
        err = (
            // ternary-operator
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2 || require("utility2")
).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local.testCase_dbLoad_err = function (opt, onError) {
/*
 * this function will test dbLoad's err handling-behavior
 */
    local.testMock([
        [
            local, {
                storageKeys: function (fnc) {
                    fnc(local.errDefault);
                }
            }
        ]
    ], function (onError) {
        local.dbLoad(function (err) {
            // validate err occurred
            local.assertThrow(err, err);
        });
        onError(null, opt);
    }, onError);
};

local.testCase_dbTable_crudGetManyByQuery = function (opt, onError) {
/*
 * this function will test dbTable's crudGetManyByQuery handling-behavior
 */
    opt = {};
    // test dbTableCreateOne's create handling-behavior
    opt.dbTable = local.dbTableCreateOne({
        name: "testCase_dbTable_crudGetManyByQuery"
    });
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // test isDirty handling-behavior
    opt.dbTable.crudRemoveOneById(opt.dbTable.crudSetOneById({
        field1: "dirty"
    }));
    // test null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        // test shuffle handling-behavior
        shuffle: true
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    opt.data = ([
        [],
        [[], "", 0, {}, false, null, undefined],
        -0.5,
        -1,
        -Infinity,
        0,
        0.5,
        1,
        Infinity,
        NaN,
        {},
        false,
        null,
        true,
        undefined
    ]).sort().map(function (element) {
        return {
            field1: element
        };
    });
    opt.data = opt.data.concat(opt.data.map(function (dbRow) {
        return {
            field1: JSON.stringify(dbRow.field1)
        };
    }));
    // test dbTableCreateOne's crudSetManyById handling-behavior
    opt.data = opt.dbTable.crudSetManyById(opt.data);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 30);
    // validate data
    [
        [],
        [[], "", 0, {}, false, null, undefined],
        -0.5,
        -1,
        undefined,
        0,
        0.5,
        1,
        undefined,
        undefined,
        {},
        false,
        undefined,
        true,
        undefined,
        "[]",
        "[[],\"\",0,{},false,null,null]",
        "-0.5",
        "-1",
        "null",
        "0",
        "0.5",
        "1",
        "null",
        "null",
        "{}",
        "false",
        "null",
        "true",
        undefined
    ].forEach(function (element, ii) {
        local.assertJsonEqual(element, opt.data[ii].field1);
    });
    // test null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $undefined: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $undefined: {}
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $eq's boolean handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: true
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 1);
    local.assertJsonEqual(opt.data, [
        true
    ]);
    // test $eq's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: null
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 7);
    local.assertJsonEqual(
        opt.data.slice(0, -1),
        [
            null, null, null, null, null, null
        ]
    );
    // test $eq's number handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: 0
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 2);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        0
    ]);
    // test $eq's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: "{}"
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 1);
    local.assertJsonEqual(opt.data, [
        "{}"
    ]);
    // test $exists's false handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $exists: false
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 7);
    // test $exists's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $exists: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 7);
    // test $exists's true handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $exists: true
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 23);
    // test $gt's boolean handling-behavior
    // test $lt's boolean handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gt: false,
                $lt: true
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $gt's null-case handling-behavior
    // test $lt's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gt: false,
                $lt: true
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $gt's number handling-behavior
    // test $lt's number handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gt: -1,
                $lt: 1
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 4);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        -0.5, 0, 0.5
    ]);
    // test $gt's string handling-behavior
    // test $lt's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gt: "false",
                $lt: "true"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 4);
    local.assertJsonEqual(opt.data, [
        "null", "null", "null", "null"
    ]);
    // test $gte's boolean handling-behavior
    // test $lte's boolean handling-behavior
    // test $ne's boolean handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gte: false,
                $lte: true,
                $ne: false
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 2);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        true
    ]);
    // test $gte's null-case handling-behavior
    // test $lte's null-case handling-behavior
    // test $ne's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gte: null,
                $lte: null,
                $ne: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 1);
    local.assertJsonEqual(opt.data.slice(0, -1), []);
    // test $gte's number handling-behavior
    // test $lte's number handling-behavior
    // test $ne's number handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gte: -1,
                $lte: 1,
                $ne: 0
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 5);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        -1, -0.5, 0.5, 1
    ]);
    // test $gte's number handling-behavior
    // test $lte's number handling-behavior
    // test $ne's number handling-behavior
    // test fieldList handling-behavior
    // test limit handling-behavior
    // test skip handling-behavior
    // test sort's isDescending handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        fieldList: [
            "field1"
        ],
        limit: 2,
        query: {
            field1: {
                $gte: -1,
                $lte: 1,
                $ne: 0
            }
        },
        skip: 2,
        sort: [
            {
                fieldName: "field1",
                isDescending: true
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 2);
    local.assertJsonEqual(opt.data.slice(), [
        0.5, -0.5
    ]);
    // test $gte's string handling-behavior
    // test $lte's string handling-behavior
    // test $ne's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $gte: "false",
                $lte: "true",
                $ne: "null"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 2);
    local.assertJsonEqual(opt.data, [
        "false", "true"
    ]);
    // test $in's list handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $in: [
                    true, 1
                ]
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 2);
    local.assertJsonEqual(opt.data, [
        true, 1
    ]);
    // test $in's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $in: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $in's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $in: "0.5"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 3);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        "0", "0.5"
    ]);
    // test $nin's list handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $nin: [
                    0, null
                ]
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 22);
    // test $nin's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $nin: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $nin's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $nin: "[[],\"\",0,1,{},false,null,true]"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 4);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        "-0.5", "-1", "0.5"
    ]);
    // test $not's number handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $not: {
                    $gte: 0
                }
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 26);
    local.assertJsonEqual(opt.data.slice(0, 15), [
        null,
        null,
        null,
        null,
        null,
        null,
        false,
        true,
        -1,
        -0.5,
        "-0.5",
        "-1",
        "0",
        "0.5",
        "1"
    ]);
    // test $not's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $not: {
                    $gte: "0"
                }
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 17);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        null,
        null,
        null,
        null,
        null,
        null,
        false,
        true,
        -1,
        -0.5,
        0,
        0.5,
        1,
        "-0.5",
        "-1",
        {}
    ]);
    // test $or's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            $or: null
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $or's empty-list handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            $or: []
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $or's list handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            $or: [
                {
                    field1: {
                        $eq: -0.5
                    }
                }, {
                    field1: {
                        $eq: 0
                    }
                }, {
                    field1: {
                        $eq: 0.5
                    }
                }
            ]
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 4);
    local.assertJsonEqual(opt.data.slice(0, -1), [
        -0.5, 0, 0.5
    ]);
    // test $regex's regex handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $regex: (
                    /1|true/
                )
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 6);
    local.assertJsonEqual(opt.data, [
        true, -1, 1, "-1", "1", "true"
    ]);
    // test $regex's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $regex: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $typeof's boolean handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "boolean"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 3);
    // test $typeof's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: null
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $typeof's number handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "number"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 6);
    // test $typeof's object handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "object"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 8);
    // test $typeof's string handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "string"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    }).map(function (dbRow) {
        return dbRow.field1;
    });
    local.assertJsonEqual(opt.data.length, 15);
    // test $typeof's symbol handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "symbol"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    // test $typeof's undefined handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            field1: {
                $typeof: "undefined"
            }
        },
        sort: [
            {
                fieldName: "field1"
            }
        ]
    });
    local.assertJsonEqual(opt.data.length, 0);
    local.assertJsonEqual(opt.data, []);
    onError();
};

local.testCase_dbTable_crudNullCase = function (opt, onError) {
/*
 * this function will test dbTable's crud null-case handling-behavior
 */
    opt = {};
    // test dbTableCreateMany's null-case handling-behavior
    local.dbTableCreateMany();
    // test dbTableCreateOne's onError handling-behavior
    opt.dbTable = local.dbTableCreateOne({
        name: "testCase_dbTable_crudNullCase"
    }, local.onErrorDefault);
    // test dbTableCreateOne's null-case handling-behavior
    opt.dbTable = local.dbTableCreateOne({
        name: "testCase_dbTable_crudNullCase"
    });
    // test crudRemoveAll's null-case handling-behavior
    opt.dbTable.crudRemoveAll();
    // test cancel-pending-save handling-behavior
    opt.dbTable.save(local.nop);
    // test drop's null-case handling-behavior
    opt.dbTable.drop();
    // test idIndexCreate's null-case handling-behavior
    opt.dbTable.idIndexCreate({
        name: "_id"
    });
    // test idIndexRemove's null-case handling-behavior
    opt.dbTable.idIndexRemove({
        name: "_id"
    });
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // test crudCountManyByQuery's null-case handling-behavior
    opt.data = opt.dbTable.crudCountManyByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, 0);
    // test crudGetManyById's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyById();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudGetManyByQuery's null-case handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudGetOneById's null-case handling-behavior
    opt.data = opt.dbTable.crudGetOneById();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    // test crudGetOneByRandom's null-case handling-behavior
    opt.data = opt.dbTable.crudGetOneByRandom();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    // test crudGetOneByQuery's null-case handling-behavior
    opt.data = opt.dbTable.crudGetOneByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    // test crudRemoveManyById's null-case handling-behavior
    opt.data = opt.dbTable.crudRemoveManyById();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudRemoveManyByQuery's null-case handling-behavior
    opt.data = opt.dbTable.crudRemoveManyByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudRemoveOneById's null-case handling-behavior
    opt.data = opt.dbTable.crudRemoveOneById();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    // test crudUpdateManyById's null-case handling-behavior
    opt.data = opt.dbTable.crudUpdateManyById();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudUpdateManyByQuery's null-case handling-behavior
    opt.data = opt.dbTable.crudUpdateManyByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, []);
    // test crudSetOneById's and crudUpdateOneById's null-case handling-behavior
    [
        "crudSetOneById", "crudUpdateOneById"
    ].forEach(function (operation) {
        opt.data = opt.dbTable[operation]();
        // validate dbRowCount
        local.assertJsonEqual(opt.dbTable.crudCountAll(), 1);
        opt._id = opt.data._id;
        // validate timestamp
        local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
        // test crudRemoveOneById's soft-delete handling-behavior
        opt.data = opt.dbTable.crudRemoveOneById(opt);
        // validate dbRowCount
        local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
        // validate data
        local.assertJsonEqual(opt.data._id, opt._id);
    });
    // test crudGetOneById's null-case handling-behavior
    opt.data = opt.dbTable.crudGetOneById(opt);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    // test crudRemoveOneById's null-case handling-behavior
    opt.data = opt.dbTable.crudRemoveOneById(opt);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data, null);
    onError();
};

local.testCase_dbTable_crudXxxById = function (opt, onError) {
/*
 * this function will test dbTable's crudXxxById handling-behavior
 */
    opt = {};
    // test dbTableCreateMany's create handling-behavior
    opt.dbTable = local.dbTableCreateMany([
        {
            idIndexCreateList: [
                null
            ],
            idIndexRemoveList: [
                null
            ],
            name: "testCase_dbTable_crudXxxById"
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // test crudSetManyById's insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        null, null
    ]);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate data
    local.assertJsonEqual(opt.data.length, 2);
    // test crudRemoveManyById's soft-delete handling-behavior
    opt.data = opt.dbTable.crudRemoveManyById(opt.data);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 0);
    // validate data
    local.assertJsonEqual(opt.data.length, 2);
    // test crudSetManyById's insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        null, {
            field1: 1,
            field2: 2,
            field3: 3
        }
    ])[1];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonNotEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, undefined);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, 2);
    local.assertJsonEqual(opt.data.field3, 3);
    // test idIndexCreate's create handling-behavior
    // hack-istanbul - $isRemoved
    opt.dbTable.crudSetOneById({
        _id: "undefined"
    });
    opt.dbTable.crudRemoveOneById({
        _id: "undefined"
    });
    opt._id = opt.data._id;
    opt.dbTable.idIndexCreate({
        isInteger: true,
        name: "id2"
    });
    // test crudGetManyById's get handling-behavior
    opt.data = opt.dbTable.crudGetManyById([
        {
            _id: opt._id
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonNotEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, 2);
    // test crudUpdateManyById's update handling-behavior
    opt.id2 = opt.data.id2;
    opt.data = opt.dbTable.crudUpdateManyById([
        {
            id2: opt.id2,
            field2: NaN,
            field3: [
                new Date(0)
            ]
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate timestamp
    local.assertThrow(opt.data._timeCreated <= opt.data._timeUpdated, opt.data);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, [
        "1970-01-01T00:00:00.000Z"
    ]);
    // test crudSetManyById's replace handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        {
            id2: opt.id2
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudUpdateManyById's update handling-behavior
    opt.data = opt.dbTable.crudUpdateManyById([
        {
            id2: opt.id2,
            field1: 1
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate timestamp
    local.assertThrow(opt.data._timeCreated <= opt.data._timeUpdated, opt.data);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudRemoveManyById's soft-delete handling-behavior
    opt.data = opt.dbTable.crudRemoveManyById([
        opt
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 1);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudSetManyById's re-insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        {
            id2: opt.id2
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonNotEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudRemoveManyById's soft-delete handling-behavior
    opt._id = opt.data._id;
    opt.data = opt.dbTable.crudRemoveManyById([
        opt
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 1);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    onError();
};

local.testCase_dbTable_crudXxxByQuery = function (opt, onError) {
/*
 * this function will test dbTable's crudXxxByQuery handling-behavior
 */
    opt = {};
    // test dbTableCreateMany's create handling-behavior
    opt.dbTable = local.dbTableCreateMany([
        {
            idIndexCreateList: [
                null
            ],
            idIndexRemoveList: [
                null
            ],
            name: "testCase_dbTable_crudXxxByQuery"
        }
    ])[0];
    // drop dbTable
    opt.dbTable.drop();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 0);
    // test crudSetManyById's insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        null, null
    ]);
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate data
    local.assertJsonEqual(opt.data.length, 2);
    // test crudRemoveManyByQuery's soft-delete handling-behavior
    opt.data = opt.dbTable.crudRemoveManyByQuery();
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 0);
    // validate data
    local.assertJsonEqual(opt.data.length, 2);
    // test crudSetManyById's insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        null, {
            field1: 1,
            field2: 2,
            field3: 3
        }
    ])[1];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonNotEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, undefined);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, 2);
    local.assertJsonEqual(opt.data.field3, 3);
    // test idIndexCreate's create handling-behavior
    opt._id = opt.data._id;
    opt.dbTable.idIndexCreate({
        isInteger: true,
        name: "id2"
    });
    // test crudGetManyByQuery's get handling-behavior
    opt.data = opt.dbTable.crudGetManyByQuery({
        query: {
            _id: opt._id
        }
    })[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonNotEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, 2);
    // test crudGetOneByQuery's get handling-behavior
    opt.data = opt.dbTable.crudGetOneByQuery({
        _id: opt._id
    });
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonNotEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, 2);
    // test crudUpdateManyByQuery's update handling-behavior
    opt.id2 = opt.data.id2;
    opt.data = opt.dbTable.crudUpdateManyByQuery({
        id2: opt.id2
    }, {
        id2: opt.id2,
        field2: NaN,
        field3: [
            new Date(0)
        ]
    })[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate timestamp
    local.assertThrow(opt.data._timeCreated <= opt.data._timeUpdated, opt.data);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, [
        "1970-01-01T00:00:00.000Z"
    ]);
    // test crudSetManyById's replace handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        {
            id2: opt.id2
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudUpdateManyByQuery's update handling-behavior
    opt.data = opt.dbTable.crudUpdateManyByQuery({
        id2: opt.id2
    }, {
        id2: opt.id2,
        field1: 1
    })[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate timestamp
    local.assertThrow(opt.data._timeCreated <= opt.data._timeUpdated, opt.data);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudRemoveManyByQuery's soft-delete handling-behavior
    opt.data = opt.dbTable.crudRemoveManyByQuery({
        _id: opt._id
    })[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 1);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, 1);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudSetManyById's re-insert handling-behavior
    opt.data = opt.dbTable.crudSetManyById([
        {
            id2: opt.id2
        }
    ])[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 2);
    // validate timestamp
    local.assertJsonEqual(opt.data._timeCreated, opt.data._timeUpdated);
    // validate data
    local.assertJsonNotEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    // test crudRemoveManyByQuery's soft-delete handling-behavior
    opt._id = opt.data._id;
    opt.data = opt.dbTable.crudRemoveManyByQuery({
        _id: opt._id
    })[0];
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountManyByQuery(), 1);
    // validate data
    local.assertJsonEqual(opt.data._id, opt._id);
    local.assertJsonEqual(opt.data.id2, opt.id2);
    local.assertJsonEqual(opt.data.field1, undefined);
    local.assertJsonEqual(opt.data.field2, undefined);
    local.assertJsonEqual(opt.data.field3, undefined);
    onError();
};

local.testCase_dbTable_persistence = function (opt, onError) {
/*
 * this function will test dbTable's persistence handling-behavior
 */
    opt = {};
    // remove all dbRow's from db
    local.dbCrudRemoveAll();
    // drop db
    local.dbDrop();
    // save db
    local.dbSave();
    // load db
    local.dbLoad();
    // import db
    local.dbImport(
        "testCase_dbTable_persistence idIndexCreate {\"name\":\"_id\"}\n"
        + "testCase_dbTable_persistence idIndexCreate {\"name\":\"id2\"}\n"
        + "testCase_dbTable_persistence sizeLimit 0\n"
        + "testCase_dbTable_persistence sortDefault []\n"
        + "testCase_dbTable_persistence dbRowSet {\"_id\":\"id1\"}\n"
        + "undefined undefined undefined"
    );
    opt.dbTable = local.dbTableCreateOne({
        name: "testCase_dbTable_persistence"
    });
    opt.data = local.dbExport();
    // validate dbTable has idIndex._id
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"_id\"}"
    ) >= 0, opt.data);
    // validate dbTable has idIndex.id2
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"id2\"}"
    ) >= 0, opt.data);
    // validate dbTable has dbRow1
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence dbRowSet {\"_id\":\"id1\","
    ) >= 0, opt.data);
    // remove all dbRow's from dbTable
    opt.dbTable.crudRemoveAll();
    opt.data = opt.dbTable.export();
    // validate dbTable has idIndex._id
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"_id\"}"
    ) >= 0, opt.data);
    // validate dbTable has idIndex.id2
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"id2\"}"
    ) >= 0, opt.data);
    // validate dbTable has no dbRow1
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence dbRowSet {\"_id\":\"id1\","
    ) < 0, opt.data);
    // drop dbTable
    opt.dbTable.drop();
    opt.data = opt.dbTable.export();
    // validate dbTable has idIndex._id
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"_id\"}"
    ) >= 0, opt.data);
    // validate dbTable has no idIndex.id2
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence idIndexCreate"
        + " {\"isInteger\":false,\"name\":\"id2\"}"
    ) < 0, opt.data);
    // validate dbTable has no dbRow1
    local.assertThrow(opt.data.indexOf(
        "testCase_dbTable_persistence dbRowSet {\"_id\":\"id1\","
    ) < 0, opt.data);
    // save db
    opt.dbTable.save(function (err) {
        // validate no err occurred
        local.assertThrow(!err, err);
        // load db
        local.dbLoad(onError);
    });
};

local.testCase_dbTable_sizeLimit = function (opt, onError) {
/*
 * this function will test dbTable's sizeLimit handling-behavior
 */
    opt = {};
    opt.dbTable = local.dbTableCreateOne({
        name: "testCase_dbTable_sizeLimit",
        sizeLimit: 2
    });
    opt.dbTable.crudSetOneById({});
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 1);
    opt.dbTable.crudSetOneById({});
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    opt.dbTable.crudSetOneById({});
    // validate dbRowCount
    local.assertJsonEqual(opt.dbTable.crudCountAll(), 2);
    onError();
};

local.testCase_onEventDomDb_default = function (opt, onError) {
/*
 * this function will test onEventDomDb's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    opt = {};
    opt.addEventListener = local.nop;
    opt.click = local.nop;
    opt.files = [];
    local.testMock([
        [
            document, {
                querySelector: function () {
                    return opt;
                }
            }
        ], [
            local, {
                dbDrop: function (onError) {
                    onError();
                },
                dbExport: local.nop,
                dbImport: local.nop
            }
        ], [
            globalThis, {
                FileReader: function () {
                    this.addEventListener = function (_, fnc) {
                        fnc(_);
                    };
                    this.readAsText = local.nop;
                },
                setTimeout: function (fnc) {
                    fnc();
                },
                utility2: null,
                utility2_dbSeedList: null,
                utility2_onReadyAfter: null,
                utility2_onReadyBefore: null
            }
        ]
    ], function (onError) {
        [
            "dbExportButton1",
            "dbImportButton1",
            "dbImportInput1",
            "dbResetButton1"
        ].forEach(function (id) {
            [
                "change", "click"
            ].forEach(function (type) {
                [
                    0, 1
                ].forEach(function (ii) {
                    opt.files[0] = ii;
                    local.onEventDomDb({
                        target: {
                            dataset: {},
                            id
                        },
                        type
                    });
                    globalThis.utility2_dbSeedList = ii && [
                        {
                            name: "dbTable1"
                        }
                    ];
                });
            });
        });
        onError();
    }, onError);
};

local.testCase_sortCompare_default = function (opt, onError) {
/*
 * this function will test sortCompare's default handling-behavior
 */
    opt = {};
    opt.data = ([
        undefined,
        [],
        "",
        -1, -Infinity, 0, 0, 1, Infinity,
        {},
        "a", "aa",
        false, false, null, null, true, true
    ]).sort();
    opt.data = opt.data.sort(local.sortCompare);
    local.assertJsonEqual(opt.data.slice(0, -3), [
        null, null,
        false, false, true, true,
        -Infinity, -1, 0, 0, 1, Infinity,
        "", "a", "aa"
    ]);
    opt.data = opt.data.reverse().sort(local.sortCompare);
    local.assertJsonEqual(opt.data.slice(0, -3), [
        null, null,
        false, false, true, true,
        -Infinity, -1, 0, 0, 1, Infinity,
        "", "a", "aa"
    ]);
    // hack-istanbul
    opt.data.forEach(function (aa) {
        [{}, null, Symbol()].forEach(function (bb) {
            local.sortCompare(aa, bb);
            local.sortCompare(bb, aa);
        });
    });
    onError();
};

local.testCase_storageXxx_misc = function (opt, onError) {
/*
 * this function will test storageXxx's misc handling-behavior
 */
    var onParallel;
    // hack-jslint
    local.nop(opt);
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    // test storageInit's init handling-behavior
    local.storageInit();
    // test storageInit's re-init handling-behavior
    local.storageInit();
    // test crud handling-behavior
    onParallel.counter += 1;
    local.storageClear(onParallel);
    onParallel.counter += 1;
    local.storageGetItem("undefined", onParallel);
    onParallel.counter += 1;
    local.storageKeys(onParallel);
    onParallel.counter += 1;
    local.storageLength(onParallel);
    onParallel.counter += 1;
    local.storageRemoveItem("undefined", onParallel);
    onParallel.counter += 1;
    local.storageSetItem("undefined", "undefined", onParallel);
    //!! onParallel.counter += 1;
    //!! local.storageKeys(function () {
        //!! if (local.isBrowser) {
            //!! // test indexedDB's onupgradeneeded handling-behavior
            //!! local._debugStorageRequestIndexedDB.onupgradeneeded();
        //!! }
        //!! onParallel();
    //!! });
    onParallel();
};
}());
}());
