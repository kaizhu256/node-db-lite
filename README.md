nedb-lite
==============
this package is a standalone, single-script version of nedb @ 1.8.0 that runs in both browser and nodejs, with zero npm-dependencies

[![NPM](https://img.shields.io/npm/v/nedb-lite.svg?style=flat-square)](https://www.npmjs.com/package/nedb-lite) [![NPM](https://img.shields.io/npm/dm/nedb-lite.svg?style=flat-square)](https://www.npmjs.com/package/nedb-lite) [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-nedb-lite.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)



# documentation
#### todo
- none

#### change since ccf0a403
- npm publish 2016.4.2
- expose and document nedb's internal modules
- none

#### api-doc
- [https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-nedb-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)



# cdn download
- [http://kaizhu256.github.io/node-nedb-lite/build/app/nedb-lite.js](http://kaizhu256.github.io/node-nedb-lite/build/app/nedb-lite.js)
- [http://kaizhu256.github.io/node-nedb-lite/build/app/nedb-lite.min.js](http://kaizhu256.github.io/node-nedb-lite/build/app/nedb-lite.min.js)

[![github.com cdn-download](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.githubDeploy.browser._2Fnode-nedb-lite_2Fbuild..alpha..travis-ci.org_2Fapp_2Fnedb-lite.js.png)](http://kaizhu256.github.io/node-nedb-lite/build/app/nedb-lite.js)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-nedb-lite.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)
[![build commit status](https://kaizhu256.github.io/node-nedb-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-nedb-lite/tree/master) | [beta](https://github.com/kaizhu256/node-nedb-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-nedb-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server : | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-nedb-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-nedb-lite/build..alpha..travis-ci.org/app/index.html)|
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



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-nedb-lite)



# package.json
```json
{
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "this package is a standalone, single-script version of nedb @ 1.8.0 \
that runs in both browser and nodejs, with zero npm-dependencies",
    "devDependencies": {
        "electron-lite": "2016.3.3",
        "utility2": "2016.3.5"
    },
    "engines": { "node": ">=4.2" },
    "keywords": [
        "browser",
        "db",
        "embed", "embedded",
        "indexeddb",
        "light", "lightweight", "lite", "localstorage",
        "minimal", "mongo", "mongodb",
        "nedb", "no-sql", "nosql",
        "standalone",
        "web-sql", "websql"
    ],
    "license": "MIT",
    "main": "nedb-lite.js",
    "name": "nedb-lite",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-nedb-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "build-doc": ". node_modules/.bin/utility2 && \
shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
utility2 shRun shDocApiCreate \"module.exports={ \
exampleFileList:['README.md','test.js','nedb-lite.js'], \
moduleDict:{ \
Nedb:{exports:require('./nedb-lite.js')}, \
'Nedb.prototype':{aliasList:['collection'],exports:require('./nedb-lite.js').prototype}, \
'Nedb.storage':{aliasList:['storage'],exports:require('./nedb-lite.js').storage} \
} \
}\"",
        "test": ". node_modules/.bin/utility2 && \
shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js",
        "test-published": "utility2 shRun shNpmTestPublished"
    },
    "version": "2016.4.2"
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
    exit
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then exit
    [ "$(node --version)" \< "v5.0" ] && exit || true
    TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/nedb-lite.js"
    # deploy app to gh-pages
    (export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
        shGithubDeploy)
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
