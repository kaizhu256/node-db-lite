/*jslint
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



    // run node js-env code - pre-init
    (function () {
        // init local
        local = { global: global, modeJs: 'node' };
    }());



    // run node js-env code - function
    (function () {
        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's asset handling-behavior
         */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/nedb-lite.js',
                url: '/nedb-lite.js'
            }, {
                file: '/nedb-lite.min.js',
                transform: function (data) {
                    return local.utility2.uglify(data.toString());
                },
                url: '/nedb-lite.js'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.fs.readFile(__dirname + options.url, function (error, data) {
                    // validate no error occurred
                    onParallel.counter += 1;
                    onParallel(error);
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        (options.transform || local.utility2.echo)(data),
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
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {};
                        options.example = [
                            'README.md',
                            'test.js',
                            'nedb-lite.js'
                        ].map(function (file) {
                            return '\n\n\n\n\n\n\n\n' +
                                local.fs.readFileSync(file, 'utf8') +
                                '\n\n\n\n\n\n\n\n';
                        }).join('');
                        options.moduleDict = {
                            Nedb: {
                                aliasList: [],
                                exports: local.nedb
                            },
                            'Nedb.prototype': {
                                aliasList: ['self', 'this'],
                                exports: local.nedb.prototype
                            },
                            'Nedb.storage': {
                                aliasList: [],
                                exports: local.nedb.storage
                            }
                        };
                        // create doc.api.html
                        local.utility2.fsWriteFileWithMkdirp(
                            local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                            local.utility2.docApiCreate(options),
                            onNext
                        );
                        break;
                    case 2:
                        local.utility2.browserTest({
                            modeBrowserTest: 'screenCapture',
                            url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                                '/doc.api.html'
                        }, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };
    }());



    // run node js-env code - post-init
    (function () {
        // require modules
        local.fs = require('fs');
        local.nedb = require('./nedb-lite.js');
        local.path = require('path');
        local.utility2 = require('utility2');
        // run server-test
        local.utility2.testRun(local);
        // debug dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint file
                    local.utility2.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart();
    }());
}());
