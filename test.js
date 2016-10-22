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
        // init Error.stackTraceLimit
        Error.stackTraceLimit = 20;
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            local.utility2 = window.utility2;
            break;
        // re-init local from example.js
        case 'node':
            local = (module.utility2 || require('utility2')).requireExampleJsFromReadme({
                __dirname: __dirname,
                module: module
            });
            local.db = local[local.utility2.envDict.npm_package_name];
            /* istanbul ignore next */
            if (module.isRollup) {
                local = module;
                return;
            }
            break;
        }
        // require modules
        local.utility2.db = local.utility2.local.db = local.db;
    }());



    // run shared js-env code - function
    (function () {
        local.crudOptionsSetDefault = function (options, defaults) {
        /*
         * this function will set default-values for options
         */
            options = local.utility2.objectSetDefault(options, defaults);
            options.dbTable = local.db.dbTableDict.TestCrud;
            // shallow-copy options
            return local.utility2.objectSetDefault({}, options);
        };

        local.testCase_consoleLog_default = function (options, onError) {
        /*
         * this function will test consoleLog's default handling-behavior
         */
            options = {};
            options.data = null;
            console.log(options.data);
            options.data = '\n';
            console.log(options.data);
            onError();
        };

        local.testCase_dbExportImport_default = function (options, onError) {
        /*
         * this function will test dbExportImport's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbExportImport_default';
            options.dbTable = local.db.dbTableCreate(options);
            options.dbTable.dbIndexCreate({ fieldName: 'field2' });
            options.dbTable.crudInsertOrReplaceMany([
                { field1: 'aa', field2: 'bb'}
            ], local.utility2.onErrorDefault);
            // test dbExport handling-behavior
            options.data = local.db.dbExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"') >= 0, options.data);
            // test dbTableClear handling-behavior
            options.dbTable.dbTableClear();
            options.data = local.db.dbExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"') < 0, options.data);
            // test dbImport handling-behavior
            local.db.dbImport('####\n' +
                '{"name":"testCase_dbExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"}\n' +
                '####');
            options.data = options.dbTable.dbTableExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"') === 0, options.data);
            onError();
        };

        local.testCase_dbStorageXxx_misc = function (options, onError) {
        /*
         * this function will test dbStorageXxx's misc handling-behavior
         */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test dbStorageInit's re-init handling-behavior
            local.db.dbStorageInit();
            // test dbStorageKey's handling-behavior
            onParallel.counter += 1;
            local.db.dbStorageKeys(function () {
                local.utility2.tryCatchOnError(function () {
                    // test dbStorageDefer's done handling-behavior
                    local.db._debugDbStorageRequest.onerror(local.utility2.errorDefault);
                }, local.utility2.nop);
                onParallel();
            });
            onParallel.counter += 1;
            // test dbStorageLength's handling-behavior
            local.db.dbStorageLength(onParallel);
            onParallel();
        };

        local.testCase_dbTableClear_default = function (options, onError) {
        /*
         * this function will test dbTableDrop's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbTableClear_default';
            options.dbTable = local.db.dbTableCreate(options);
            options.dbTable.dbTableClear();
            // test multiple-clear handling-behavior
            options.dbTable.dbTableClear();
            onError();
        };

        local.testCase_dbTableCreate_default = function (options, onError) {
        /*
         * this function will test dbTableCreate's default handling-behavior
         */
            options = {};
            options.name = 'testCase_dbTableCreate_default';
            options.dbTable = local.db.dbTableCreate(options);
            // test re-create handling-behavior
            options.dbTable = local.db.dbTableCreate(options);
            options.dbTable = local.db.dbTableCreate(options);
            onError();
        };

        local.testCase_dbTableCrudCountMany_default = function (options, onError) {
        /*
         * this function will test dbTableCountMany's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: 'testCase_dbTableCrudCountMany_default'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.dbTable.crudCountMany({
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.utility2.assertJsonEqual(data, 1);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_dbTableCrudFindOne_default = function (options, onError) {
        /*
         * this function will test dbTableFindOne's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: 'testCase_dbTableCrudFindOne_default'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.dbTable.crudFindOne({
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.utility2.assertJsonEqual(data && data.id, options.id);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_dbTableCrudRemoveOne_default = function (options, onError) {
        /*
         * this function will test dbTableRemoveOne's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                id: 'testCase_dbTableCrudRemoveOne_default'
            });
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.testCase_dbTableCrudFindOne_default(options, options.onNext);
                    break;
                case 2:
                    options.dbTable.crudRemoveOne({
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 3:
                    options.dbTable.crudFindOne({
                        query: { id: options.id }
                    }, options.onNext);
                    break;
                case 4:
                    // validate data was removed
                    local.utility2.assertJsonEqual(data, null);
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_dbTableExportImport_default = function (options, onError) {
        /*
         * this function will test dbTableExportImport's default handling-behavior
         */
            options = {};
            options.dbTable = local.db.dbTableCreate({
                name: 'testCase_dbTableExportImport_default'
            });
            options.dbTable.crudInsertOrReplaceMany([
                { field1: 'aa', field2: 'bb'}
            ], local.utility2.onErrorDefault);
            options.dbTable.dbIndexCreate({ fieldName: 'field2' });
            // test dbTableExport handling-behavior
            options.data = options.dbTable.dbTableExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbTableExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"') === 0, options.data);
            // test dbTableClear handling-behavior
            options.dbTable.dbTableClear();
            options.data = options.dbTable.dbTableExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbTableExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '####') === 0, options.data);
            // test dbTableImport handling-behavior
            options.dbTable.dbTableImport('####\n' +
                '{"name":"testCase_dbTableExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"}\n' +
                '####');
            options.data = options.dbTable.dbTableExport();
            // validate data
            local.utility2.assert(options.data.indexOf('####\n' +
                '{"name":"testCase_dbTableExportImport_default"}\n' +
                '#\n' +
                '{"fieldName":"field2"}\n' +
                '#\n' +
                '{"field1":"aa","field2":"bb"') === 0, options.data);
            onError();
        };

        local.testCase_dbTree_default = function (options, onError) {
        /*
         * this function will test dbTree's default handling-behavior
         */
            options = {};
            options.dbTree = new local.db._DbTree({});
            // test null-case delete handling-behavior
            local.utility2.assert(
                options.dbTree.delete(null, {}) === options.dbTree
            );
            // test null-case search handling-behavior
            local.utility2.assertJsonEqual(
                options.dbTree.search(null),
                []
            );
            // test insert-null-item handling-behavior
            options.dbTree = options.dbTree.insert(null, { key: null });
            // test insert-undefined-item handling-behavior
            options.dbTree = options.dbTree.insert(undefined, { key: undefined });
            // test insert handling-behavior
            for (options.ii = 0; options.ii < 0x100; options.ii += 1) {
                options.dbRow = { key: Math.random() };
                options.dbTree = options.dbTree.insert(options.dbRow.key, options.dbRow);
                // test print handling-behavior
                if (options.ii === 0x8) {
                    options.dbTree.print();
                }
                options.dbTree.validate();
            }
            // validate null-item
            options.data = options.dbTree.list();
            local.utility2.assertJsonEqual(options.data[options.data.length - 2], {
                key: null
            });
            // validate undefined-item
            local.utility2.assertJsonEqual(options.data[options.data.length - 1], {});
            options.length = options.dbTree.length();
            local.utility2.listShuffle(options.data).forEach(function (dbRow) {
                // test search handling-behavior
                local.utility2.assert(options.dbTree.search(dbRow.key).length >= 1, dbRow);
                // test delete handling-behavior
                options.dbTree = options.dbTree.delete(dbRow.key, dbRow);
                // test re-delete handling-behavior
                local.utility2.assert(
                    options.dbTree.delete(dbRow.key || 'undefined', dbRow) === options.dbTree
                );
                options.length -= 1;
                local.utility2.assertJsonEqual(options.dbTree.length(), options.length);
                options.dbTree.validate();
            });
            onError();
        };

        local.testCase_operatorTest_default = function (options, onError) {
        /*
         * this function will test operatorTest's default handling-behavior
         */
            options = {};
            options.argList = [
                '',
                [null],
                [],
                -0.5,
                -1,
                -Infinity,
                0,
                0.5,
                1,
                Infinity,
                NaN,
                NaN,
                {},
                'a',
                false,
                null,
                [true],
                true,
                undefined
            ].sort();
            options.ii = -1;
            options.result = [];
            options.testList = [
                "$elemMatch -Infinity [null] true",
                "$elemMatch Infinity [null] true",
                "$elemMatch NaN [null] true",
                "$elemMatch NaN [null] true",
                "$elemMatch null [null] true",
                "$elemMatch true [true] true",
                "$elemMatch undefined [null] true",
                "$eq \"\" \"\" true",
                "$eq [] [] true",
                "$eq [] [null] true",
                "$eq [] {} true",
                "$eq [] [true] true",
                "$eq [null] [] true",
                "$eq [null] [null] true",
                "$eq [null] {} true",
                "$eq [null] [true] true",
                "$eq -0.5 -0.5 true",
                "$eq -1 -1 true",
                "$eq -Infinity -Infinity true",
                "$eq -Infinity Infinity true",
                "$eq -Infinity NaN true",
                "$eq -Infinity NaN true",
                "$eq -Infinity null true",
                "$eq -Infinity undefined true",
                "$eq 0 0 true",
                "$eq 0.5 0.5 true",
                "$eq 1 1 true",
                "$eq Infinity -Infinity true",
                "$eq Infinity Infinity true",
                "$eq Infinity NaN true",
                "$eq Infinity NaN true",
                "$eq Infinity null true",
                "$eq Infinity undefined true",
                "$eq NaN -Infinity true",
                "$eq NaN Infinity true",
                "$eq NaN NaN true",
                "$eq NaN NaN true",
                "$eq NaN null true",
                "$eq NaN undefined true",
                "$eq NaN -Infinity true",
                "$eq NaN Infinity true",
                "$eq NaN NaN true",
                "$eq NaN NaN true",
                "$eq NaN null true",
                "$eq NaN undefined true",
                "$eq {} [] true",
                "$eq {} [null] true",
                "$eq {} {} true",
                "$eq {} [true] true",
                "$eq \"a\" \"a\" true",
                "$eq false false true",
                "$eq null -Infinity true",
                "$eq null Infinity true",
                "$eq null NaN true",
                "$eq null NaN true",
                "$eq null null true",
                "$eq null undefined true",
                "$eq [true] [] true",
                "$eq [true] [null] true",
                "$eq [true] {} true",
                "$eq [true] [true] true",
                "$eq true true true",
                "$eq undefined -Infinity true",
                "$eq undefined Infinity true",
                "$eq undefined NaN true",
                "$eq undefined NaN true",
                "$eq undefined null true",
                "$eq undefined undefined true",
                "$exists \"\" -Infinity true",
                "$exists \"\" Infinity true",
                "$exists \"\" NaN true",
                "$exists \"\" NaN true",
                "$exists \"\" null true",
                "$exists \"\" undefined true",
                "$exists [] \"\" true",
                "$exists [] [] true",
                "$exists [] [null] true",
                "$exists [] -0.5 true",
                "$exists [] -1 true",
                "$exists [] 0 true",
                "$exists [] 0.5 true",
                "$exists [] 1 true",
                "$exists [] {} true",
                "$exists [] \"a\" true",
                "$exists [] false true",
                "$exists [] [true] true",
                "$exists [] true true",
                "$exists [null] \"\" true",
                "$exists [null] [] true",
                "$exists [null] [null] true",
                "$exists [null] -0.5 true",
                "$exists [null] -1 true",
                "$exists [null] 0 true",
                "$exists [null] 0.5 true",
                "$exists [null] 1 true",
                "$exists [null] {} true",
                "$exists [null] \"a\" true",
                "$exists [null] false true",
                "$exists [null] [true] true",
                "$exists [null] true true",
                "$exists -0.5 \"\" true",
                "$exists -0.5 [] true",
                "$exists -0.5 [null] true",
                "$exists -0.5 -0.5 true",
                "$exists -0.5 -1 true",
                "$exists -0.5 0 true",
                "$exists -0.5 0.5 true",
                "$exists -0.5 1 true",
                "$exists -0.5 {} true",
                "$exists -0.5 \"a\" true",
                "$exists -0.5 false true",
                "$exists -0.5 [true] true",
                "$exists -0.5 true true",
                "$exists -1 \"\" true",
                "$exists -1 [] true",
                "$exists -1 [null] true",
                "$exists -1 -0.5 true",
                "$exists -1 -1 true",
                "$exists -1 0 true",
                "$exists -1 0.5 true",
                "$exists -1 1 true",
                "$exists -1 {} true",
                "$exists -1 \"a\" true",
                "$exists -1 false true",
                "$exists -1 [true] true",
                "$exists -1 true true",
                "$exists -Infinity -Infinity true",
                "$exists -Infinity Infinity true",
                "$exists -Infinity NaN true",
                "$exists -Infinity NaN true",
                "$exists -Infinity null true",
                "$exists -Infinity undefined true",
                "$exists 0 -Infinity true",
                "$exists 0 Infinity true",
                "$exists 0 NaN true",
                "$exists 0 NaN true",
                "$exists 0 null true",
                "$exists 0 undefined true",
                "$exists 0.5 \"\" true",
                "$exists 0.5 [] true",
                "$exists 0.5 [null] true",
                "$exists 0.5 -0.5 true",
                "$exists 0.5 -1 true",
                "$exists 0.5 0 true",
                "$exists 0.5 0.5 true",
                "$exists 0.5 1 true",
                "$exists 0.5 {} true",
                "$exists 0.5 \"a\" true",
                "$exists 0.5 false true",
                "$exists 0.5 [true] true",
                "$exists 0.5 true true",
                "$exists 1 \"\" true",
                "$exists 1 [] true",
                "$exists 1 [null] true",
                "$exists 1 -0.5 true",
                "$exists 1 -1 true",
                "$exists 1 0 true",
                "$exists 1 0.5 true",
                "$exists 1 1 true",
                "$exists 1 {} true",
                "$exists 1 \"a\" true",
                "$exists 1 false true",
                "$exists 1 [true] true",
                "$exists 1 true true",
                "$exists Infinity -Infinity true",
                "$exists Infinity Infinity true",
                "$exists Infinity NaN true",
                "$exists Infinity NaN true",
                "$exists Infinity null true",
                "$exists Infinity undefined true",
                "$exists NaN -Infinity true",
                "$exists NaN Infinity true",
                "$exists NaN NaN true",
                "$exists NaN NaN true",
                "$exists NaN null true",
                "$exists NaN undefined true",
                "$exists NaN -Infinity true",
                "$exists NaN Infinity true",
                "$exists NaN NaN true",
                "$exists NaN NaN true",
                "$exists NaN null true",
                "$exists NaN undefined true",
                "$exists {} \"\" true",
                "$exists {} [] true",
                "$exists {} [null] true",
                "$exists {} -0.5 true",
                "$exists {} -1 true",
                "$exists {} 0 true",
                "$exists {} 0.5 true",
                "$exists {} 1 true",
                "$exists {} {} true",
                "$exists {} \"a\" true",
                "$exists {} false true",
                "$exists {} [true] true",
                "$exists {} true true",
                "$exists \"a\" \"\" true",
                "$exists \"a\" [] true",
                "$exists \"a\" [null] true",
                "$exists \"a\" -0.5 true",
                "$exists \"a\" -1 true",
                "$exists \"a\" 0 true",
                "$exists \"a\" 0.5 true",
                "$exists \"a\" 1 true",
                "$exists \"a\" {} true",
                "$exists \"a\" \"a\" true",
                "$exists \"a\" false true",
                "$exists \"a\" [true] true",
                "$exists \"a\" true true",
                "$exists false -Infinity true",
                "$exists false Infinity true",
                "$exists false NaN true",
                "$exists false NaN true",
                "$exists false null true",
                "$exists false undefined true",
                "$exists null -Infinity true",
                "$exists null Infinity true",
                "$exists null NaN true",
                "$exists null NaN true",
                "$exists null null true",
                "$exists null undefined true",
                "$exists [true] \"\" true",
                "$exists [true] [] true",
                "$exists [true] [null] true",
                "$exists [true] -0.5 true",
                "$exists [true] -1 true",
                "$exists [true] 0 true",
                "$exists [true] 0.5 true",
                "$exists [true] 1 true",
                "$exists [true] {} true",
                "$exists [true] \"a\" true",
                "$exists [true] false true",
                "$exists [true] [true] true",
                "$exists [true] true true",
                "$exists true \"\" true",
                "$exists true [] true",
                "$exists true [null] true",
                "$exists true -0.5 true",
                "$exists true -1 true",
                "$exists true 0 true",
                "$exists true 0.5 true",
                "$exists true 1 true",
                "$exists true {} true",
                "$exists true \"a\" true",
                "$exists true false true",
                "$exists true [true] true",
                "$exists true true true",
                "$exists undefined -Infinity true",
                "$exists undefined Infinity true",
                "$exists undefined NaN true",
                "$exists undefined NaN true",
                "$exists undefined null true",
                "$exists undefined undefined true",
                "$gt \"\" -0.5 true",
                "$gt \"\" -1 true",
                "$gt \"\" 0 true",
                "$gt \"\" 0.5 true",
                "$gt \"\" 1 true",
                "$gt \"\" false true",
                "$gt \"\" true true",
                "$gt [] \"\" true",
                "$gt [] -0.5 true",
                "$gt [] -1 true",
                "$gt [] 0 true",
                "$gt [] 0.5 true",
                "$gt [] 1 true",
                "$gt [] \"a\" true",
                "$gt [] false true",
                "$gt [] true true",
                "$gt [null] \"\" true",
                "$gt [null] -0.5 true",
                "$gt [null] -1 true",
                "$gt [null] 0 true",
                "$gt [null] 0.5 true",
                "$gt [null] 1 true",
                "$gt [null] \"a\" true",
                "$gt [null] false true",
                "$gt [null] true true",
                "$gt -0.5 -1 true",
                "$gt -0.5 false true",
                "$gt -0.5 true true",
                "$gt -1 false true",
                "$gt -1 true true",
                "$gt -Infinity \"\" true",
                "$gt -Infinity [] true",
                "$gt -Infinity [null] true",
                "$gt -Infinity -0.5 true",
                "$gt -Infinity -1 true",
                "$gt -Infinity 0 true",
                "$gt -Infinity 0.5 true",
                "$gt -Infinity 1 true",
                "$gt -Infinity {} true",
                "$gt -Infinity \"a\" true",
                "$gt -Infinity false true",
                "$gt -Infinity [true] true",
                "$gt -Infinity true true",
                "$gt 0 -0.5 true",
                "$gt 0 -1 true",
                "$gt 0 false true",
                "$gt 0 true true",
                "$gt 0.5 -0.5 true",
                "$gt 0.5 -1 true",
                "$gt 0.5 0 true",
                "$gt 0.5 false true",
                "$gt 0.5 true true",
                "$gt 1 -0.5 true",
                "$gt 1 -1 true",
                "$gt 1 0 true",
                "$gt 1 0.5 true",
                "$gt 1 false true",
                "$gt 1 true true",
                "$gt Infinity \"\" true",
                "$gt Infinity [] true",
                "$gt Infinity [null] true",
                "$gt Infinity -0.5 true",
                "$gt Infinity -1 true",
                "$gt Infinity 0 true",
                "$gt Infinity 0.5 true",
                "$gt Infinity 1 true",
                "$gt Infinity {} true",
                "$gt Infinity \"a\" true",
                "$gt Infinity false true",
                "$gt Infinity [true] true",
                "$gt Infinity true true",
                "$gt NaN \"\" true",
                "$gt NaN [] true",
                "$gt NaN [null] true",
                "$gt NaN -0.5 true",
                "$gt NaN -1 true",
                "$gt NaN 0 true",
                "$gt NaN 0.5 true",
                "$gt NaN 1 true",
                "$gt NaN {} true",
                "$gt NaN \"a\" true",
                "$gt NaN false true",
                "$gt NaN [true] true",
                "$gt NaN true true",
                "$gt NaN \"\" true",
                "$gt NaN [] true",
                "$gt NaN [null] true",
                "$gt NaN -0.5 true",
                "$gt NaN -1 true",
                "$gt NaN 0 true",
                "$gt NaN 0.5 true",
                "$gt NaN 1 true",
                "$gt NaN {} true",
                "$gt NaN \"a\" true",
                "$gt NaN false true",
                "$gt NaN [true] true",
                "$gt NaN true true",
                "$gt {} \"\" true",
                "$gt {} -0.5 true",
                "$gt {} -1 true",
                "$gt {} 0 true",
                "$gt {} 0.5 true",
                "$gt {} 1 true",
                "$gt {} \"a\" true",
                "$gt {} false true",
                "$gt {} true true",
                "$gt \"a\" \"\" true",
                "$gt \"a\" -0.5 true",
                "$gt \"a\" -1 true",
                "$gt \"a\" 0 true",
                "$gt \"a\" 0.5 true",
                "$gt \"a\" 1 true",
                "$gt \"a\" false true",
                "$gt \"a\" true true",
                "$gt null \"\" true",
                "$gt null [] true",
                "$gt null [null] true",
                "$gt null -0.5 true",
                "$gt null -1 true",
                "$gt null 0 true",
                "$gt null 0.5 true",
                "$gt null 1 true",
                "$gt null {} true",
                "$gt null \"a\" true",
                "$gt null false true",
                "$gt null [true] true",
                "$gt null true true",
                "$gt [true] \"\" true",
                "$gt [true] -0.5 true",
                "$gt [true] -1 true",
                "$gt [true] 0 true",
                "$gt [true] 0.5 true",
                "$gt [true] 1 true",
                "$gt [true] \"a\" true",
                "$gt [true] false true",
                "$gt [true] true true",
                "$gt true false true",
                "$gt undefined \"\" true",
                "$gt undefined [] true",
                "$gt undefined [null] true",
                "$gt undefined -0.5 true",
                "$gt undefined -1 true",
                "$gt undefined 0 true",
                "$gt undefined 0.5 true",
                "$gt undefined 1 true",
                "$gt undefined {} true",
                "$gt undefined \"a\" true",
                "$gt undefined false true",
                "$gt undefined [true] true",
                "$gt undefined true true",
                "$gte \"\" \"\" true",
                "$gte \"\" -0.5 true",
                "$gte \"\" -1 true",
                "$gte \"\" 0 true",
                "$gte \"\" 0.5 true",
                "$gte \"\" 1 true",
                "$gte \"\" false true",
                "$gte \"\" true true",
                "$gte [] \"\" true",
                "$gte [] [] true",
                "$gte [] [null] true",
                "$gte [] -0.5 true",
                "$gte [] -1 true",
                "$gte [] 0 true",
                "$gte [] 0.5 true",
                "$gte [] 1 true",
                "$gte [] {} true",
                "$gte [] \"a\" true",
                "$gte [] false true",
                "$gte [] [true] true",
                "$gte [] true true",
                "$gte [null] \"\" true",
                "$gte [null] [] true",
                "$gte [null] [null] true",
                "$gte [null] -0.5 true",
                "$gte [null] -1 true",
                "$gte [null] 0 true",
                "$gte [null] 0.5 true",
                "$gte [null] 1 true",
                "$gte [null] {} true",
                "$gte [null] \"a\" true",
                "$gte [null] false true",
                "$gte [null] [true] true",
                "$gte [null] true true",
                "$gte -0.5 -0.5 true",
                "$gte -0.5 -1 true",
                "$gte -0.5 false true",
                "$gte -0.5 true true",
                "$gte -1 -1 true",
                "$gte -1 false true",
                "$gte -1 true true",
                "$gte -Infinity \"\" true",
                "$gte -Infinity [] true",
                "$gte -Infinity [null] true",
                "$gte -Infinity -0.5 true",
                "$gte -Infinity -1 true",
                "$gte -Infinity -Infinity true",
                "$gte -Infinity 0 true",
                "$gte -Infinity 0.5 true",
                "$gte -Infinity 1 true",
                "$gte -Infinity Infinity true",
                "$gte -Infinity NaN true",
                "$gte -Infinity NaN true",
                "$gte -Infinity {} true",
                "$gte -Infinity \"a\" true",
                "$gte -Infinity false true",
                "$gte -Infinity null true",
                "$gte -Infinity [true] true",
                "$gte -Infinity true true",
                "$gte -Infinity undefined true",
                "$gte 0 -0.5 true",
                "$gte 0 -1 true",
                "$gte 0 0 true",
                "$gte 0 false true",
                "$gte 0 true true",
                "$gte 0.5 -0.5 true",
                "$gte 0.5 -1 true",
                "$gte 0.5 0 true",
                "$gte 0.5 0.5 true",
                "$gte 0.5 false true",
                "$gte 0.5 true true",
                "$gte 1 -0.5 true",
                "$gte 1 -1 true",
                "$gte 1 0 true",
                "$gte 1 0.5 true",
                "$gte 1 1 true",
                "$gte 1 false true",
                "$gte 1 true true",
                "$gte Infinity \"\" true",
                "$gte Infinity [] true",
                "$gte Infinity [null] true",
                "$gte Infinity -0.5 true",
                "$gte Infinity -1 true",
                "$gte Infinity -Infinity true",
                "$gte Infinity 0 true",
                "$gte Infinity 0.5 true",
                "$gte Infinity 1 true",
                "$gte Infinity Infinity true",
                "$gte Infinity NaN true",
                "$gte Infinity NaN true",
                "$gte Infinity {} true",
                "$gte Infinity \"a\" true",
                "$gte Infinity false true",
                "$gte Infinity null true",
                "$gte Infinity [true] true",
                "$gte Infinity true true",
                "$gte Infinity undefined true",
                "$gte NaN \"\" true",
                "$gte NaN [] true",
                "$gte NaN [null] true",
                "$gte NaN -0.5 true",
                "$gte NaN -1 true",
                "$gte NaN -Infinity true",
                "$gte NaN 0 true",
                "$gte NaN 0.5 true",
                "$gte NaN 1 true",
                "$gte NaN Infinity true",
                "$gte NaN NaN true",
                "$gte NaN NaN true",
                "$gte NaN {} true",
                "$gte NaN \"a\" true",
                "$gte NaN false true",
                "$gte NaN null true",
                "$gte NaN [true] true",
                "$gte NaN true true",
                "$gte NaN undefined true",
                "$gte NaN \"\" true",
                "$gte NaN [] true",
                "$gte NaN [null] true",
                "$gte NaN -0.5 true",
                "$gte NaN -1 true",
                "$gte NaN -Infinity true",
                "$gte NaN 0 true",
                "$gte NaN 0.5 true",
                "$gte NaN 1 true",
                "$gte NaN Infinity true",
                "$gte NaN NaN true",
                "$gte NaN NaN true",
                "$gte NaN {} true",
                "$gte NaN \"a\" true",
                "$gte NaN false true",
                "$gte NaN null true",
                "$gte NaN [true] true",
                "$gte NaN true true",
                "$gte NaN undefined true",
                "$gte {} \"\" true",
                "$gte {} [] true",
                "$gte {} [null] true",
                "$gte {} -0.5 true",
                "$gte {} -1 true",
                "$gte {} 0 true",
                "$gte {} 0.5 true",
                "$gte {} 1 true",
                "$gte {} {} true",
                "$gte {} \"a\" true",
                "$gte {} false true",
                "$gte {} [true] true",
                "$gte {} true true",
                "$gte \"a\" \"\" true",
                "$gte \"a\" -0.5 true",
                "$gte \"a\" -1 true",
                "$gte \"a\" 0 true",
                "$gte \"a\" 0.5 true",
                "$gte \"a\" 1 true",
                "$gte \"a\" \"a\" true",
                "$gte \"a\" false true",
                "$gte \"a\" true true",
                "$gte false false true",
                "$gte null \"\" true",
                "$gte null [] true",
                "$gte null [null] true",
                "$gte null -0.5 true",
                "$gte null -1 true",
                "$gte null -Infinity true",
                "$gte null 0 true",
                "$gte null 0.5 true",
                "$gte null 1 true",
                "$gte null Infinity true",
                "$gte null NaN true",
                "$gte null NaN true",
                "$gte null {} true",
                "$gte null \"a\" true",
                "$gte null false true",
                "$gte null null true",
                "$gte null [true] true",
                "$gte null true true",
                "$gte null undefined true",
                "$gte [true] \"\" true",
                "$gte [true] [] true",
                "$gte [true] [null] true",
                "$gte [true] -0.5 true",
                "$gte [true] -1 true",
                "$gte [true] 0 true",
                "$gte [true] 0.5 true",
                "$gte [true] 1 true",
                "$gte [true] {} true",
                "$gte [true] \"a\" true",
                "$gte [true] false true",
                "$gte [true] [true] true",
                "$gte [true] true true",
                "$gte true false true",
                "$gte true true true",
                "$gte undefined \"\" true",
                "$gte undefined [] true",
                "$gte undefined [null] true",
                "$gte undefined -0.5 true",
                "$gte undefined -1 true",
                "$gte undefined -Infinity true",
                "$gte undefined 0 true",
                "$gte undefined 0.5 true",
                "$gte undefined 1 true",
                "$gte undefined Infinity true",
                "$gte undefined NaN true",
                "$gte undefined NaN true",
                "$gte undefined {} true",
                "$gte undefined \"a\" true",
                "$gte undefined false true",
                "$gte undefined null true",
                "$gte undefined [true] true",
                "$gte undefined true true",
                "$gte undefined undefined true",
                "$in [null] -Infinity true",
                "$in [null] Infinity true",
                "$in [null] NaN true",
                "$in [null] NaN true",
                "$in [null] null true",
                "$in [null] undefined true",
                "$in [true] true true",
                "$lt \"\" [] true",
                "$lt \"\" [null] true",
                "$lt \"\" -Infinity true",
                "$lt \"\" Infinity true",
                "$lt \"\" NaN true",
                "$lt \"\" NaN true",
                "$lt \"\" {} true",
                "$lt \"\" \"a\" true",
                "$lt \"\" null true",
                "$lt \"\" [true] true",
                "$lt \"\" undefined true",
                "$lt [] -Infinity true",
                "$lt [] Infinity true",
                "$lt [] NaN true",
                "$lt [] NaN true",
                "$lt [] null true",
                "$lt [] undefined true",
                "$lt [null] -Infinity true",
                "$lt [null] Infinity true",
                "$lt [null] NaN true",
                "$lt [null] NaN true",
                "$lt [null] null true",
                "$lt [null] undefined true",
                "$lt -0.5 \"\" true",
                "$lt -0.5 [] true",
                "$lt -0.5 [null] true",
                "$lt -0.5 -Infinity true",
                "$lt -0.5 0 true",
                "$lt -0.5 0.5 true",
                "$lt -0.5 1 true",
                "$lt -0.5 Infinity true",
                "$lt -0.5 NaN true",
                "$lt -0.5 NaN true",
                "$lt -0.5 {} true",
                "$lt -0.5 \"a\" true",
                "$lt -0.5 null true",
                "$lt -0.5 [true] true",
                "$lt -0.5 undefined true",
                "$lt -1 \"\" true",
                "$lt -1 [] true",
                "$lt -1 [null] true",
                "$lt -1 -0.5 true",
                "$lt -1 -Infinity true",
                "$lt -1 0 true",
                "$lt -1 0.5 true",
                "$lt -1 1 true",
                "$lt -1 Infinity true",
                "$lt -1 NaN true",
                "$lt -1 NaN true",
                "$lt -1 {} true",
                "$lt -1 \"a\" true",
                "$lt -1 null true",
                "$lt -1 [true] true",
                "$lt -1 undefined true",
                "$lt 0 \"\" true",
                "$lt 0 [] true",
                "$lt 0 [null] true",
                "$lt 0 -Infinity true",
                "$lt 0 0.5 true",
                "$lt 0 1 true",
                "$lt 0 Infinity true",
                "$lt 0 NaN true",
                "$lt 0 NaN true",
                "$lt 0 {} true",
                "$lt 0 \"a\" true",
                "$lt 0 null true",
                "$lt 0 [true] true",
                "$lt 0 undefined true",
                "$lt 0.5 \"\" true",
                "$lt 0.5 [] true",
                "$lt 0.5 [null] true",
                "$lt 0.5 -Infinity true",
                "$lt 0.5 1 true",
                "$lt 0.5 Infinity true",
                "$lt 0.5 NaN true",
                "$lt 0.5 NaN true",
                "$lt 0.5 {} true",
                "$lt 0.5 \"a\" true",
                "$lt 0.5 null true",
                "$lt 0.5 [true] true",
                "$lt 0.5 undefined true",
                "$lt 1 \"\" true",
                "$lt 1 [] true",
                "$lt 1 [null] true",
                "$lt 1 -Infinity true",
                "$lt 1 Infinity true",
                "$lt 1 NaN true",
                "$lt 1 NaN true",
                "$lt 1 {} true",
                "$lt 1 \"a\" true",
                "$lt 1 null true",
                "$lt 1 [true] true",
                "$lt 1 undefined true",
                "$lt {} -Infinity true",
                "$lt {} Infinity true",
                "$lt {} NaN true",
                "$lt {} NaN true",
                "$lt {} null true",
                "$lt {} undefined true",
                "$lt \"a\" [] true",
                "$lt \"a\" [null] true",
                "$lt \"a\" -Infinity true",
                "$lt \"a\" Infinity true",
                "$lt \"a\" NaN true",
                "$lt \"a\" NaN true",
                "$lt \"a\" {} true",
                "$lt \"a\" null true",
                "$lt \"a\" [true] true",
                "$lt \"a\" undefined true",
                "$lt false \"\" true",
                "$lt false [] true",
                "$lt false [null] true",
                "$lt false -0.5 true",
                "$lt false -1 true",
                "$lt false -Infinity true",
                "$lt false 0 true",
                "$lt false 0.5 true",
                "$lt false 1 true",
                "$lt false Infinity true",
                "$lt false NaN true",
                "$lt false NaN true",
                "$lt false {} true",
                "$lt false \"a\" true",
                "$lt false null true",
                "$lt false [true] true",
                "$lt false true true",
                "$lt false undefined true",
                "$lt [true] -Infinity true",
                "$lt [true] Infinity true",
                "$lt [true] NaN true",
                "$lt [true] NaN true",
                "$lt [true] null true",
                "$lt [true] undefined true",
                "$lt true \"\" true",
                "$lt true [] true",
                "$lt true [null] true",
                "$lt true -0.5 true",
                "$lt true -1 true",
                "$lt true -Infinity true",
                "$lt true 0 true",
                "$lt true 0.5 true",
                "$lt true 1 true",
                "$lt true Infinity true",
                "$lt true NaN true",
                "$lt true NaN true",
                "$lt true {} true",
                "$lt true \"a\" true",
                "$lt true null true",
                "$lt true [true] true",
                "$lt true undefined true",
                "$lte \"\" \"\" true",
                "$lte \"\" [] true",
                "$lte \"\" [null] true",
                "$lte \"\" -Infinity true",
                "$lte \"\" Infinity true",
                "$lte \"\" NaN true",
                "$lte \"\" NaN true",
                "$lte \"\" {} true",
                "$lte \"\" \"a\" true",
                "$lte \"\" null true",
                "$lte \"\" [true] true",
                "$lte \"\" undefined true",
                "$lte [] [] true",
                "$lte [] [null] true",
                "$lte [] -Infinity true",
                "$lte [] Infinity true",
                "$lte [] NaN true",
                "$lte [] NaN true",
                "$lte [] {} true",
                "$lte [] null true",
                "$lte [] [true] true",
                "$lte [] undefined true",
                "$lte [null] [] true",
                "$lte [null] [null] true",
                "$lte [null] -Infinity true",
                "$lte [null] Infinity true",
                "$lte [null] NaN true",
                "$lte [null] NaN true",
                "$lte [null] {} true",
                "$lte [null] null true",
                "$lte [null] [true] true",
                "$lte [null] undefined true",
                "$lte -0.5 \"\" true",
                "$lte -0.5 [] true",
                "$lte -0.5 [null] true",
                "$lte -0.5 -0.5 true",
                "$lte -0.5 -Infinity true",
                "$lte -0.5 0 true",
                "$lte -0.5 0.5 true",
                "$lte -0.5 1 true",
                "$lte -0.5 Infinity true",
                "$lte -0.5 NaN true",
                "$lte -0.5 NaN true",
                "$lte -0.5 {} true",
                "$lte -0.5 \"a\" true",
                "$lte -0.5 null true",
                "$lte -0.5 [true] true",
                "$lte -0.5 undefined true",
                "$lte -1 \"\" true",
                "$lte -1 [] true",
                "$lte -1 [null] true",
                "$lte -1 -0.5 true",
                "$lte -1 -1 true",
                "$lte -1 -Infinity true",
                "$lte -1 0 true",
                "$lte -1 0.5 true",
                "$lte -1 1 true",
                "$lte -1 Infinity true",
                "$lte -1 NaN true",
                "$lte -1 NaN true",
                "$lte -1 {} true",
                "$lte -1 \"a\" true",
                "$lte -1 null true",
                "$lte -1 [true] true",
                "$lte -1 undefined true",
                "$lte -Infinity -Infinity true",
                "$lte -Infinity Infinity true",
                "$lte -Infinity NaN true",
                "$lte -Infinity NaN true",
                "$lte -Infinity null true",
                "$lte -Infinity undefined true",
                "$lte 0 \"\" true",
                "$lte 0 [] true",
                "$lte 0 [null] true",
                "$lte 0 -Infinity true",
                "$lte 0 0 true",
                "$lte 0 0.5 true",
                "$lte 0 1 true",
                "$lte 0 Infinity true",
                "$lte 0 NaN true",
                "$lte 0 NaN true",
                "$lte 0 {} true",
                "$lte 0 \"a\" true",
                "$lte 0 null true",
                "$lte 0 [true] true",
                "$lte 0 undefined true",
                "$lte 0.5 \"\" true",
                "$lte 0.5 [] true",
                "$lte 0.5 [null] true",
                "$lte 0.5 -Infinity true",
                "$lte 0.5 0.5 true",
                "$lte 0.5 1 true",
                "$lte 0.5 Infinity true",
                "$lte 0.5 NaN true",
                "$lte 0.5 NaN true",
                "$lte 0.5 {} true",
                "$lte 0.5 \"a\" true",
                "$lte 0.5 null true",
                "$lte 0.5 [true] true",
                "$lte 0.5 undefined true",
                "$lte 1 \"\" true",
                "$lte 1 [] true",
                "$lte 1 [null] true",
                "$lte 1 -Infinity true",
                "$lte 1 1 true",
                "$lte 1 Infinity true",
                "$lte 1 NaN true",
                "$lte 1 NaN true",
                "$lte 1 {} true",
                "$lte 1 \"a\" true",
                "$lte 1 null true",
                "$lte 1 [true] true",
                "$lte 1 undefined true",
                "$lte Infinity -Infinity true",
                "$lte Infinity Infinity true",
                "$lte Infinity NaN true",
                "$lte Infinity NaN true",
                "$lte Infinity null true",
                "$lte Infinity undefined true",
                "$lte NaN -Infinity true",
                "$lte NaN Infinity true",
                "$lte NaN NaN true",
                "$lte NaN NaN true",
                "$lte NaN null true",
                "$lte NaN undefined true",
                "$lte NaN -Infinity true",
                "$lte NaN Infinity true",
                "$lte NaN NaN true",
                "$lte NaN NaN true",
                "$lte NaN null true",
                "$lte NaN undefined true",
                "$lte {} [] true",
                "$lte {} [null] true",
                "$lte {} -Infinity true",
                "$lte {} Infinity true",
                "$lte {} NaN true",
                "$lte {} NaN true",
                "$lte {} {} true",
                "$lte {} null true",
                "$lte {} [true] true",
                "$lte {} undefined true",
                "$lte \"a\" [] true",
                "$lte \"a\" [null] true",
                "$lte \"a\" -Infinity true",
                "$lte \"a\" Infinity true",
                "$lte \"a\" NaN true",
                "$lte \"a\" NaN true",
                "$lte \"a\" {} true",
                "$lte \"a\" \"a\" true",
                "$lte \"a\" null true",
                "$lte \"a\" [true] true",
                "$lte \"a\" undefined true",
                "$lte false \"\" true",
                "$lte false [] true",
                "$lte false [null] true",
                "$lte false -0.5 true",
                "$lte false -1 true",
                "$lte false -Infinity true",
                "$lte false 0 true",
                "$lte false 0.5 true",
                "$lte false 1 true",
                "$lte false Infinity true",
                "$lte false NaN true",
                "$lte false NaN true",
                "$lte false {} true",
                "$lte false \"a\" true",
                "$lte false false true",
                "$lte false null true",
                "$lte false [true] true",
                "$lte false true true",
                "$lte false undefined true",
                "$lte null -Infinity true",
                "$lte null Infinity true",
                "$lte null NaN true",
                "$lte null NaN true",
                "$lte null null true",
                "$lte null undefined true",
                "$lte [true] [] true",
                "$lte [true] [null] true",
                "$lte [true] -Infinity true",
                "$lte [true] Infinity true",
                "$lte [true] NaN true",
                "$lte [true] NaN true",
                "$lte [true] {} true",
                "$lte [true] null true",
                "$lte [true] [true] true",
                "$lte [true] undefined true",
                "$lte true \"\" true",
                "$lte true [] true",
                "$lte true [null] true",
                "$lte true -0.5 true",
                "$lte true -1 true",
                "$lte true -Infinity true",
                "$lte true 0 true",
                "$lte true 0.5 true",
                "$lte true 1 true",
                "$lte true Infinity true",
                "$lte true NaN true",
                "$lte true NaN true",
                "$lte true {} true",
                "$lte true \"a\" true",
                "$lte true null true",
                "$lte true [true] true",
                "$lte true true true",
                "$lte true undefined true",
                "$lte undefined -Infinity true",
                "$lte undefined Infinity true",
                "$lte undefined NaN true",
                "$lte undefined NaN true",
                "$lte undefined null true",
                "$lte undefined undefined true",
                "$ne \"\" [] true",
                "$ne \"\" [null] true",
                "$ne \"\" -0.5 true",
                "$ne \"\" -1 true",
                "$ne \"\" -Infinity true",
                "$ne \"\" 0 true",
                "$ne \"\" 0.5 true",
                "$ne \"\" 1 true",
                "$ne \"\" Infinity true",
                "$ne \"\" NaN true",
                "$ne \"\" NaN true",
                "$ne \"\" {} true",
                "$ne \"\" \"a\" true",
                "$ne \"\" false true",
                "$ne \"\" null true",
                "$ne \"\" [true] true",
                "$ne \"\" true true",
                "$ne \"\" undefined true",
                "$ne [] \"\" true",
                "$ne [] -0.5 true",
                "$ne [] -1 true",
                "$ne [] -Infinity true",
                "$ne [] 0 true",
                "$ne [] 0.5 true",
                "$ne [] 1 true",
                "$ne [] Infinity true",
                "$ne [] NaN true",
                "$ne [] NaN true",
                "$ne [] \"a\" true",
                "$ne [] false true",
                "$ne [] null true",
                "$ne [] true true",
                "$ne [] undefined true",
                "$ne [null] \"\" true",
                "$ne [null] -0.5 true",
                "$ne [null] -1 true",
                "$ne [null] -Infinity true",
                "$ne [null] 0 true",
                "$ne [null] 0.5 true",
                "$ne [null] 1 true",
                "$ne [null] Infinity true",
                "$ne [null] NaN true",
                "$ne [null] NaN true",
                "$ne [null] \"a\" true",
                "$ne [null] false true",
                "$ne [null] null true",
                "$ne [null] true true",
                "$ne [null] undefined true",
                "$ne -0.5 \"\" true",
                "$ne -0.5 [] true",
                "$ne -0.5 [null] true",
                "$ne -0.5 -1 true",
                "$ne -0.5 -Infinity true",
                "$ne -0.5 0 true",
                "$ne -0.5 0.5 true",
                "$ne -0.5 1 true",
                "$ne -0.5 Infinity true",
                "$ne -0.5 NaN true",
                "$ne -0.5 NaN true",
                "$ne -0.5 {} true",
                "$ne -0.5 \"a\" true",
                "$ne -0.5 false true",
                "$ne -0.5 null true",
                "$ne -0.5 [true] true",
                "$ne -0.5 true true",
                "$ne -0.5 undefined true",
                "$ne -1 \"\" true",
                "$ne -1 [] true",
                "$ne -1 [null] true",
                "$ne -1 -0.5 true",
                "$ne -1 -Infinity true",
                "$ne -1 0 true",
                "$ne -1 0.5 true",
                "$ne -1 1 true",
                "$ne -1 Infinity true",
                "$ne -1 NaN true",
                "$ne -1 NaN true",
                "$ne -1 {} true",
                "$ne -1 \"a\" true",
                "$ne -1 false true",
                "$ne -1 null true",
                "$ne -1 [true] true",
                "$ne -1 true true",
                "$ne -1 undefined true",
                "$ne -Infinity \"\" true",
                "$ne -Infinity [] true",
                "$ne -Infinity [null] true",
                "$ne -Infinity -0.5 true",
                "$ne -Infinity -1 true",
                "$ne -Infinity 0 true",
                "$ne -Infinity 0.5 true",
                "$ne -Infinity 1 true",
                "$ne -Infinity {} true",
                "$ne -Infinity \"a\" true",
                "$ne -Infinity false true",
                "$ne -Infinity [true] true",
                "$ne -Infinity true true",
                "$ne 0 \"\" true",
                "$ne 0 [] true",
                "$ne 0 [null] true",
                "$ne 0 -0.5 true",
                "$ne 0 -1 true",
                "$ne 0 -Infinity true",
                "$ne 0 0.5 true",
                "$ne 0 1 true",
                "$ne 0 Infinity true",
                "$ne 0 NaN true",
                "$ne 0 NaN true",
                "$ne 0 {} true",
                "$ne 0 \"a\" true",
                "$ne 0 false true",
                "$ne 0 null true",
                "$ne 0 [true] true",
                "$ne 0 true true",
                "$ne 0 undefined true",
                "$ne 0.5 \"\" true",
                "$ne 0.5 [] true",
                "$ne 0.5 [null] true",
                "$ne 0.5 -0.5 true",
                "$ne 0.5 -1 true",
                "$ne 0.5 -Infinity true",
                "$ne 0.5 0 true",
                "$ne 0.5 1 true",
                "$ne 0.5 Infinity true",
                "$ne 0.5 NaN true",
                "$ne 0.5 NaN true",
                "$ne 0.5 {} true",
                "$ne 0.5 \"a\" true",
                "$ne 0.5 false true",
                "$ne 0.5 null true",
                "$ne 0.5 [true] true",
                "$ne 0.5 true true",
                "$ne 0.5 undefined true",
                "$ne 1 \"\" true",
                "$ne 1 [] true",
                "$ne 1 [null] true",
                "$ne 1 -0.5 true",
                "$ne 1 -1 true",
                "$ne 1 -Infinity true",
                "$ne 1 0 true",
                "$ne 1 0.5 true",
                "$ne 1 Infinity true",
                "$ne 1 NaN true",
                "$ne 1 NaN true",
                "$ne 1 {} true",
                "$ne 1 \"a\" true",
                "$ne 1 false true",
                "$ne 1 null true",
                "$ne 1 [true] true",
                "$ne 1 true true",
                "$ne 1 undefined true",
                "$ne Infinity \"\" true",
                "$ne Infinity [] true",
                "$ne Infinity [null] true",
                "$ne Infinity -0.5 true",
                "$ne Infinity -1 true",
                "$ne Infinity 0 true",
                "$ne Infinity 0.5 true",
                "$ne Infinity 1 true",
                "$ne Infinity {} true",
                "$ne Infinity \"a\" true",
                "$ne Infinity false true",
                "$ne Infinity [true] true",
                "$ne Infinity true true",
                "$ne NaN \"\" true",
                "$ne NaN [] true",
                "$ne NaN [null] true",
                "$ne NaN -0.5 true",
                "$ne NaN -1 true",
                "$ne NaN 0 true",
                "$ne NaN 0.5 true",
                "$ne NaN 1 true",
                "$ne NaN {} true",
                "$ne NaN \"a\" true",
                "$ne NaN false true",
                "$ne NaN [true] true",
                "$ne NaN true true",
                "$ne NaN \"\" true",
                "$ne NaN [] true",
                "$ne NaN [null] true",
                "$ne NaN -0.5 true",
                "$ne NaN -1 true",
                "$ne NaN 0 true",
                "$ne NaN 0.5 true",
                "$ne NaN 1 true",
                "$ne NaN {} true",
                "$ne NaN \"a\" true",
                "$ne NaN false true",
                "$ne NaN [true] true",
                "$ne NaN true true",
                "$ne {} \"\" true",
                "$ne {} -0.5 true",
                "$ne {} -1 true",
                "$ne {} -Infinity true",
                "$ne {} 0 true",
                "$ne {} 0.5 true",
                "$ne {} 1 true",
                "$ne {} Infinity true",
                "$ne {} NaN true",
                "$ne {} NaN true",
                "$ne {} \"a\" true",
                "$ne {} false true",
                "$ne {} null true",
                "$ne {} true true",
                "$ne {} undefined true",
                "$ne \"a\" \"\" true",
                "$ne \"a\" [] true",
                "$ne \"a\" [null] true",
                "$ne \"a\" -0.5 true",
                "$ne \"a\" -1 true",
                "$ne \"a\" -Infinity true",
                "$ne \"a\" 0 true",
                "$ne \"a\" 0.5 true",
                "$ne \"a\" 1 true",
                "$ne \"a\" Infinity true",
                "$ne \"a\" NaN true",
                "$ne \"a\" NaN true",
                "$ne \"a\" {} true",
                "$ne \"a\" false true",
                "$ne \"a\" null true",
                "$ne \"a\" [true] true",
                "$ne \"a\" true true",
                "$ne \"a\" undefined true",
                "$ne false \"\" true",
                "$ne false [] true",
                "$ne false [null] true",
                "$ne false -0.5 true",
                "$ne false -1 true",
                "$ne false -Infinity true",
                "$ne false 0 true",
                "$ne false 0.5 true",
                "$ne false 1 true",
                "$ne false Infinity true",
                "$ne false NaN true",
                "$ne false NaN true",
                "$ne false {} true",
                "$ne false \"a\" true",
                "$ne false null true",
                "$ne false [true] true",
                "$ne false true true",
                "$ne false undefined true",
                "$ne null \"\" true",
                "$ne null [] true",
                "$ne null [null] true",
                "$ne null -0.5 true",
                "$ne null -1 true",
                "$ne null 0 true",
                "$ne null 0.5 true",
                "$ne null 1 true",
                "$ne null {} true",
                "$ne null \"a\" true",
                "$ne null false true",
                "$ne null [true] true",
                "$ne null true true",
                "$ne [true] \"\" true",
                "$ne [true] -0.5 true",
                "$ne [true] -1 true",
                "$ne [true] -Infinity true",
                "$ne [true] 0 true",
                "$ne [true] 0.5 true",
                "$ne [true] 1 true",
                "$ne [true] Infinity true",
                "$ne [true] NaN true",
                "$ne [true] NaN true",
                "$ne [true] \"a\" true",
                "$ne [true] false true",
                "$ne [true] null true",
                "$ne [true] true true",
                "$ne [true] undefined true",
                "$ne true \"\" true",
                "$ne true [] true",
                "$ne true [null] true",
                "$ne true -0.5 true",
                "$ne true -1 true",
                "$ne true -Infinity true",
                "$ne true 0 true",
                "$ne true 0.5 true",
                "$ne true 1 true",
                "$ne true Infinity true",
                "$ne true NaN true",
                "$ne true NaN true",
                "$ne true {} true",
                "$ne true \"a\" true",
                "$ne true false true",
                "$ne true null true",
                "$ne true [true] true",
                "$ne true undefined true",
                "$ne undefined \"\" true",
                "$ne undefined [] true",
                "$ne undefined [null] true",
                "$ne undefined -0.5 true",
                "$ne undefined -1 true",
                "$ne undefined 0 true",
                "$ne undefined 0.5 true",
                "$ne undefined 1 true",
                "$ne undefined {} true",
                "$ne undefined \"a\" true",
                "$ne undefined false true",
                "$ne undefined [true] true",
                "$ne undefined true true",
                "$nin [] \"\" true",
                "$nin [] [] true",
                "$nin [] [null] true",
                "$nin [] -0.5 true",
                "$nin [] -1 true",
                "$nin [] -Infinity true",
                "$nin [] 0 true",
                "$nin [] 0.5 true",
                "$nin [] 1 true",
                "$nin [] Infinity true",
                "$nin [] NaN true",
                "$nin [] NaN true",
                "$nin [] {} true",
                "$nin [] \"a\" true",
                "$nin [] false true",
                "$nin [] null true",
                "$nin [] [true] true",
                "$nin [] true true",
                "$nin [] undefined true",
                "$nin [null] \"\" true",
                "$nin [null] [] true",
                "$nin [null] [null] true",
                "$nin [null] -0.5 true",
                "$nin [null] -1 true",
                "$nin [null] 0 true",
                "$nin [null] 0.5 true",
                "$nin [null] 1 true",
                "$nin [null] {} true",
                "$nin [null] \"a\" true",
                "$nin [null] false true",
                "$nin [null] [true] true",
                "$nin [null] true true",
                "$nin [true] \"\" true",
                "$nin [true] [] true",
                "$nin [true] [null] true",
                "$nin [true] -0.5 true",
                "$nin [true] -1 true",
                "$nin [true] -Infinity true",
                "$nin [true] 0 true",
                "$nin [true] 0.5 true",
                "$nin [true] 1 true",
                "$nin [true] Infinity true",
                "$nin [true] NaN true",
                "$nin [true] NaN true",
                "$nin [true] {} true",
                "$nin [true] \"a\" true",
                "$nin [true] false true",
                "$nin [true] null true",
                "$nin [true] [true] true",
                "$nin [true] undefined true",
                "$regex \"\" \"\" true",
                "$regex \"\" [] true",
                "$regex \"\" [null] true",
                "$regex \"\" -0.5 true",
                "$regex \"\" -1 true",
                "$regex \"\" -Infinity true",
                "$regex \"\" 0 true",
                "$regex \"\" 0.5 true",
                "$regex \"\" 1 true",
                "$regex \"\" Infinity true",
                "$regex \"\" NaN true",
                "$regex \"\" NaN true",
                "$regex \"\" {} true",
                "$regex \"\" \"a\" true",
                "$regex \"\" false true",
                "$regex \"\" null true",
                "$regex \"\" [true] true",
                "$regex \"\" true true",
                "$regex \"\" undefined true",
                "$regex [] \"\" true",
                "$regex [] [] true",
                "$regex [] [null] true",
                "$regex [] -0.5 true",
                "$regex [] -1 true",
                "$regex [] -Infinity true",
                "$regex [] 0 true",
                "$regex [] 0.5 true",
                "$regex [] 1 true",
                "$regex [] Infinity true",
                "$regex [] NaN true",
                "$regex [] NaN true",
                "$regex [] {} true",
                "$regex [] \"a\" true",
                "$regex [] false true",
                "$regex [] null true",
                "$regex [] [true] true",
                "$regex [] true true",
                "$regex [] undefined true",
                "$regex [null] \"\" true",
                "$regex [null] [] true",
                "$regex [null] [null] true",
                "$regex [null] -0.5 true",
                "$regex [null] -1 true",
                "$regex [null] -Infinity true",
                "$regex [null] 0 true",
                "$regex [null] 0.5 true",
                "$regex [null] 1 true",
                "$regex [null] Infinity true",
                "$regex [null] NaN true",
                "$regex [null] NaN true",
                "$regex [null] {} true",
                "$regex [null] \"a\" true",
                "$regex [null] false true",
                "$regex [null] null true",
                "$regex [null] [true] true",
                "$regex [null] true true",
                "$regex [null] undefined true",
                "$regex -0.5 -0.5 true",
                "$regex -1 -1 true",
                "$regex -Infinity -Infinity true",
                "$regex -Infinity Infinity true",
                "$regex -Infinity NaN true",
                "$regex -Infinity NaN true",
                "$regex -Infinity null true",
                "$regex -Infinity undefined true",
                "$regex 0 -0.5 true",
                "$regex 0 0 true",
                "$regex 0 0.5 true",
                "$regex 0.5 -0.5 true",
                "$regex 0.5 0.5 true",
                "$regex 1 -1 true",
                "$regex 1 1 true",
                "$regex Infinity -Infinity true",
                "$regex Infinity Infinity true",
                "$regex Infinity NaN true",
                "$regex Infinity NaN true",
                "$regex Infinity null true",
                "$regex Infinity undefined true",
                "$regex NaN -Infinity true",
                "$regex NaN Infinity true",
                "$regex NaN NaN true",
                "$regex NaN NaN true",
                "$regex NaN null true",
                "$regex NaN undefined true",
                "$regex NaN -Infinity true",
                "$regex NaN Infinity true",
                "$regex NaN NaN true",
                "$regex NaN NaN true",
                "$regex NaN null true",
                "$regex NaN undefined true",
                "$regex {} {} true",
                "$regex {} false true",
                "$regex {} [true] true",
                "$regex {} true true",
                "$regex \"a\" \"a\" true",
                "$regex \"a\" false true",
                "$regex false false true",
                "$regex null -Infinity true",
                "$regex null Infinity true",
                "$regex null NaN true",
                "$regex null NaN true",
                "$regex null null true",
                "$regex null undefined true",
                "$regex [true] [true] true",
                "$regex [true] true true",
                "$regex true [true] true",
                "$regex true true true",
                "$regex undefined -Infinity true",
                "$regex undefined Infinity true",
                "$regex undefined NaN true",
                "$regex undefined NaN true",
                "$regex undefined null true",
                "$regex undefined undefined true",
                "$size \"\" \"\" true",
                "$size [] [] true",
                "$size [] [null] true",
                "$size [] {} true",
                "$size [] [true] true",
                "$size [null] [] true",
                "$size [null] [null] true",
                "$size [null] {} true",
                "$size [null] [true] true",
                "$size -0.5 -0.5 true",
                "$size -1 -1 true",
                "$size -Infinity -Infinity true",
                "$size -Infinity Infinity true",
                "$size -Infinity NaN true",
                "$size -Infinity NaN true",
                "$size -Infinity null true",
                "$size -Infinity undefined true",
                "$size 0 0 true",
                "$size 0.5 0.5 true",
                "$size 1 1 true",
                "$size Infinity -Infinity true",
                "$size Infinity Infinity true",
                "$size Infinity NaN true",
                "$size Infinity NaN true",
                "$size Infinity null true",
                "$size Infinity undefined true",
                "$size NaN -Infinity true",
                "$size NaN Infinity true",
                "$size NaN NaN true",
                "$size NaN NaN true",
                "$size NaN null true",
                "$size NaN undefined true",
                "$size NaN -Infinity true",
                "$size NaN Infinity true",
                "$size NaN NaN true",
                "$size NaN NaN true",
                "$size NaN null true",
                "$size NaN undefined true",
                "$size {} [] true",
                "$size {} [null] true",
                "$size {} {} true",
                "$size {} [true] true",
                "$size \"a\" \"a\" true",
                "$size false false true",
                "$size null -Infinity true",
                "$size null Infinity true",
                "$size null NaN true",
                "$size null NaN true",
                "$size null null true",
                "$size null undefined true",
                "$size [true] [] true",
                "$size [true] [null] true",
                "$size [true] {} true",
                "$size [true] [true] true",
                "$size true true true",
                "$size undefined -Infinity true",
                "$size undefined Infinity true",
                "$size undefined NaN true",
                "$size undefined NaN true",
                "$size undefined null true",
                "$size undefined undefined true"
            ];
            [
                '$elemMatch',
                '$eq',
                '$exists',
                '$gt',
                '$gte',
                '$in',
                '$lt',
                '$lte',
                '$ne',
                '$nin',
                '$regex',
                '$size',
                '$undefined'
            ].forEach(function (operator) {
                options.argList.forEach(function (aa) {
                    options.argList.forEach(function (bb) {
                        options.data = local.db.operatorTest(operator, aa, bb);
                        if (options.data === false) {
                            return;
                        }
                        local.utility2.assertJsonEqual(options.data, true);
                        options.ii += 1;
                        options.data = operator +
                            ' ' +
                            (typeof aa === 'string' || (aa && typeof aa === 'object')
                                ? JSON.stringify(aa)
                                : String(aa)) +
                            ' ' +
                            (typeof bb === 'string' || (bb && typeof bb === 'object')
                                ? JSON.stringify(bb)
                                : String(bb)) +
                            ' ' +
                            options.data;
                        /* istanbul ignore next */
                        local.utility2.tryCatchOnError(function () {
                            local.utility2.assertJsonEqual(
                                options.data,
                                options.testList[options.ii]
                            );
                        }, function (error) {
                            options.error = options.error || error;
                        });
                        options.result.push(options.data);
                    });
                });
            });
            /* istanbul ignore next */
            if (options.error) {
                console.error(JSON.stringify(options.result, null, 4));
            }
            onError(options.error);
        };

        local.testCase_sortCompare_default = function (options, onError) {
        /*
         * this function will test sortCompare's default handling-behavior
         */
            options = {};
            options.data = [
                '',
                [],
                -1,
                -Infinity,
                0,
                1,
                Infinity,
                -NaN,
                NaN,
                {},
                { aa: 1},
                'a',
                'aa',
                false,
                null,
                true,
                undefined
            ].sort();
            options.data = options.data.sort(local.db.sortCompare);
            local.utility2.assertJsonEqual(options.data, [false, true,
                -1, 0, 1,
                '', 'a', 'aa',
                [], {}, { aa: 1 },
                null, null, null, null, null, null]);
            options.data = options.data.reverse().sort(local.db.sortCompare);
            local.utility2.assertJsonEqual(options.data, [false, true,
                -1, 0, 1,
                '', 'a', 'aa',
                [], { aa: 1 }, {},
                null, null, null, null, null, null]);
            onError();
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's app handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            options = [{
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.app.min.js',
                url: '/assets.app.min.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.css',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.css'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.js',
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.' + local.utility2.envDict.npm_package_name + '.min.js',
                transform: function (data) {
                    return local.utility2.uglifyIfProduction(
                        local.utility2.bufferToString(data)
                    );
                },
                url: '/assets.' + local.utility2.envDict.npm_package_name + '.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.utility2.stateInit',
                url: '/jsonp.utility2.stateInit?callback=window.utility2.stateInit'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    switch (local.path.extname(options.file)) {
                    case '.css':
                    case '.js':
                    case '.json':
                        local.utility2.jslintAndPrintConditional(
                            xhr.responseText,
                            options.file
                        );
                        // validate no error occurred
                        local.utility2.assert(
                            !local.utility2.jslint.errorText,
                            local.utility2.jslint.errorText
                        );
                        break;
                    }
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        (options.transform || local.utility2.echo)(xhr.response),
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            options = {};
            local.utility2.onNext(options, function (error) {
                switch (options.modeNext) {
                case 1:
                    options.moduleDict = {
                        'db-lite': {
                            exampleList: [],
                            exports: local.db
                        },
                        'db-lite._DbIndex.prototype': {
                            exampleList: [],
                            exports: local.db._DbIndex.prototype
                        },
                        'db-lite._DbTable.prototype': {
                            exampleList: [],
                            exports: local.db._DbTable.prototype
                        },
                        'db-lite._DbTree.prototype': {
                            exampleList: [],
                            exports: local.db._DbTree.prototype
                        }
                    };
                    Object.keys(options.moduleDict).forEach(function (key) {
                        options.moduleDict[key].example = [
                            'README.md',
                            'test.js',
                            'index.js'
                        ]
                            .concat(options.moduleDict[key].exampleList)
                            .map(function (file) {
                                return '\n\n\n\n\n\n\n\n' +
                                    local.fs.readFileSync(file, 'utf8') +
                                    '\n\n\n\n\n\n\n\n';
                            }).join('');
                    });
                    // create doc.api.html
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                        local.utility2.docApiCreate(options),
                        options.onNext
                    );
                    break;
                case 2:
                    local.utility2.browserTest({
                        modeBrowserTest: 'screenCapture',
                        url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                            '/doc.api.html'
                    }, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: local.utility2.serverLocalHost + '?modeTest=1'
            };
            local.utility2.browserTest(options, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init dbSeedList
        local.utility2.dbSeedList = local.utility2.dbSeedList.concat([{
            dbIndexCreateList: [{
                expireAfterSeconds: 30,
                fieldName: 'field1',
                sparse: true,
                unique: true
            }],
            dbRowList: [{
                id: 'testCase_dbTableCrudCountMany_default'
            }, {
                id: 'testCase_dbTableCrudFindOne_default'
            }, {
                id: 'testCase_dbTableCrudRemoveOne_default'
            }],
            name: 'TestCrud'
        }]);
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // run tests
        local.utility2.nop(
            local.utility2.modeTest && document.querySelector('#testRunButton1').click()
        );
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // run test-server
        local.utility2.testRunServer(local);
        // init repl debugger
        local.utility2.replStart();
        /* istanbul ignore next */
        if (module !== require.main || module.isRollup) {
            break;
        }
        // init assets
        local.utility2.assetsDict['/assets.app.js'] = [
            'header',
            '/assets.utility2.rollup.js',
            'local.utility2.stateInit',
            '/assets.db-lite.js',
            '/assets.example.js',
            '/assets.test.js'
        ].map(function (key) {
            switch (key) {
/* jslint-ignore-begin */
case 'header':
return '\
/*\n\
assets.app.js\n\
\n' + local.utility2.envDict.npm_package_description + '\n\
\n\
instruction\n\
    1. save this script as assets.app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node assets.app.js\n\
    3. open a browser to http://localhost:8081\n\
    4. edit or paste script in browser to eval\n\
*/\n\
';
/* jslint-ignore-end */
            case 'local.utility2.stateInit':
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local.utility2.middlewareJsonpStateInit({ stateInit: true })
                        ) + ');'
                    );
            default:
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            }
        }).join('\n\n\n\n');
        local.utility2.assetsDict['/assets.app.min.js'] =
            local.utility2.uglifyIfProduction(local.utility2.assetsDict['/assets.app.js']);
        break;
    }
}());
