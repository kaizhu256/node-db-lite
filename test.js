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
            break;
        }
    }());



    // run shared js-env code - function
    (function () {
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

        local.testCase_dbTable_crudGetManyByQuery = function (options, onError) {
        /*
         * this function will test dbTable's crudGetManyByQuery handling-behavior
         */
            options = {};
            // test dbTableCreateOne's create handling-behavior
            options.dbTable = local.dbTableCreateOne({
                name: 'testCase_dbTable_crudGetManyByQuery'
            });
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // test isDirty handling-behavior
            options.dbTable.crudRemoveOneById(options.dbTable.crudSetOneById({
                field1: 'dirty'
            }));
            // test null-case handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({});
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            options.data = [
                [],
                [[], '', 0, {}, false, null, undefined].sort(),
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
            ].sort().map(function (element) {
                return { field1: element };
            });
            options.data = options.data.concat.apply(
                options.data,
                options.data.map(function (dbRow) {
                    return { field1: JSON.stringify(dbRow.field1) };
                })
            );
            // test dbTableCreateOne's crudSetManyById handling-behavior
            options.data = options.dbTable.crudSetManyById(options.data);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 30);
            // validate data
            [
                [],
                [[], '', 0, {}, false, null, null],
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
                '[]',
                '[[],"",0,{},false,null,null]',
                '-0.5',
                '-1',
                'null',
                '0',
                '0.5',
                '1',
                'null',
                'null',
                '{}',
                'false',
                'null',
                'true',
                undefined
            ].forEach(function (element, ii) {
                local.utility2.assertJsonEqual(element, options.data[ii].field1);
            });
            // test null-case handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $undefined: null } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test null-case handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $undefined: {} } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $eq's boolean handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: true },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 1);
            local.utility2.assertJsonEqual(options.data, [true]);
            // test $eq's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: null },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 7);
            local.utility2.assertJsonEqual(
                options.data.slice(0, -1),
                [null, null, null, null, null, null]
            );
            // test $eq's number handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: 0 },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 2);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), [0]);
            // test $eq's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: '{}' },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 1);
            local.utility2.assertJsonEqual(options.data, ['{}']);
            // test $exists's false handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $exists: false } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 7);
            // test $exists's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $exists: null } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 7);
            // test $exists's true handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $exists: true } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 23);
            // test $gt's boolean handling-behavior
            // test $lt's boolean handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gt: false, $lt: true } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $gt's null handling-behavior
            // test $lt's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gt: false, $lt: true } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $gt's number handling-behavior
            // test $lt's number handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gt: -1, $lt: 1 } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 4);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), [-0.5, 0, 0.5]);
            // test $gt's string handling-behavior
            // test $lt's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gt: 'false', $lt: 'true' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 4);
            local.utility2.assertJsonEqual(
                options.data,
                ['null', 'null', 'null', 'null']
            );
            // test $gte's boolean handling-behavior
            // test $lte's boolean handling-behavior
            // test $ne's boolean handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gte: false, $lte: true, $ne: false } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 2);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), [true]);
            // test $gte's null handling-behavior
            // test $lte's null handling-behavior
            // test $ne's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gte: null, $lte: null, $ne: null } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 1);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), []);
            // test $gte's number handling-behavior
            // test $lte's number handling-behavior
            // test $ne's number handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gte: -1, $lte: 1, $ne: 0 } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 5);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), [-1, -0.5, 0.5, 1]);
            // test $gte's number handling-behavior
            // test $lte's number handling-behavior
            // test $ne's number handling-behavior
            // test limit handling-behavior
            // test projection handling-behavior
            // test skip handling-behavior
            // test sort's isDescending handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                limit: 2,
                query: { field1: { $gte: -1, $lte: 1, $ne: 0 } },
                projection: ['field1'],
                skip: 2,
                sort: [{ fieldName: 'field1', isDescending: true }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 2);
            local.utility2.assertJsonEqual(options.data.slice(), [0.5, -0.5]);
            // test $gte's string handling-behavior
            // test $lte's string handling-behavior
            // test $ne's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $gte: 'false', $lte: 'true', $ne: 'null' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 2);
            local.utility2.assertJsonEqual(options.data, ['false', 'true']);
            // test $in's list handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $in: [true, 1] } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 2);
            local.utility2.assertJsonEqual(options.data, [true, 1]);
            // test $in's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $in: null } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $in's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $in: '0.5' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 3);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), ['0', '0.5']);
            // test $nin's list handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $nin: [0, null] } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 22);
            // test $nin's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $nin: null } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $nin's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: {
                    $nin: '[[],"",0,1,{},false,null,true]'
                } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 4);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), ['-0.5', '-1', '0.5']);
            // test $or's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { $or: null },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $or's empty-list handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { $or: [] },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $or's list handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { $or: [
                    { field1: { $eq: -0.5 } },
                    { field1: { $eq: 0 } },
                    { field1: { $eq: 0.5 } }
                ] },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 4);
            local.utility2.assertJsonEqual(options.data.slice(0, -1), [-0.5, 0, 0.5]);
            // test $regex's regex handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $regex: (/1|true/) } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 6);
            local.utility2.assertJsonEqual(options.data, [true, -1, 1, '-1', '1', 'true']);
            // test $regex's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $regex: null } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $typeof's boolean handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'boolean' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 3);
            // test $typeof's null handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: null } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $typeof's number handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'number' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 6);
            // test $typeof's object handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'object' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 8);
            // test $typeof's string handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'string' } },
                sort: [{ fieldName: 'field1' }]
            }).map(function (dbRow) {
                return dbRow.field1;
            });
            local.utility2.assertJsonEqual(options.data.length, 15);
            // test $typeof's symbol handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'symbol' } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            // test $typeof's undefined handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { field1: { $typeof: 'undefined' } },
                sort: [{ fieldName: 'field1' }]
            });
            local.utility2.assertJsonEqual(options.data.length, 0);
            local.utility2.assertJsonEqual(options.data, []);
            onError();
        };

        local.testCase_dbTable_crudNullCase = function (options, onError) {
        /*
         * this function will test dbTable's crudNullCase handling-behavior
         */
            options = {};
            // test dbTableCreateMany's null handling-behavior
            local.dbTableCreateMany();
            // test dbTableCreateOne's onError handling-behavior
            options.dbTable = local.dbTableCreateOne({
                name: 'testCase_dbTable_crudNullCase'
            }, local.utility2.onErrorDefault);
            // test dbTableCreateOne's null-case handling-behavior
            options.dbTable = local.dbTableCreateOne({
                name: 'testCase_dbTable_crudNullCase'
            });
            // test dbTableClear's null-case handling-behavior
            options.dbTable.clear();
            // test dbTableReset's null-case handling-behavior
            options.dbTable.reset();
            // test idIndexCreate's null-case handling-behavior
            options.dbTable.idIndexCreate({ name: '_id' });
            // test idIndexRemove's null-case handling-behavior
            options.dbTable.idIndexRemove({ name: '_id' });
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // test crudCountManyByQuery's null-case handling-behavior
            options.data = options.dbTable.crudCountManyByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, 0);
            // test crudGetManyById's null-case handling-behavior
            options.data = options.dbTable.crudGetManyById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudGetManyByQuery's null-case handling-behavior
            options.data = options.dbTable.crudGetManyByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudGetOneById's null-case handling-behavior
            options.data = options.dbTable.crudGetOneById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudGetOneByQuery's null-case handling-behavior
            options.data = options.dbTable.crudGetOneByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudRemoveManyById's null-case handling-behavior
            options.data = options.dbTable.crudRemoveManyById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudRemoveManyByQuery's null-case handling-behavior
            options.data = options.dbTable.crudRemoveManyByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudRemoveOneById's null-case handling-behavior
            options.data = options.dbTable.crudRemoveOneById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudUpdateManyById's null-case handling-behavior
            options.data = options.dbTable.crudUpdateManyById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudUpdateManyByQuery's null-case handling-behavior
            options.data = options.dbTable.crudUpdateManyByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, []);
            // test crudUpdateOneById's null-case handling-behavior
            options.data = options.dbTable.crudUpdateOneById();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudSetOneById's insert handling-behavior
            options.data = options.dbTable.crudSetOneById({});
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 1);
            options._id = options.data._id;
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // test crudRemoveOneById's soft-delete handling-behavior
            options.data = options.dbTable.crudRemoveOneById(options);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            // test crudGetOneById's null-case handling-behavior
            options.data = options.dbTable.crudGetOneById(options);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudRemoveOneById's null-case handling-behavior
            options.data = options.dbTable.crudRemoveOneById(options);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            // test crudUpdateOneById's null-case handling-behavior
            options.data = options.dbTable.crudUpdateOneById({ _id: options._id });
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data, null);
            onError();
        };

        local.testCase_dbTable_crudXxxById = function (options, onError) {
        /*
         * this function will test dbTable's crudXxxById handling-behavior
         */
            options = {};
            // test dbTableCreateMany's create handling-behavior
            options.dbTable = local.dbTableCreateMany([{
                idIndexCreateList: [null],
                idIndexRemoveList: [null],
                name: 'testCase_dbTable_crudXxxById'
            }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // test crudSetManyById's insert handling-behavior
            options.data = options.dbTable.crudSetManyById([null, null]);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate data
            local.utility2.assertJsonEqual(options.data.length, 2);
            // test crudRemoveManyById's soft-delete handling-behavior
            options.data = options.dbTable.crudRemoveManyById(options.data);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data.length, 2);
            // test crudSetManyById's insert handling-behavior
            options.data = options.dbTable.crudSetManyById([null, {
                field1: 1,
                field2: 2,
                field3: 3
            }])[1];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonNotEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, undefined);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, 2);
            local.utility2.assertJsonEqual(options.data.field3, 3);
            // test idIndexCreate's create handling-behavior
            options._id = options.data._id;
            options.dbTable.idIndexCreate({ isInteger: true, name: 'id2' });
            // test crudGetManyById's get handling-behavior
            options.data = options.dbTable.crudGetManyById([{ _id: options._id }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonNotEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, 2);
            // test crudUpdateManyById's update handling-behavior
            options.id2 = options.data.id2;
            options.data = options.dbTable.crudUpdateManyById([{
                id2: options.id2,
                field2: NaN,
                field3: [new Date(0)]
            }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate timestamp
            local.utility2.assert(
                options.data._timeCreated <= options.data._timeModified,
                options.data
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, ['1970-01-01T00:00:00.000Z']);
            // test crudSetManyById's replace handling-behavior
            options.data = options.dbTable.crudSetManyById([{ id2: options.id2 }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudUpdateManyById's update handling-behavior
            options.data = options.dbTable.crudUpdateManyById([{
                id2: options.id2,
                field1: 1
            }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate timestamp
            local.utility2.assert(
                options.data._timeCreated <= options.data._timeModified,
                options.data
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudRemoveManyById's soft-delete handling-behavior
            options.data = options.dbTable.crudRemoveManyById([options])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 1);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudSetManyById's re-insert handling-behavior
            options.data = options.dbTable.crudSetManyById([{ id2: options.id2 }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonNotEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudRemoveManyById's soft-delete handling-behavior
            options._id = options.data._id;
            options.data = options.dbTable.crudRemoveManyById([options])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountAll(), 1);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            onError();
        };

        local.testCase_dbTable_crudXxxByQuery = function (options, onError) {
        /*
         * this function will test dbTable's crudXxxByQuery handling-behavior
         */
            options = {};
            // test dbTableCreateMany's create handling-behavior
            options.dbTable = local.dbTableCreateMany([{
                idIndexCreateList: [null],
                idIndexRemoveList: [null],
                name: 'testCase_dbTable_crudXxxByQuery'
            }])[0];
            // reset dbTable
            options.dbTable.reset();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 0);
            // test crudSetManyById's insert handling-behavior
            options.data = options.dbTable.crudSetManyById([null, null]);
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate data
            local.utility2.assertJsonEqual(options.data.length, 2);
            // test crudRemoveManyByQuery's soft-delete handling-behavior
            options.data = options.dbTable.crudRemoveManyByQuery();
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 0);
            // validate data
            local.utility2.assertJsonEqual(options.data.length, 2);
            // test crudSetManyById's insert handling-behavior
            options.data = options.dbTable.crudSetManyById([null, {
                field1: 1,
                field2: 2,
                field3: 3
            }])[1];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonNotEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, undefined);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, 2);
            local.utility2.assertJsonEqual(options.data.field3, 3);
            // test idIndexCreate's create handling-behavior
            options._id = options.data._id;
            options.dbTable.idIndexCreate({ isInteger: true, name: 'id2' });
            // test crudGetManyByQuery's get handling-behavior
            options.data = options.dbTable.crudGetManyByQuery({
                query: { _id: options._id }
            })[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonNotEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, 2);
            // test crudGetOneByQuery's get handling-behavior
            options.data = options.dbTable.crudGetOneByQuery({ _id: options._id });
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonNotEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, 2);
            // test crudUpdateManyByQuery's update handling-behavior
            options.id2 = options.data.id2;
            options.data = options.dbTable.crudUpdateManyByQuery({
                id2: options.id2
            }, {
                id2: options.id2,
                field2: NaN,
                field3: [new Date(0)]
            })[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate timestamp
            local.utility2.assert(
                options.data._timeCreated <= options.data._timeModified,
                options.data
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, ['1970-01-01T00:00:00.000Z']);
            // test crudSetManyById's replace handling-behavior
            options.data = options.dbTable.crudSetManyById([{ id2: options.id2 }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudUpdateManyByQuery's update handling-behavior
            options.data = options.dbTable.crudUpdateManyByQuery({
                id2: options.id2
            }, {
                id2: options.id2,
                field1: 1
            })[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate timestamp
            local.utility2.assert(
                options.data._timeCreated <= options.data._timeModified,
                options.data
            );
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudRemoveManyByQuery's soft-delete handling-behavior
            options.data = options.dbTable.crudRemoveManyByQuery({ _id: options._id })[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 1);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, 1);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudSetManyById's re-insert handling-behavior
            options.data = options.dbTable.crudSetManyById([{ id2: options.id2 }])[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 2);
            // validate timestamp
            local.utility2.assertJsonEqual(
                options.data._timeCreated,
                options.data._timeModified
            );
            // validate data
            local.utility2.assertJsonNotEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            // test crudRemoveManyByQuery's soft-delete handling-behavior
            options._id = options.data._id;
            options.data = options.dbTable.crudRemoveManyByQuery({ _id: options._id })[0];
            // validate dbRowCount
            local.utility2.assertJsonEqual(options.dbTable.crudCountManyByQuery(), 1);
            // validate data
            local.utility2.assertJsonEqual(options.data._id, options._id);
            local.utility2.assertJsonEqual(options.data.id2, options.id2);
            local.utility2.assertJsonEqual(options.data.field1, undefined);
            local.utility2.assertJsonEqual(options.data.field2, undefined);
            local.utility2.assertJsonEqual(options.data.field3, undefined);
            onError();
        };

        local.testCase_dbTable_persistence = function (options, onError) {
        /*
         * this function will test dbTable's persistence handling-behavior
         */
            options = {};
            // clear db
            local.dbClear();
            // reset db
            local.dbReset();
            // save db
            local.dbSave();
            // load db
            local.dbLoad();
            // import db
            local.dbImport('testCase_dbTable_persistence idIndexCreate {"name":"_id"}\n' +
                'testCase_dbTable_persistence idIndexCreate {"name":"id2"}\n' +
                'testCase_dbTable_persistence dbRowSet {"_id":"id1"}\n' +
                'undefined undefined undefined');
            options.dbTable = local.dbTableCreateOne({ name: 'testCase_dbTable_persistence' });
            options.data = local.dbExport();
            // validate dbTable has idIndex._id
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"_id"}'
            ) >= 0, options.data);
            // validate dbTable has idIndex.id2
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"id2"}'
            ) >= 0, options.data);
            // validate dbTable has dbRow1
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence dbRowSet {"_id":"id1",'
            ) >= 0, options.data);
            // clear dbTable
            options.dbTable.clear();
            options.data = options.dbTable.export();
            // validate dbTable has idIndex._id
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"_id"}'
            ) >= 0, options.data);
            // validate dbTable has idIndex.id2
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"id2"}'
            ) >= 0, options.data);
            // validate dbTable has no dbRow1
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence dbRowSet {"_id":"id1",'
            ) < 0, options.data);
            // reset dbTable
            options.dbTable.reset();
            options.data = options.dbTable.export();
            // validate dbTable has idIndex._id
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"_id"}'
            ) >= 0, options.data);
            // validate dbTable has no idIndex.id2
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence idIndexCreate {"name":"id2"}'
            ) < 0, options.data);
            // validate dbTable has no dbRow1
            local.utility2.assert(options.data.indexOf(
                'testCase_dbTable_persistence dbRowSet {"_id":"id1",'
            ) < 0, options.data);
            onError();
        };

        local.testCase_sortCompare_default = function (options, onError) {
        /*
         * this function will test sortCompare's default handling-behavior
         */
            options = {};
            options.data = [
                undefined,
                [],
                '',
                -1, -Infinity, 0, 0, 1, Infinity,
                {},
                'a', 'aa',
                false, false, null, null, true, true
            ].sort();
            options.data = options.data.sort(local.sortCompare);
            local.utility2.assertJsonEqual(options.data.slice(0, -3), [
                null, null,
                false, false, true, true,
                -Infinity, -1, 0, 0, 1, Infinity,
                '', 'a', 'aa'
            ]);
            options.data = options.data.reverse().sort(local.sortCompare);
            local.utility2.assertJsonEqual(options.data.slice(0, -3), [
                null, null,
                false, false, true, true,
                -Infinity, -1, 0, 0, 1, Infinity,
                '', 'a', 'aa'
            ]);
            // coverage-hack
            options.data.forEach(function (aa) {
                [{}, null, local.global.Symbol()].forEach(function (bb) {
                    local.sortCompare(aa, bb);
                    local.sortCompare(bb, aa);
                });
            });
            onError();
        };

        local.testCase_storageXxx_misc = function (options, onError) {
        /*
         * this function will test storageXxx's misc handling-behavior
         */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test storageInit's init handling-behavior
            local.storageInit();
            // test storageInit's re-init handling-behavior
            local.storageInit();
            // test crud handling-behavior
            onParallel.counter += 1;
            local.storageClear(onParallel);
            onParallel.counter += 1;
            local.storageGetItem('undefined', onParallel);
            onParallel.counter += 1;
            local.storageKeys(onParallel);
            onParallel.counter += 1;
            local.storageLength(onParallel);
            onParallel.counter += 1;
            local.storageRemoveItem('undefined', onParallel);
            onParallel.counter += 1;
            local.storageSetItem('undefined', 'undefined', onParallel);
            onParallel.counter += 1;
            local.storageKeys(function () {
                if (local.modeJs === 'browser') {
                    // test indexedDB's onupgradeneeded handling-behavior
                    local._debugStorageRequestIndexedDB.onupgradeneeded();
                }
                onParallel();
            });
            onParallel();
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
                        'db-lite._DbTable.prototype': {
                            exampleList: [],
                            exports: local._DbTable.prototype
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
