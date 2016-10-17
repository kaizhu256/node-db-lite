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
        [
            'assert',
            'jsonCopy',
            'jsonStringifyOrdered',
            'objectSetDefault',
            'onErrorDefault',
            'onNext',
            'onParallel'
        ].forEach(function (key) {
            local.utility2[key] = local.db[key];
            [
                'testCase_' + key + '_default',
                'testCase_' + key + '_error',
                'testCase_' + key + 'Xxx_default'
            ].forEach(function (key2) {
                if (local.utility2.testCaseDict[key2]) {
                    local[key2] = local.utility2.testCaseDict[key2];
                }
            });
        });
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
            options.dbTable.crudInsertMany([
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
            onParallel.counter += 1;
            // test dbStorageInit's re-init handling-behavior
            local.db.dbStorageInit();
            // test dbStorageKey's handling-behavior
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
            options.dbTable.crudInsertMany([
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

        local.testCase_queryCompare_default = function (options, onError) {
        /*
         * this function will test queryCompare's default handling-behavior
         */
            options = [
                // $elemMatch
                ['$elemMatch', undefined, undefined, false],
                ['$elemMatch', [undefined], undefined, false],
                // $eq
                ['$eq', undefined, undefined, true],
                ['$eq', null, undefined, true],
                ['$eq', NaN, NaN, true],
                // $exists
                ['$exists', false, undefined, true],
                ['$exists', true, undefined, false],
                // $gt
                ['$gt', undefined, undefined, false],
                ['$gt', undefined, undefined, false],
                // $gte
                ['$gte', undefined, undefined, true],
                // $in
                ['$in', undefined, undefined, false],
                ['$in', undefined, [undefined], true],
                // $lt
                ['$lt', undefined, undefined, false],
                // $lte
                ['$lte', undefined, undefined, true],
                // $ne
                ['$ne', undefined, undefined, false],
                // $nin
                ['$nin', undefined, undefined, false],
                ['$nin', undefined, [undefined], false],
                // $regex
                ['$regex', undefined, undefined, false],
                // $size
                ['$size', undefined, undefined, false],
                ['$size', [undefined], undefined, false],
                [undefined, undefined, undefined, false]
            ];
            options.forEach(function (element) {
                local.utility2.assertJsonEqual(
                    [
                        element[0],
                        element[1],
                        element[2],
                        local.db.queryCompare(element[0], element[1], element[2])
                    ],
                    element
                );
            });
            onError();
        };

        local.testCase_dbTree_default = function (options, onError) {
        /*
         * this function will test dbTree's default handling-behavior
         */
            var dbRow, ii;
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
            for (ii = 0; ii < 0x100; ii += 1) {
                dbRow = { key: Math.random() };
                options.dbTree = options.dbTree.insert(dbRow.key, dbRow);
                local.testCase_dbTree_sort(options);
            }
            // validate null-item
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
                local.testCase_dbTree_sort(options);
            });
            onError();
        };

        local.testCase_dbTree_sort = function (options, onError) {
        /*
         * this function will test dbTree's insert handling-behavior
         */
            options = local.utility2.objectSetDefault(options, {
                dbTree: new local.db._DbTree({})
            });
            options.data = options.dbTree.list();
            // validate sort
            options.data.forEach(function (aa, bb) {
                local.utility2.assert(local.db.sortCompare(aa.key, bb.key) <= 0, [aa, bb]);
            });
            if (onError) {
                onError();
            }
        };

        local.testCase_sortCompare_default = function (options, onError) {
        /*
         * this function will test sortCompare's default handling-behavior
         */
            options = {};
            options.data = [undefined, null, false, 0, '', true, 1, 'a', local.utility2.nop];
            local.utility2.assertJsonEqual(
                options.data.sort(local.db.sortCompare),
                [false, true, 0, 1, '', 'a', null, null, null]
            );
            local.utility2.assertJsonEqual(
                options.data.reverse().sort(local.db.sortCompare),
                [false, true, 0, 1, '', 'a', null, null, null]
            );
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
