nedb-lite
=========
this package will run a standalone, browser-compatible version of the nedb v1.8.0 database with zero npm-dependencies

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-nedb-lite.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)

[![NPM](https://nodei.co/npm/nedb-lite.png?downloads=true)](https://www.npmjs.com/package/nedb-lite)

[![package-listing](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-nedb-lite)



# live demo
- [https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.githubDeploy.browser._2Fnode-nedb-lite_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/app/index.html)



# documentation
#### todo
- none

#### change since c6fd675c
- npm publish 2016.9.1
- make db always persistent
- removed support for native-datetime (automatically converted to iso-string)
- tables automatically includes createdAt and updatedAt fields
- remove async dependency
- remove localForage dependency
- remove underscore dependency
- remove util dependency
- none

#### this package requires
- darwin or linux os

#### additional info
- nedb derived from https://github.com/louischatriot/nedb/blob/cadf4ef434e517e47c4e9ca1db5b89e892ff5981/browser-version/out/nedb.js

#### differences from original nedb @ https://github.com/louischatriot/nedb
- shared js-env - removed options afterSerialization, beforeSerialization, corruptAlertThreshold, inMemoryOnly
- shared js-env - removed support for native-datetime (automatically converted to iso-string)
- shared js-env - removed support for promises (callbacks only)
- shared js-env - tables always have the timestamp-fields createdAt and updatedAt
- browser js-env - removed support for persistence in localStorage and web-sql (persistence requires indexedDB)
- node js-env - removed support for ms-windows platform

#### api-doc
- [https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-nedb-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-nedb-lite.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)
[![build commit status](https://kaizhu256.github.io/node-nedb-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-nedb-lite/tree/master) | [beta](https://github.com/kaizhu256/node-nedb-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-nedb-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server-1 : | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/app/index.html)|
| test-server-2 : | [![heroku.com test-server](https://kaizhu256.github.io/node-nedb-lite/heroku-logo.75x25.png)](https://hrku01-nedb-lite-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-nedb-lite/heroku-logo.75x25.png)](https://hrku01-nedb-lite-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-nedb-lite/heroku-logo.75x25.png)](https://hrku01-nedb-lite-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul coverage](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-nedb-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-nedb-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-nedb-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-nedb-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-nedb-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-nedb-lite/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart web example
![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-nedb-lite/build/example.js)
```javascript
/*
example.js

this script will will demo the browser-version of nedb

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install nedb-lite && export PORT=8081 && node example.js
    3. open a browser to http://localhost:8081
    4. edit or paste script in browser to eval
*/

/* istanbul instrument in package nedb-lite */
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
        /* istanbul ignore next */
        // re-init local
        local = local.modeJs === 'browser'
            ? window.Nedb.local
            : module.isRollup
            ? module
            : require('nedb-lite').local;
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // export local
        local.global.local = local;
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        ['error', 'log'].forEach(function (key) {
            console['_' + key] = console[key];
            console[key] = function () {
                console['_' + key].apply(console, arguments);
                document.querySelector('#outputTextarea1').value +=
                    Array.prototype.slice.call(arguments).map(function (arg) {
                        return typeof arg === 'string'
                            ? arg
                            : local.Nedb.jsonStringifyOrdered(arg, null, 4);
                    }).join(' ') + '\n';
            };
        });
        /* istanbul ignore next */
        local.testRun = function (event) {
            var reader, tmp;
            switch (event && event.currentTarget.id) {
            case 'nedbExportButton1':
                tmp = window.URL.createObjectURL(new window.Blob([local.Nedb.dbExport()]));
                document.querySelector('#nedbExportA1').href = tmp;
                document.querySelector('#nedbExportA1').click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(tmp);
                }, 30000);
                break;
            case 'nedbImportButton1':
                document.querySelector('#nedbImportInput1').click();
                break;
            case 'nedbImportInput1':
                document.querySelector('#outputTextarea1').value = '';
                console.log('importing nedb-database ...');
                reader = new window.FileReader();
                tmp = document.querySelector('#nedbImportInput1').files[0];
                if (!tmp) {
                    return;
                }
                reader.addEventListener('load', function () {
                    local.Nedb.dbImport(reader.result, function () {
                        console.log('... imported nedb-database');
                    });
                });
                reader.readAsText(tmp);
                break;
            case 'nedbResetButton1':
                document.querySelector('#outputTextarea1').value = '';
                console.log('resetting nedb-database ...');
                local.Nedb.dbReset(function () {
                    console.log('... resetted nedb-database');
                });
                break;
            case 'testRunButton1':
                local.modeTest = true;
                local.utility2.testRun(local);
                break;
            default:
                document.querySelector('#outputTextarea1').value = '';
                try {
                    /*jslint evil: true*/
                    eval(document.querySelector('#inputTextarea1').value);
                } catch (errorCaught) {
                    document.querySelector('#outputTextarea1').value = errorCaught.stack;
                }
            }
        };
        // init event-handling
        ['change', 'click', 'keyup'].forEach(function (event) {
            Array.prototype.slice.call(
                document.querySelectorAll('.on' + event)
            ).forEach(function (element) {
                element.addEventListener(event, local.testRun);
            });
        });
        // run tests
        local.testRun();
        break;



    /* istanbul ignore next */
    // run node js-env code - post-init
    case 'node':
        // export local
        module.exports = local;
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.path = require('path');
        local.url = require('url');
        // init assets
        /* jslint-ignore-begin */
        local.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<title>\n\
{{envDict.npm_package_name}} v{{envDict.npm_package_version}}\n\
</title>\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    ids: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background-color: #fff;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
body > button {\n\
    width: 15rem;\n\
}\n\
textarea {\n\
    font-family: monospace;\n\
    height: 16rem;\n\
    width: 100%;\n\
}\n\
textarea[readonly] {\n\
    background-color: #ddd;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
    <h1>\n\
<!-- utility2-comment\n\
        <a\n\
            {{#if envDict.npm_package_homepage}}\n\
            href="{{envDict.npm_package_homepage}}"\n\
            {{/if envDict.npm_package_homepage}}\n\
            target="_blank"\n\
        >\n\
utility2-comment -->\n\
            {{envDict.npm_package_name}} v{{envDict.npm_package_version}}\n\
<!-- utility2-comment\n\
        </a>\n\
utility2-comment -->\n\
<!-- utility2-comment\n\
        {{#if envDict.NODE_ENV}}\n\
        (NODE_ENV={{envDict.NODE_ENV}})\n\
        {{/if envDict.NODE_ENV}}\n\
utility2-comment -->\n\
    </h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
    <h4><a download href="assets.app.js">download standalone app</a></h4>\n\
    <button class="onclick" id="testRunButton1">run internal test</button><br>\n\
    <div class="testReportDiv" style="display: none;"></div>\n\
utility2-comment -->\n\
\n\
    <button class="onclick" id="nedbResetButton1">reset nedb-database</button><br>\n\
    <button class="onclick" id="nedbExportButton1">save nedb-database to file</button><br>\n\
    <a download="nedb.persistence.json" href="" id="nedbExportA1"></a>\n\
    <button class="onclick" id="nedbImportButton1">load nedb-database from file</button><br>\n\
    <input class="onchange zeroPixel" type="file" id="nedbImportInput1">\n\
    <label>edit or paste script below to\n\
        <a\n\
            href="https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html"\n\
            target="_blank"\n\
        >eval</a>\n\
    </label>\n\
<textarea class="onkeyup" id="inputTextarea1">\n\
window.table1 = window.Nedb.dbTableCreate({ name: "table1" });\n\
table1.insert({ field1: "hello", field2: "world"}, function () {\n\
    console.log();\n\
    console.log(table1.export());\n\
});\n\
\n\
window.table2 = window.Nedb.dbTableCreate({ name: "table2" });\n\
table2.insert({ field1: "hello", field2: "world"}, function () {\n\
    console.log();\n\
    console.log(table2.export());\n\
});\n\
</textarea>\n\
    <label>stderr and stdout</label>\n\
    <textarea id="outputTextarea1" readonly></textarea>\n\
<!-- utility2-comment\n\
    {{#if isRollup}}\n\
    <script src="assets.app.min.js"></script>\n\
    {{#unless isRollup}}\n\
utility2-comment -->\n\
    <script src="assets.utility2.rollup.js"></script>\n\
    <script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
    <script src="assets.nedb-lite.js"></script>\n\
    <script src="assets.example.js"></script>\n\
    <script src="assets.test.js"></script>\n\
<!-- utility2-comment\n\
    {{/if isRollup}}\n\
utility2-comment -->\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        local['/'] = local.templateIndexHtml
            .replace((/\{\{envDict\.(\w+?)\}\}/g), function (match0, match1) {
                // jslint-hack
                String(match0);
                switch (match1) {
                case 'npm_package_description':
                    return 'example module';
                case 'npm_package_name':
                    return 'example';
                case 'npm_package_version':
                    return '0.0.1';
                }
            });
        if (module.isRollup) {
            break;
        }
        try {
            local['/assets.example.js'] = local.fs.readFileSync(__filename, 'utf8');
        } catch (ignore) {
        }
        local['/assets.nedb-lite.js'] = local.fs.readFileSync(
            local.Nedb.__dirname + '/index.js',
            'utf8'
        );
        // run the cli
        if (module !== require.main) {
            break;
        }
        // start server
        console.log('server starting on port ' + process.env.PORT);
        local.http.createServer(function (request, response) {
            switch (local.url.parse(request.url).pathname) {
            case '/':
            case '/assets.example.js':
            case '/assets.nedb-lite.js':
            case '/assets.test.js':
                response.end(local[local.url.parse(request.url).pathname]);
                break;
            default:
                response.end();
            }
        }).listen(process.env.PORT);
        // if $npm_config_timeout_exit is defined,
        // then exit this process after $npm_config_timeout_exit ms
        if (Number(process.env.npm_config_timeout_exit)) {
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
        }
        break;
    }
}());
```

#### output from electron
![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.testExampleJs.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.testExampleJs.svg)



# package.json
```json
{
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "{{packageJson.description}}",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": { "node": ">=4.2" },
    "homepage": "https://github.com/kaizhu256/node-nedb-lite",
    "keywords": [
        "browser",
        "db",
        "indexeddb",
        "localstorage",
        "mongo", "mongodb",
        "nedb", "no-sql", "nosql",
        "persistence", "persistent",
        "web", "web-sql", "websql"
    ],
    "license": "MIT",
    "name": "nedb-lite",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-nedb-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "start": "\
export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover test.js",
        "test": "export PORT=$(utility2 shServerPortRandom) && utility2 test test.js"
    },
    "version": "2016.9.1"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-nedb-lite/commits)



# internal build-script
- build.sh
```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    # test example.js
    (export MODE_BUILD=testExampleJs &&
        shRunScreenCapture shReadmeTestJs example.js) || return $?
    # test published-package
    (export MODE_BUILD=npmTestPublished &&
        shRunScreenCapture shNpmTestPublished) || return $?
    # coverage-hack - reset mock persistence
    mkdir -p tmp/nedb.persistence.test
    touch tmp/nedb.persistence.test/undefined
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then return
    [ "$(node --version)" \< "v5.0" ] && return || true
    export NODE_ENV=production
    # deploy app to gh-pages
    export TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    (export MODE_BUILD=githubDeploy &&
        shGithubDeploy) || return $?
    # test deployed app to gh-pages
    (export MODE_BUILD=githubTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=1&timeExit={{timeExit}}" &&
        shBrowserTest) || return $?
    # deploy app to heroku
    export HEROKU_REPO="hrku01-$npm_package_name-$CI_BRANCH"
    export TEST_URL="https://$HEROKU_REPO.herokuapp.com"
    shGitRepoBranchUpdateLocal() {(set -e
    # this function will local-update git-repo-branch
        cp "$npm_config_dir_build/app/assets.app.js" .
        printf "web: npm_config_mode_backend=1 node assets.app.js" > Procfile
    )}
    (export MODE_BUILD=herokuDeploy &&
        shHerokuDeploy) || return $?
    # test deployed app to heroku
    (export MODE_BUILD=herokuTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=1&timeExit={{timeExit}}" &&
        shBrowserTest) || return $?
)}

shBuild() {(set -e
# this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # if branch is alpha, beta, or master, then run default build
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        shBuildCiDefault
    fi
)}
shBuild
```
