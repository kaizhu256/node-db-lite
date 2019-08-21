/*
example.js

this script will run a web-demo of db-lite

instruction
    1. save this script as example.js
    2. run the shell-command:
        $ npm install db-lite && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo
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
     * this function will throw the error <message> if <passed> is falsy
     */
        var error;
        if (passed) {
            return;
        }
        error = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is an error-object, then leave it as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave it as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw error;
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
        Object.keys(source).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
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
local.testRunBrowser = function (event) {
    if (!event || (
        event
        && event.currentTarget
        && event.currentTarget.className
        && event.currentTarget.className.includes
        && event.currentTarget.className.includes("onreset")
    )) {
        // reset output
        Array.from(document.querySelectorAll(
            "body > .resettable"
        )).forEach(function (element) {
            switch (element.tagName) {
            case "INPUT":
            case "TEXTAREA":
                element.value = "";
                break;
            default:
                element.textContent = "";
            }
        });
    }
    switch (event && event.currentTarget && event.currentTarget.id) {
    case "testRunButton1":
        // show tests
        if (document.querySelector(
            "#testReportDiv1"
        ).style.maxHeight === "0px") {
            local.uiAnimateSlideDown(document.querySelector(
                "#testReportDiv1"
            ));
            document.querySelector(
                "#testRunButton1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
        // hide tests
        } else {
            local.uiAnimateSlideUp(document.querySelector(
                "#testReportDiv1"
            ));
            document.querySelector(
                "#testRunButton1"
            ).textContent = "run internal test";
        }
        break;
    /* validateLineSortedReset */
    // custom-case
    case "dbExportButton1":
    case "dbImportButton1":
    case "dbImportInput1":
    case "dbResetButton1":
        local.db.onEventDomDb(event);
        break;
    }
    if (document.querySelector(
        "#inputTextareaEval1"
    ) && (!event || (
        event
        && event.currentTarget
        && event.currentTarget.className
        && event.currentTarget.className.includes
        && event.currentTarget.className.includes("oneval")
    ))) {
        // try to eval input-code
        try {
            eval(document.querySelector( // jslint ignore:line
                "#inputTextareaEval1"
            ).value);
        } catch (errorCaught) {
            console.error(errorCaught);
        }
    }
};

local.uiEventDelegate = local.uiEventDelegate || function (event) {
    // filter non-input keyup-event
    event.targetOnEvent = event.target.closest("[data-onevent]");
    if (!event.targetOnEvent) {
        return;
    }
    // rate-limit keyup
    if (event.type === "keyup") {
        local.uiEventDelegateKeyupEvent = event;
        if (local.uiEventDelegateKeyupTimerTimeout !== 2) {
            local.uiEventDelegateKeyupTimerTimeout = (
                local.uiEventDelegateKeyupTimerTimeout
                || setTimeout(function () {
                    local.uiEventDelegateKeyupTimerTimeout = 2;
                    local.uiEventDelegate(local.uiEventDelegateKeyupEvent);
                }, 100)
            );
            return;
        }
        local.uiEventDelegateKeyupTimerTimeout = null;
        if (!event.target.closest("input, option, select, textarea")) {
            return;
        }
    }
    switch (event.targetOnEvent.tagName) {
    case "BUTTON":
    case "FORM":
        event.preventDefault();
        break;
    }
    event.stopPropagation();
    local.uiEventListenerDict[event.targetOnEvent.dataset.onevent](event);
};

local.uiEventListenerDict = local.uiEventListenerDict || {};

local.uiEventListenerDict.testRunBrowser = local.testRunBrowser;

// log stderr and stdout to #outputStdoutTextarea1
["error", "log"].forEach(function (key) {
    console[key + "_original"] = console[key + "_original"] || console[key];
    console[key] = function () {
        var argList;
        var element;
        argList = Array.from(arguments); // jslint ignore:line
        console[key + "_original"].apply(console, argList);
        element = document.querySelector(
            "#outputStdoutTextarea1"
        );
        if (!element) {
            return;
        }
        // append text to #outputStdoutTextarea1
        element.value += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, null, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        element.scrollTop = element.scrollHeight;
    };
});
// init event-handling
["Change", "Click", "Keyup", "Submit"].forEach(function (eventType) {
    Array.from(document.querySelectorAll(
        ".eventDelegate" + eventType
    )).forEach(function (element) {
        element.addEventListener(eventType.toLowerCase(), local.uiEventDelegate);
    });
});
// run tests
local.testRunBrowser();
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
local.assetsDict["/assets.index.template.html"] = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<!-- "assets.utility2.template.html" -->\n<title>{{env.npm_package_name}} ({{env.npm_package_version}})</title>\n<style>\n/* jslint utility2:true */\n/*csslint\n*/\n/* csslint ignore:start */\n*,\n*:after,\n*:before {\n    box-sizing: border-box;\n}\n/* csslint ignore:end */\n@keyframes uiAnimateShake {\n    0%, 50% {\n        transform: translateX(10px);\n    }\n    25%, 75% {\n        transform: translateX(-10px);\n    }\n    100% {\n        transform: translateX(0);\n    }\n}\n@keyframes uiAnimateSpin {\n    0% {\n        transform: rotate(0deg);\n    }\n    100% {\n        transform: rotate(360deg);\n    }\n}\na {\n    overflow-wrap: break-word;\n}\nbody {\n    background: #eef;\n    font-family: Arial, Helvetica, sans-serif;\n    margin: 0 40px;\n}\nbody > div,\nbody > form > div,\nbody > form > input,\nbody > form > pre,\nbody > form > textarea,\nbody > form > .button,\nbody > input,\nbody > pre,\nbody > textarea,\nbody > .button {\n    margin-bottom: 20px;\n}\nbody > form > input,\nbody > form > .button,\nbody > input,\nbody > .button {\n    width: 20rem;\n}\nbody > form > textarea,\nbody > textarea {\n    height: 10rem;\n    width: 100%;\n}\nbody > textarea[readonly] {\n    background: #ddd;\n}\ncode,\npre,\ntextarea {\n    font-family: Consolas, Menlo, monospace;\n    font-size: small;\n}\npre {\n    overflow-wrap: break-word;\n    white-space: pre-wrap;\n}\ntextarea {\n    overflow: auto;\n    white-space: pre;\n}\n.button {\n    background-color: #fff;\n    border: 1px solid;\n    border-bottom-color: rgb(186, 186, 186);\n    border-left-color: rgb(209, 209, 209);\n    border-radius: 4px;\n    border-right-color: rgb(209, 209, 209);\n    border-top-color: rgb(216, 216, 216);\n    color: #00d;\n    cursor: pointer;\n    display: inline-block;\n    font-family: Arial, Helvetica, sans-serif;\n    font-size: 12px;\n    font-style: normal;\n    font-weight: normal;\n    margin: 0;\n    padding: 2px 7px 3px 7px;\n    text-align: center;\n    text-decoration: underline;\n}\n.colorError {\n    color: #d00;\n}\n.uiAnimateShake {\n    animation-duration: 500ms;\n    animation-name: uiAnimateShake;\n}\n.uiAnimateSlide {\n    overflow-y: hidden;\n    transition: max-height ease-in 250ms, min-height ease-in 250ms, padding-bottom ease-in 250ms, padding-top ease-in 250ms;\n}\n.utility2FooterDiv {\n    text-align: center;\n}\n.zeroPixel {\n    border: 0;\n    height: 0;\n    margin: 0;\n    padding: 0;\n    width: 0;\n}\n</style>\n</head>\n<body>\n<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 0%; z-index: 1;"></div>\n<div class="uiAnimateSpin" style="animation: uiAnimateSpin 2s linear infinite; border: 5px solid #999; border-radius: 50%; border-top: 5px solid #7d7; display: none; height: 25px; vertical-align: middle; width: 25px;"></div>\n<a class="zeroPixel" download="db.persistence.json" href="" id="dbExportA1"></a>\n<input class="zeroPixel" id="dbImportInput1" type="file">\n<script>\n/* jslint utility2:true */\n// init domOnEventWindowOnloadTimeElapsed\n(function () {\n/*\n * this function will measure and print the time-elapsed for window.onload\n */\n    "use strict";\n    if (window.domOnEventWindowOnloadTimeElapsed) {\n        return;\n    }\n    window.domOnEventWindowOnloadTimeElapsed = Date.now() + 100;\n    window.addEventListener("load", function () {\n        setTimeout(function () {\n            window.domOnEventWindowOnloadTimeElapsed = (\n                Date.now()\n                - window.domOnEventWindowOnloadTimeElapsed\n            );\n            console.error(\n                "domOnEventWindowOnloadTimeElapsed = "\n                + window.domOnEventWindowOnloadTimeElapsed\n            );\n        }, 100);\n    });\n}());\n\n\n\n// init timerIntervalAjaxProgressUpdate\n(function () {\n/*\n * this function will increment the ajax-progress-bar\n * until the webpage has loaded\n */\n    "use strict";\n    var ajaxProgressDiv1;\n    var ajaxProgressState;\n    var ajaxProgressUpdate;\n    if (\n        window.timerIntervalAjaxProgressUpdate\n        || !document.querySelector(\n            "#ajaxProgressDiv1"\n        )\n    ) {\n        return;\n    }\n    ajaxProgressDiv1 = document.querySelector(\n        "#ajaxProgressDiv1"\n    );\n    setTimeout(function () {\n        ajaxProgressDiv1.style.width = "25%";\n    });\n    ajaxProgressState = 0;\n    ajaxProgressUpdate = (\n        window.local\n        && window.local.ajaxProgressUpdate\n    ) || function () {\n        ajaxProgressDiv1.style.width = "100%";\n        setTimeout(function () {\n            ajaxProgressDiv1.style.background = "transparent";\n            setTimeout(function () {\n                ajaxProgressDiv1.style.width = "0%";\n            }, 500);\n        }, 1000);\n    };\n    window.timerIntervalAjaxProgressUpdate = setInterval(function () {\n        ajaxProgressState += 1;\n        ajaxProgressDiv1.style.width = Math.max(\n            100 - 75 * Math.exp(-0.125 * ajaxProgressState),\n            ajaxProgressDiv1.style.width.slice(0, -1) | 0\n        ) + "%";\n    }, 1000);\n    window.addEventListener("load", function () {\n        clearInterval(window.timerIntervalAjaxProgressUpdate);\n        ajaxProgressUpdate();\n    });\n}());\n\n\n\n// init domOnEventSelectAllWithinPre\n(function () {\n/*\n * this function will limit select-all within <pre tabIndex="0"> elements\n * https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse\n */\n    "use strict";\n    if (window.domOnEventSelectAllWithinPre) {\n        return;\n    }\n    window.domOnEventSelectAllWithinPre = function (event) {\n        var range;\n        var selection;\n        if (\n            event\n            && event.key === "a"\n            && (event.ctrlKey || event.metaKey)\n            && event.target.closest("pre")\n        ) {\n            range = document.createRange();\n            range.selectNodeContents(event.target.closest("pre"));\n            selection = window.getSelection();\n            selection.removeAllRanges();\n            selection.addRange(range);\n            event.preventDefault();\n        }\n    };\n    // init event-handling\n    document.addEventListener(\n        "keydown",\n        window.domOnEventSelectAllWithinPre\n    );\n}());\n</script>\n<h1>\n<!-- utility2-comment\n    <a\n        {{#if env.npm_package_homepage}}\n        href="{{env.npm_package_homepage}}"\n        {{/if env.npm_package_homepage}}\n        target="_blank"\n    >\nutility2-comment -->\n        {{env.npm_package_name}} ({{env.npm_package_version}})\n<!-- utility2-comment\n    </a>\nutility2-comment -->\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<!-- utility2-comment\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button eventDelegateClick onreset" data-onevent="testRunBrowser" id="testRunButton1">run internal test</button><br>\n<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\nutility2-comment -->\n\n\n\n<button class="button eventDelegateClick" data-onevent="testRunBrowser" data-on-event-dom-db="dbResetButton1" id="dbResetButton1">\n    reset database\n</button><br>\n<button class="button eventDelegateClick" data-onevent="testRunBrowser" data-on-event-dom-db="dbExportButton1" id="dbExportButton1">\n    export database -&gt; file\n</button><br>\n<button class="button eventDelegateClick" data-onevent="testRunBrowser" data-on-event-dom-db="dbImportButton1" id="dbImportButton1">\n    import database &lt;- file\n</button><br>\n<label>edit or paste script below to\n    <a\n        href="https://kaizhu256.github.io/node-db-lite/build..beta..travis-ci.org/apidoc.html"\n        target="_blank"\n    >eval</a>\n</label>\n<textarea id="inputTextareaEval1">\n/*jslint browser: true, node: true*/\n"use strict";\nvar dbTable1, modeNext, onNext;\nmodeNext = 0;\nonNext = function (error, data) {\n    modeNext = error\n        ? Infinity\n        : modeNext + 1;\n    switch (modeNext) {\n    case 1:\n        dbTable1 = window.dbTable1 = window.utility2_db.dbTableCreateOne({\n            name: "dbTable1"\n        }, onNext);\n        break;\n    case 2:\n        dbTable1.idIndexCreate({ name: "field1" }, onNext);\n        break;\n    case 3:\n        dbTable1.crudSetOneById({ field1: "aa", field2: 1, field3: "foo" }, onNext);\n        break;\n    case 4:\n        dbTable1.crudSetOneById({ field1: "bb", field2: 2, field3: "bar" }, onNext);\n        break;\n    case 5:\n        dbTable1.crudSetOneById({ field1: "cc", field2: 3, field3: "baz" }, onNext);\n        break;\n    case 6:\n        dbTable1.crudRemoveOneById({ field1: "aa" }, onNext);\n        break;\n    case 7:\n        dbTable1.crudUpdateOneById({ field1: "bb", field2: -1 }, onNext);\n        break;\n    case 8:\n        dbTable1.crudSetOneById({ field2: Math.random() }, onNext);\n        break;\n    case 9:\n        dbTable1.crudGetManyByQuery({\n            limit: Infinity,\n            query: { field2: { $gte: -Infinity, $lte: Infinity } },\n            skip: 0,\n            sort: [{ fieldName: "_timeUpdated", idDescending: true }]\n        }, onNext);\n        break;\n    case 10:\n        console.error(data);\n        dbTable1.crudCountAll(onNext);\n        break;\n    case 11:\n        console.error("number of rows: " + data);\n        break;\n    default:\n        console.error(error.stack);\n    }\n};\nonNext();\n</textarea>\n<button class="button eventDelegateClick oneval onreset" data-onevent="testRunBrowser" id="dbEvalButton1">eval script</button><br>\n<label>stderr and stdout</label>\n<textarea class="resettable" id="outputStdoutTextarea1" readonly></textarea>\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\nutility2-comment -->\n<script src="assets.utility2.rollup.js"></script>\n<script>window.utility2_onReadyBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n<script src="assets.db.js"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>window.utility2_onReadyBefore();</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n<div class="utility2FooterDiv">\n    [ this app was created with\n    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n    ]\n</div>\n</body>\n</html>\n';
















































































































































































































































































































































































/* jslint ignore:end */
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/assets.db.js"] =
    local.assetsDict["/assets.db.js"] ||
    local.fs.readFileSync(local.__dirname + "/lib.db.js", "utf8"
).replace((/^#!\//), "// ");
/* jslint ignore:end */
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict["/assets.index.template.html"]
.replace((
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
console.error("server starting on port " + process.env.PORT);
local.http.createServer(function (request, response) {
    request.urlParsed = local.url.parse(request.url);
    if (local.assetsDict[request.urlParsed.pathname] !== undefined) {
        response.end(local.assetsDict[request.urlParsed.pathname]);
        return;
    }
    response.statusCode = 404;
    response.end();
}).listen(process.env.PORT);
}());



}());