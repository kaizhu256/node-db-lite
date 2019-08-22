/*
example.js

this script will run a web-demo of db-lite

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install db-lite && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo
    4. edit this script to suit your needs
*/



/* istanbul instrument in package db */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
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
        // init utility2_rollup
        local = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? local.global.utility2_db
            : require('db-lite'));
        // init exports
        local.global.local = local;
        // load db
        local.db.dbLoad(function () {
            console.log('db loaded from ' + local.storageDir);
        });
    }());
    switch (local.modeJs) {



    // run browser js-env code - init-test
    /* istanbul ignore next */
    case 'browser':
        local.testRunBrowser = function (event) {
            var reader, tmp;
            if (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('onreset'))) {
                // reset output
                Array.from(
                    document.querySelectorAll('body > .resettable')
                ).forEach(function (element) {
                    switch (element.tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        element.value = '';
                        break;
                    default:
                        element.textContent = '';
                    }
                });
            }
            switch (event && event.currentTarget && event.currentTarget.id) {
            case 'testRunButton1':
                // show tests
                if (document.querySelector('#testReportDiv1').style.maxHeight === '0px') {
                    local.uiAnimateSlideDown(document.querySelector('#testReportDiv1'));
                    document.querySelector('#testRunButton1').textContent = 'hide internal test';
                    local.modeTest = true;
                    local.testRunDefault(local);
                // hide tests
                } else {
                    local.uiAnimateSlideUp(document.querySelector('#testReportDiv1'));
                    document.querySelector('#testRunButton1').textContent = 'run internal test';
                }
                break;
            // custom-case
            case 'dbExportButton1':
                tmp = window.URL.createObjectURL(new window.Blob([local.db.dbExport()]));
                document.querySelector('#dbExportA1').href = tmp;
                document.querySelector('#dbExportA1').click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(tmp);
                }, 30000);
                break;
            case 'dbImportButton1':
                document.querySelector('#dbImportInput1').click();
                break;
            case 'dbImportInput1':
                console.log('importing db-lite database ...');
                reader = new window.FileReader();
                tmp = document.querySelector('#dbImportInput1').files[0];
                if (!tmp) {
                    return;
                }
                reader.addEventListener('load', function () {
                    local.db.dbImport(reader.result);
                    console.log('... imported db-lite database');
                });
                reader.readAsText(tmp);
                break;
            case 'dbResetButton1':
                console.log('resetting db-lite database ...');
                local.db.dbDrop(function () {
                    console.log('... resetted db-lite database');
                });
                break;
            }
            if (document.querySelector('#inputTextareaEval1') && (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('oneval')))) {
                // try to eval input-code
                try {
                    /*jslint evil: true*/
                    eval(document.querySelector('#inputTextareaEval1').value);
                } catch (errorCaught) {
                    console.error(errorCaught);
                }
            }
        };
        // log stderr and stdout to #outputTextareaStdout1
        ['error', 'log'].forEach(function (key) {
            console[key + '_original'] = console[key];
            console[key] = function () {
                var element;
                console[key + '_original'].apply(console, arguments);
                element = document.querySelector('#outputTextareaStdout1');
                if (!element) {
                    return;
                }
                // append text to #outputTextareaStdout1
                element.value += Array.from(arguments).map(function (arg) {
                    return typeof arg === 'string'
                        ? arg
                        : JSON.stringify(arg, null, 4);
                }).join(' ') + '\n';
                // scroll textarea to bottom
                element.scrollTop = element.scrollHeight;
            };
        });
        // init event-handling
        ['change', 'click', 'keyup'].forEach(function (event) {
            Array.from(document.querySelectorAll('.on' + event)).forEach(function (element) {
                element.addEventListener(event, local.testRunBrowser);
            });
        });
        // run tests
        local.testRunBrowser();
        break;



    // run node js-env code - init-test
    /* istanbul ignore next */
    case 'node':
        // init exports
        module.exports = local;
        // require builtins
        // local.assert = require('assert');
        local.buffer = require('buffer');
        local.child_process = require('child_process');
        local.cluster = require('cluster');
        local.console = require('console');
        local.constants = require('constants');
        local.crypto = require('crypto');
        local.dgram = require('dgram');
        local.dns = require('dns');
        local.domain = require('domain');
        local.events = require('events');
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.module = require('module');
        local.net = require('net');
        local.os = require('os');
        local.path = require('path');
        local.process = require('process');
        local.punycode = require('punycode');
        local.querystring = require('querystring');
        local.readline = require('readline');
        local.repl = require('repl');
        local.stream = require('stream');
        local.string_decoder = require('string_decoder');
        local.timers = require('timers');
        local.tls = require('tls');
        local.tty = require('tty');
        local.url = require('url');
        local.util = require('util');
        local.v8 = require('v8');
        local.vm = require('vm');
        local.zlib = require('zlib');
/* validateLineSortedReset */
        // init assets
        local.assetsDict = local.assetsDict || {};
        /* jslint-ignore-begin */
        local.assetsDict['/assets.index.template.html'] = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<!-- "assets.index.default.template.html" -->\n<title>{{env.npm_package_name}} (v{{env.npm_package_version}})</title>\n<style>\n/* jslint-utility2 */\n/*csslint\n*/\n/* jslint-ignore-begin */\n*,\n*:after,\n*:before {\n    box-sizing: border-box;\n}\n/* jslint-ignore-end */\n@keyframes uiAnimateShake {\n    0%, 50% {\n        transform: translateX(10px);\n    }\n    25%, 75% {\n        transform: translateX(-10px);\n    }\n    100% {\n        transform: translateX(0);\n    }\n}\n@keyframes uiAnimateSpin {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\na {\n    overflow-wrap: break-word;\n}\nbody > div,\nbody > pre,\nbody > textarea,\nbody > .button {\n    margin-bottom: 20px;\n}\nbody > textarea {\n    height: 10rem;\n    width: 100%;\n}\nbody > textarea[readonly] {\n    background: #ddd;\n}\nbody > .button {\n    width: 20rem;\n}\ncode,\npre,\ntextarea {\n    font-family: Consolas, Menlo, monospace;\n    font-size: small;\n}\npre {\n    overflow-wrap: break-word;\n    white-space: pre-wrap;\n}\ntextarea {\n    overflow: auto;\n    white-space: pre;\n}\n.button {\n    background-color: #fff;\n    border: 1px solid;\n    border-bottom-color: rgb(186, 186, 186);\n    border-left-color: rgb(209, 209, 209);\n    border-radius: 4px;\n    border-right-color: rgb(209, 209, 209);\n    border-top-color: rgb(216, 216, 216);\n    color: #00d;\n    cursor: pointer;\n    display: inline-block;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: normal;\n    margin: 0;\n    padding: 2px 7px 3px 7px;\n    text-align: center;\n    text-decoration: underline;\n}\n.colorError {\n    color: #d00;\n}\n.uiAnimateShake {\n    animation-duration: 500ms;\n    animation-name: uiAnimateShake;\n}\n.uiAnimateSlide {\n    overflow-y: hidden;\n    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n}\n.utility2FooterDiv {\n    text-align: center;\n}\n.zeroPixel {\n    border: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    width: 0;\n}\n</style>\n</head>\n<body style="background: #eef; font-family: Arial, Helvetica, sans-serif; margin: 0 40px;">\n<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%; z-index: 1;"></div>\n<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n<code style="display: none;"></code><div class="button uiAnimateShake uiAnimateSlide utility2FooterDiv zeroPixel" style="display: none;"></div><pre style="display: none;"></pre><textarea readonly style="display: none;"></textarea>\n<script>\n/* jslint-utility2 */\n/*jslint\n    bitwise: true,\n    browser: true,\n    maxerr: 4,\n    maxlen: 100,\n    node: true,\n    nomen: true,\n    regexp: true,\n    stupid: true\n*/\n(function () {\n    "use strict";\n    var ajaxProgressDiv1,\n        ajaxProgressState,\n        ajaxProgressUpdate,\n        timerIntervalAjaxProgressUpdate;\n    ajaxProgressDiv1 = document.querySelector("#ajaxProgressDiv1");\n    setTimeout(function () {\n        ajaxProgressDiv1.style.width = "25%";\n    });\n    ajaxProgressState = 0;\n    ajaxProgressUpdate = (window.local &&\n        window.local.ajaxProgressUpdate) || function () {\n        ajaxProgressDiv1.style.width = "100%";\n        setTimeout(function () {\n            ajaxProgressDiv1.style.background = "transparent";\n            setTimeout(function () {\n                ajaxProgressDiv1.style.width = "0%";\n            }, 500);\n        }, 1500);\n    };\n    timerIntervalAjaxProgressUpdate = setInterval(function () {\n        ajaxProgressState += 1;\n        ajaxProgressDiv1.style.width = Math.max(\n            100 - 75 * Math.exp(-0.125 * ajaxProgressState),\n            Number(ajaxProgressDiv1.style.width.slice(0, -1)) || 0\n        ) + "%";\n    }, 1000);\n    window.addEventListener("load", function () {\n        clearInterval(timerIntervalAjaxProgressUpdate);\n        ajaxProgressUpdate();\n    });\n}());\n</script>\n<h1>\n<!-- utility2-comment\n    <a\n        {{#if env.npm_package_homepage}}\n        href="{{env.npm_package_homepage}}"\n        {{/if env.npm_package_homepage}}\n        target="_blank"\n    >\nutility2-comment -->\n        {{env.npm_package_name}} (v{{env.npm_package_version}})\n<!-- utility2-comment\n    </a>\nutility2-comment -->\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<!-- utility2-comment\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button onclick onreset" id="testRunButton1">run internal test</button><br>\n<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\nutility2-comment -->\n\n\n\n<button class="button onclick onreset" id="dbResetButton1">reset database</button><br>\n<button class="button onclick" id="dbExportButton1">export database -&gt; file</button><br>\n<a download="db.persistence.json" href="" id="dbExportA1"></a>\n<button class="button onclick" id="dbImportButton1">import database &lt;- file</button><br>\n<input class="onchange onreset zeroPixel" type="file" id="dbImportInput1">\n<label>edit or paste script below to\n    <a\n        href="https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html"\n        target="_blank"\n    >eval</a>\n</label>\n<textarea id="inputTextareaEval1">\n/*jslint browser: true, node: true*/\n"use strict";\nvar dbTable1, modeNext, onNext;\nmodeNext = 0;\nonNext = function (error, data) {\n    modeNext = error\n        ? Infinity\n        : modeNext + 1;\n    switch (modeNext) {\n    case 1:\n        dbTable1 = window.dbTable1 = window.utility2_db.dbTableCreateOne({\n            name: "dbTable1"\n        }, onNext);\n        break;\n    case 2:\n        dbTable1.idIndexCreate({ name: "field1" }, onNext);\n        break;\n    case 3:\n        dbTable1.crudSetOneById({ field1: "aa", field2: 1, field3: "foo" }, onNext);\n        break;\n    case 4:\n        dbTable1.crudSetOneById({ field1: "bb", field2: 2, field3: "bar" }, onNext);\n        break;\n    case 5:\n        dbTable1.crudSetOneById({ field1: "cc", field2: 3, field3: "baz" }, onNext);\n        break;\n    case 6:\n        dbTable1.crudRemoveOneById({ field1: "aa" }, onNext);\n        break;\n    case 7:\n        dbTable1.crudUpdateOneById({ field1: "bb", field2: -1 }, onNext);\n        break;\n    case 8:\n        dbTable1.crudSetOneById({ field2: Math.random() }, onNext);\n        break;\n    case 9:\n        dbTable1.crudGetManyByQuery({\n            limit: Infinity,\n            query: { field2: { $gte: -Infinity, $lte: Infinity } },\n            skip: 0,\n            sort: [{ fieldName: "_timeUpdated", idDescending: true }]\n        }, onNext);\n        break;\n    case 10:\n        console.log(data);\n        dbTable1.crudCountAll(onNext);\n        break;\n    case 11:\n        console.log("number of rows: " + data);\n        break;\n    default:\n        console.error(error.stack);\n    }\n};\nonNext();\n</textarea>\n<button class="button onclick oneval onreset" id="dbEvalButton1">eval script</button><br>\n<label>stderr and stdout</label>\n<textarea class="resettable" id="outputTextareaStdout1" readonly></textarea>\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\nutility2-comment -->\n<script src="assets.utility2.rollup.js"></script>\n<script>window.utility2.onResetBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n<script src="assets.db.js"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>window.utility2.onResetBefore();</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n<div class="utility2FooterDiv">\n    [ this app was created with\n    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n    ]\n</div>\n</body>\n</html>\n';
























































































































































































































































































        /* jslint-ignore-end */
        [
            'assets.index.css',
            'assets.index.template.html',
            'assets.swgg.swagger.json',
            'assets.swgg.swagger.server.json'
        ].forEach(function (file) {
            file = '/' + file;
            local.assetsDict[file] = local.assetsDict[file] || '';
            if (local.fs.existsSync(local.__dirname + file)) {
                local.assetsDict[file] = local.fs.readFileSync(
                    local.__dirname + file,
                    'utf8'
                );
            }
        });
/* validateLineSortedReset */
        // bug-workaround - long $npm_package_buildCustomOrg
        /* jslint-ignore-begin */
        local.assetsDict['/assets.db.js'] = local.assetsDict['/assets.db.js'] ||
            local.fs.readFileSync(local.__dirname + '/lib.db.js', 'utf8'
        ).replace((/^#!/), '//');
/* validateLineSortedReset */
        local.assetsDict['/'] =
            local.assetsDict['/assets.example.html'] =
            local.assetsDict['/assets.index.template.html']
            .replace((/\{\{env\.(\w+?)\}\}/g), function (match0, match1) {
                switch (match1) {
                case 'npm_package_description':
                    return 'the greatest app in the world!';
                case 'npm_package_name':
                    return 'db-lite';
                case 'npm_package_nameLib':
                    return 'db';
                case 'npm_package_version':
                    return '0.0.1';
                default:
                    return match0;
                }
            });
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        local.assetsDict['/assets.example.js'] =
            local.assetsDict['/assets.example.js'] ||
            local.fs.readFileSync(__filename, 'utf8');
        /* jslint-ignore-end */
        local.assetsDict['/favicon.ico'] = local.assetsDict['/favicon.ico'] || '';
        // if $npm_config_timeout_exit exists,
        // then exit this process after $npm_config_timeout_exit ms
        if (Number(process.env.npm_config_timeout_exit)) {
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
        }
        // start server
        if (local.global.utility2_serverHttp1) {
            break;
        }
        process.env.PORT = process.env.PORT || '8081';
        console.error('server starting on port ' + process.env.PORT);
        local.http.createServer(function (request, response) {
            request.urlParsed = local.url.parse(request.url);
            if (local.assetsDict[request.urlParsed.pathname] !== undefined) {
                response.end(local.assetsDict[request.urlParsed.pathname]);
                return;
            }
            response.statusCode = 404;
            response.end();
        }).listen(process.env.PORT);
        break;
    }
}());
