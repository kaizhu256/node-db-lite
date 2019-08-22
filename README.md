# db-lite
this zero-dependency package will provide a persistent, in-browser database, with a working web-demo

# live web demo
- [https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app)

[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app)



[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-db-lite.svg)](https://travis-ci.org/kaizhu256/node-db-lite) [![coverage](https://kaizhu256.github.io/node-db-lite/build/coverage.badge.svg)](https://kaizhu256.github.io/node-db-lite/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/db-lite.png?downloads=true)](https://www.npmjs.com/package/db-lite)

[![build commit status](https://kaizhu256.github.io/node-db-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-db-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-db-lite/tree/master) | [beta](https://github.com/kaizhu256/node-db-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-db-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-db-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-db-lite/build..master..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-db-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-db-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-db-lite/build..alpha..travis-ci.org/app)|
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-db-lite/heroku-logo.75x25.png)](https://h1-db-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-db-lite/heroku-logo.75x25.png)](https://h1-db-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-db-lite/heroku-logo.75x25.png)](https://h1-db-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-db-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-db-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-db-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-db-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-db-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-db-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-db-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-db-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-db-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-db-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-db-lite/tree/gh-pages/build..alpha..travis-ci.org)|

[![npmPackageListing](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-db-lite)

![npmPackageDependencyTree](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmPackageDependencyTree.svg)



# table of contents
1. [cdn download](#cdn-download)
1. [documentation](#documentation)
1. [quickstart standalone app](#quickstart-standalone-app)
1. [quickstart example.js](#quickstart-examplejs)
1. [extra screenshots](#extra-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)



# cdn download
- [https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app/assets.db.js](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app/assets.db.js)



# documentation
#### cli help
![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmPackageCliHelp.svg)

#### api doc
- [https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html)

#### todo
- fix IndexedDB in edge
- deprecate and remove unnecessary stable-sort
- none

#### changelog 2019.8.20
- npm publish 2019.8.20
- fix demo
- jslint - remove allow-method-chain-newline hack
- jslint - refactor files to 80 chr column-limit
- rename var request to req, response to res, local.errorDefault to local.errDefault, error to err, option to opt, event to evt, nextMiddleware to next
- revamp ui event-handling with window.domOnEventDelegateDict
- update build
- none

#### this package requires
- darwin or linux os



# quickstart standalone app
#### to run this example, follow instruction in script below
- [assets.app.js](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app/assets.app.js)
```shell
# example.sh

# this shell script will download and run a web-demo of db-lite as a standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/app/assets.app.js
# 2. run standalone app
PORT=8081 node ./assets.app.js
# 3. open a browser to http://127.0.0.1:8081 and play with web-demo
# 4. edit file assets.app.js to suit your needs
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.svg)



# quickstart example.js
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/app/assets.example.html)

#### to run this example, follow instruction in script below
- [example.js](https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/example.js)
```javascript
/*
example.js

this script will run a web-demo of db-lite

instruction
    1. save this script as example.js
    2. run shell-command:
        $ npm install db-lite && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with web-demo
    4. edit this script to suit your needs
*/



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
    globalThis.utility2_rollup
    || globalThis.utility2_db
    || require("db-lite")
);
// init exports
globalThis.local = local;
}());



/* istanbul ignore next */
// run browser js-env code - init-test
(function () {
if (!local.isBrowser) {
    return;
}
// log stderr and stdout to #outputStdout1
["error", "log"].forEach(function (key) {
    var argList;
    var elem;
    var fnc;
    elem = document.querySelector(
        "#outputStdout1"
    );
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function () {
        argList = Array.from(arguments); // jslint ignore:line
        fnc.apply(console, argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, null, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
local.onEventDomDb = local.db && local.db.onEventDomDb;
local.testRunBrowser = function (evt) {
/*
 * this function will run browser-tests
 */
    switch (
        !evt.ctrlKey
        && !evt.metaKey
        && (
            evt.modeInit
            || (evt.type + "." + (evt.target && evt.target.id))
        )
    ) {
    // custom-case
    case "dbExportButton1":
    case "dbImportButton1":
    case "dbImportInput1":
    case "dbResetButton1":
        local.db.onEventDomDb(event);
        break;
    case "click.buttonEval1":
    case true:
        // try to eval input-code
        globalThis.domOnEventDelegateDict.domOnEventResetOutput();
        try {
            eval( // jslint ignore:line
                document.querySelector("#inputTextarea1").value
            );
        } catch (errCaught) {
            console.error(errCaught);
        }
        break;
    // run browser-tests
    default:
        if (
            (evt.target && evt.target.id) !== "testRunButton1"
            && !(evt.modeInit && (
                /\bmodeTest=1\b/
            ).test(location.search))
        ) {
            return;
        }
        // show browser-tests
        if (document.querySelector(
            "#testReportDiv1"
        ).style.maxHeight === "0px") {
            globalThis.domOnEventDelegateDict.domOnEventResetOutput();
            local.uiAnimateSlideDown(document.querySelector(
                "#testReportDiv1"
            ));
            document.querySelector(
                "#testRunButton1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
            return;
        }
        // hide browser-tests
        local.uiAnimateSlideUp(document.querySelector(
            "#testReportDiv1"
        ));
        document.querySelector(
            "#testRunButton1"
        ).textContent = "run internal test";
    }
};

local.testRunBrowser({
    modeInit: true
});
}());



/* istanbul ignore next */
// run node js-env code - init-test
(function () {
if (local.isBrowser) {
    return;
}
// init exports
module.exports = local;
/* validateLineSortedReset */
// init assets
local.assetsDict = local.assetsDict || {};
[
    "assets.index.template.html",
    "assets.swgg.swagger.json",
    "assets.swgg.swagger.server.json"
].forEach(function (file) {
    file = "/" + file;
    local.assetsDict[file] = local.assetsDict[file] || "";
    if (local.fs.existsSync(local.__dirname + file)) {
        local.assetsDict[file] = local.fs.readFileSync(
            local.__dirname + file,
            "utf8"
        );
    }
});
/* jslint ignore:start */
local.assetsDict["/assets.index.template.html"] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="utf-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<!-- "assets.utility2.template.html" -->\n\
<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n\
<style>\n\
/* jslint utility2:true */\n\
/*csslint\n\
*/\n\
/* csslint ignore:start */\n\
*,\n\
*:after,\n\
*:before {\n\
    box-sizing: border-box;\n\
}\n\
/* csslint ignore:end */\n\
@keyframes uiAnimateShake {\n\
0%,\n\
50% {\n\
    transform: translateX(10px);\n\
}\n\
100% {\n\
    transform: translateX(0);\n\
}\n\
25%,\n\
75% {\n\
    transform: translateX(-10px);\n\
}\n\
}\n\
@keyframes uiAnimateSpin {\n\
0% {\n\
    transform: rotate(0deg);\n\
}\n\
100% {\n\
    transform: rotate(360deg);\n\
}\n\
}\n\
a {\n\
    overflow-wrap: break-word;\n\
}\n\
body {\n\
    background: #eef;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    font-size: small;\n\
    margin: 0 40px;\n\
}\n\
body > div,\n\
body > form > div,\n\
body > form > input,\n\
body > form > pre,\n\
body > form > .button,\n\
body > form > .textarea,\n\
body > input,\n\
body > pre,\n\
body > .button,\n\
body > .textarea {\n\
    margin-bottom: 20px;\n\
    margin-top: 0;\n\
}\n\
body > form > input,\n\
body > form > .button,\n\
body > input,\n\
body > .button {\n\
    width: 20rem;\n\
}\n\
body > form > .textarea,\n\
body > .textarea {\n\
    height: 10rem;\n\
    width: 100%;\n\
}\n\
body > .readonly {\n\
    background: #ddd;\n\
}\n\
code,\n\
pre,\n\
.textarea {\n\
    font-family: Consolas, Menlo, monospace;\n\
    font-size: smaller;\n\
}\n\
pre {\n\
    overflow-wrap: break-word;\n\
    white-space: pre-wrap;\n\
}\n\
.button {\n\
    background: #ddd;\n\
    border: 1px solid #999;\n\
    color: #000;\n\
    cursor: pointer;\n\
    display: inline-block;\n\
    padding: 2px 5px;\n\
    text-align: center;\n\
    text-decoration: none;\n\
}\n\
.button:hover {\n\
    background: #bbb;\n\
}\n\
.colorError {\n\
    color: #d00;\n\
}\n\
.textarea {\n\
    background: #fff;\n\
    border: 1px solid #999;\n\
    border-radius: 0;\n\
    cursor: auto;\n\
    overflow: auto;\n\
    padding: 2px;\n\
}\n\
.uiAnimateShake {\n\
    animation-duration: 500ms;\n\
    animation-name: uiAnimateShake;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n\
}\n\
.utility2FooterDiv {\n\
    text-align: center;\n\
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
<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%; z-index: 1;"></div>\n\
<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n\
<a class="zeroPixel" download="db.persistence.json" href="" id="dbExportA1"></a>\n\
<input class="zeroPixel" data-onevent="onEventDomDb" data-onevent-db="dbImportInput" type="file">\n\
<script>\n\
/* jslint utility2:true */\n\
// init domOnEventWindowOnloadTimeElapsed\n\
(function () {\n\
/*\n\
 * this function will measure and print time-elapsed for window.onload\n\
 */\n\
    "use strict";\n\
    if (window.domOnEventWindowOnloadTimeElapsed) {\n\
        return;\n\
    }\n\
    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n\
    window.addEventListener("load", function () {\n\
        setTimeout(function () {\n\
            window.domOnEventWindowOnloadTimeElapsed = (\n\
                Date.now()\n\
                - window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
            console.error(\n\
                "domOnEventWindowOnloadTimeElapsed = "\n\
                + window.domOnEventWindowOnloadTimeElapsed\n\
            );\n\
        }, 100);\n\
    });\n\
}());\n\
\n\
\n\
\n\
// init domOnEventDelegateDict\n\
(function () {\n\
/*\n\
 * this function will handle delegated dom-event\n\
 */\n\
    "use strict";\n\
    var timerTimeoutDict;\n\
    if (window.domOnEventDelegateDict) {\n\
        return;\n\
    }\n\
    window.domOnEventDelegateDict = {};\n\
    timerTimeoutDict = {};\n\
    window.domOnEventDelegateDict.domOnEventDelegate = function (evt) {\n\
        evt.targetOnEvent = evt.target.closest(\n\
            "[data-onevent]"\n\
        );\n\
        if (\n\
            !evt.targetOnEvent\n\
            || evt.targetOnEvent.dataset.onevent === "domOnEventNop"\n\
            || evt.target.closest(\n\
                ".disabled, .readonly"\n\
            )\n\
        ) {\n\
            return;\n\
        }\n\
        // rate-limit high-frequency-event\n\
        switch (evt.type) {\n\
        case "keydown":\n\
        case "keyup":\n\
            // filter non-input keyboard-event\n\
            if (!evt.target.closest(\n\
                "input, option, select, textarea"\n\
            )) {\n\
                return;\n\
            }\n\
            if (timerTimeoutDict[evt.type] !== true) {\n\
                timerTimeoutDict[evt.type] = timerTimeoutDict[\n\
                    evt.type\n\
                ] || setTimeout(function () {\n\
                    timerTimeoutDict[evt.type] = true;\n\
                    window.domOnEventDelegateDict.domOnEventDelegate(evt);\n\
                }, 50);\n\
                return;\n\
            }\n\
            timerTimeoutDict[evt.type] = null;\n\
            break;\n\
        }\n\
        switch (evt.targetOnEvent.tagName) {\n\
        case "BUTTON":\n\
        case "FORM":\n\
            evt.preventDefault();\n\
            break;\n\
        }\n\
        evt.stopPropagation();\n\
        window.domOnEventDelegateDict[evt.targetOnEvent.dataset.onevent](\n\
            evt\n\
        );\n\
    };\n\
    window.domOnEventDelegateDict.domOnEventResetOutput = function () {\n\
        document.querySelectorAll(\n\
            ".onevent-reset-output"\n\
        ).forEach(function (elem) {\n\
            switch (elem.tagName) {\n\
            case "INPUT":\n\
            case "TEXTAREA":\n\
                elem.value = "";\n\
                break;\n\
            case "PRE":\n\
                elem.textContent = "";\n\
                break;\n\
            default:\n\
                elem.innerHTML = "";\n\
            }\n\
        });\n\
    };\n\
    // init event-handling\n\
    [\n\
        "change",\n\
        "click",\n\
        "keydown",\n\
        "submit"\n\
    ].forEach(function (eventType) {\n\
        document.addEventListener(\n\
            eventType,\n\
            window.domOnEventDelegateDict.domOnEventDelegate\n\
        );\n\
    });\n\
}());\n\
\n\
\n\
\n\
// init timerIntervalAjaxProgressUpdate\n\
(function () {\n\
/*\n\
 * this function will increment ajax-progress-bar\n\
 * until webpage has loaded\n\
 */\n\
    "use strict";\n\
    var ajaxProgressDiv1;\n\
    var ajaxProgressState;\n\
    var ajaxProgressUpdate;\n\
    if (\n\
        window.timerIntervalAjaxProgressUpdate\n\
        || !document.querySelector(\n\
            "#ajaxProgressDiv1"\n\
        )\n\
    ) {\n\
        return;\n\
    }\n\
    ajaxProgressDiv1 = document.querySelector(\n\
        "#ajaxProgressDiv1"\n\
    );\n\
    setTimeout(function () {\n\
        ajaxProgressDiv1.style.width = "25%";\n\
    });\n\
    ajaxProgressState = 0;\n\
    ajaxProgressUpdate = (\n\
        window.local\n\
        && window.local.ajaxProgressUpdate\n\
    ) || function () {\n\
        ajaxProgressDiv1.style.width = "100%";\n\
        setTimeout(function () {\n\
            ajaxProgressDiv1.style.background = "transparent";\n\
            setTimeout(function () {\n\
                ajaxProgressDiv1.style.width = "0%";\n\
            }, 500);\n\
        }, 1000);\n\
    };\n\
    window.timerIntervalAjaxProgressUpdate = setInterval(function () {\n\
        ajaxProgressState += 1;\n\
        ajaxProgressDiv1.style.width = Math.max(\n\
            100 - 75 * Math.exp(-0.125 * ajaxProgressState),\n\
            ajaxProgressDiv1.style.width.slice(0, -1) | 0\n\
        ) + "%";\n\
    }, 1000);\n\
    window.addEventListener("load", function () {\n\
        clearInterval(window.timerIntervalAjaxProgressUpdate);\n\
        ajaxProgressUpdate();\n\
    });\n\
}());\n\
\n\
\n\
\n\
// init domOnEventSelectAllWithinPre\n\
(function () {\n\
/*\n\
 * this function will limit select-all within <pre tabIndex="0"> elements\n\
 * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n\
 */\n\
    "use strict";\n\
    if (window.domOnEventSelectAllWithinPre) {\n\
        return;\n\
    }\n\
    window.domOnEventSelectAllWithinPre = function (evt) {\n\
        var range;\n\
        var selection;\n\
        if (\n\
            evt\n\
            && evt.key === "a"\n\
            && (evt.ctrlKey || evt.metaKey)\n\
            && evt.target.closest(\n\
                "pre"\n\
            )\n\
        ) {\n\
            range = document.createRange();\n\
            range.selectNodeContents(evt.target.closest(\n\
                "pre"\n\
            ));\n\
            selection = window.getSelection();\n\
            selection.removeAllRanges();\n\
            selection.addRange(range);\n\
            evt.preventDefault();\n\
        }\n\
    };\n\
    // init event-handling\n\
    document.addEventListener(\n\
        "keydown",\n\
        window.domOnEventSelectAllWithinPre\n\
    );\n\
}());\n\
</script>\n\
<h1>\n\
<!-- utility2-comment\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
        target="_blank"\n\
    >\n\
utility2-comment -->\n\
        {{env.npm_package_name}} ({{env.npm_package_version}})\n\
<!-- utility2-comment\n\
    </a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<a class="button" download href="assets.app.js">download standalone app</a><br>\n\
<button class="button" data-onevent="testRunBrowser" id="testRunButton1">run internal test</button><br>\n\
<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbReset">reset database</button><br>\n\
<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbExport">export database -&gt; file</button><br>\n\
<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbImport">import database &lt;- file</button><br>\n\
<label>edit or paste script below to\n\
    <a\n\
        href="https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html"\n\
        target="_blank"\n\
    >eval</a>\n\
</label>\n\
<textarea class="textarea" data-onevent="testRunBrowser" id="inputTextarea1">\n\
/*jslint browser: true, node: true*/\n\
"use strict";\n\
var dbTable1, gotoState, gotoNext;\n\
gotoState = 0;\n\
gotoNext = function (err, data) {\n\
    gotoState = err\n\
        ? Infinity\n\
        : gotoState + 1;\n\
    switch (gotoState) {\n\
    case 1:\n\
        dbTable1 = window.dbTable1 = window.utility2_db.dbTableCreateOne({\n\
            name: "dbTable1"\n\
        }, gotoNext);\n\
        break;\n\
    case 2:\n\
        dbTable1.idIndexCreate({ name: "field1" }, gotoNext);\n\
        break;\n\
    case 3:\n\
        dbTable1.crudSetOneById({ field1: "aa", field2: 1, field3: "foo" }, gotoNext);\n\
        break;\n\
    case 4:\n\
        dbTable1.crudSetOneById({ field1: "bb", field2: 2, field3: "bar" }, gotoNext);\n\
        break;\n\
    case 5:\n\
        dbTable1.crudSetOneById({ field1: "cc", field2: 3, field3: "baz" }, gotoNext);\n\
        break;\n\
    case 6:\n\
        dbTable1.crudRemoveOneById({ field1: "aa" }, gotoNext);\n\
        break;\n\
    case 7:\n\
        dbTable1.crudUpdateOneById({ field1: "bb", field2: -1 }, gotoNext);\n\
        break;\n\
    case 8:\n\
        dbTable1.crudSetOneById({ field2: Math.random() }, gotoNext);\n\
        break;\n\
    case 9:\n\
        dbTable1.crudGetManyByQuery({\n\
            limit: Infinity,\n\
            query: { field2: { $gte: -Infinity, $lte: Infinity } },\n\
            skip: 0,\n\
            sort: [{ fieldName: "_timeUpdated", idDescending: true }]\n\
        }, gotoNext);\n\
        break;\n\
    case 10:\n\
        console.error(data);\n\
        dbTable1.crudCountAll(gotoNext);\n\
        break;\n\
    case 11:\n\
        console.error("number of rows: " + data);\n\
        break;\n\
    default:\n\
        console.error(err.stack);\n\
    }\n\
};\n\
gotoNext();\n\
</textarea>\n\
<button class="button" data-onevent="testRunBrowser" id="buttonEval1">eval script</button><br>\n\
<label>stderr and stdout</label>\n\
<pre class="onevent-reset-output readonly textarea" id="outputStdout1" tabindex="0"></pre>\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
utility2-comment -->\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2_onReadyBefore.counter += 1;</script>\n\
<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
<script src="assets.db.js"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>window.utility2_onReadyBefore();</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
<div class="utility2FooterDiv">\n\
    [ this app was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';
/* jslint ignore:end */
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/assets.db.js"] =
    local.assetsDict["/assets.db.js"] ||
    local.fs.readFileSync(local.__dirname + "/lib.db.js", "utf8"
).replace((/^#!\//), "// ");
/* jslint ignore:end */
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict[
    "/assets.index.template.html"
].replace((
    /\{\{env\.(\w+?)\}\}/g
), function (match0, match1) {
    switch (match1) {
    case "npm_package_description":
        return "the greatest app in the world!";
    case "npm_package_name":
        return "db-lite";
    case "npm_package_nameLib":
        return "db";
    case "npm_package_version":
        return "0.0.1";
    default:
        return match0;
    }
});
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];
local.assetsDict["/index.html"] = local.assetsDict["/"];
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
/* validateLineSortedReset */
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"]
    || local.fs.readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
// if $npm_config_timeout_exit exists,
// then exit this process after $npm_config_timeout_exit ms
if (Number(process.env.npm_config_timeout_exit)) {
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
}
// start server
if (globalThis.utility2_serverHttp1) {
    return;
}
process.env.PORT = process.env.PORT || "8081";
console.error("http-server listening on port " + process.env.PORT);
local.http.createServer(function (req, res) {
    req.urlParsed = local.url.parse(req.url);
    if (local.assetsDict[req.urlParsed.pathname] !== undefined) {
        res.end(local.assetsDict[req.urlParsed.pathname]);
        return;
    }
    res.statusCode = 404;
    res.end();
}).listen(process.env.PORT);
}());
}());
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.svg)



# extra screenshots
1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithub.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithubTest.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithubTest.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithubTest.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployGithubTest.browser.%252Fnode-db-lite%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHeroku.browser.%252F.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHerokuTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.deployHerokuTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.npmTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleJs.browser.%252F.png)

1. [https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-db-lite/build/screenshot.testExampleSh.browser.%252F.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "db-lite": "lib.db.js"
    },
    "description": "this zero-dependency package will provide a persistent, in-browser database, with a working web-demo",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=10.0"
    },
    "homepage": "https://github.com/kaizhu256/node-db-lite",
    "keywords": [
        "database",
        "embedded",
        "indexeddb",
        "nedb"
    ],
    "license": "MIT",
    "main": "lib.db.js",
    "name": "db-lite",
    "nameAliasPublish": "esdb nanodb",
    "nameLib": "db",
    "nameOriginal": "db-lite",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-db-lite.git"
    },
    "scripts": {
        "build-ci": "./npm_scripts.sh",
        "env": "env",
        "eval": "./npm_scripts.sh",
        "heroku-postbuild": "./npm_scripts.sh",
        "postinstall": "./npm_scripts.sh",
        "start": "./npm_scripts.sh",
        "test": "./npm_scripts.sh",
        "utility2": "./npm_scripts.sh"
    },
    "version": "2019.8.20"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-db-lite/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-db-lite/commits)



# internal build script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter () {(set -e
    # shDeployCustom
    shDeployGithub
    shDeployHeroku
    shReadmeTest example.sh
)}

shBuildCiBefore () {(set -e
    shNpmTestPublished
    shReadmeTest example.js
)}

# run shBuildCi
eval "$(utility2 source)"
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
