nedb-lite
==============
standalone, single-script version of nedb that runs in both browser and nodejs

[![NPM](https://img.shields.io/npm/v/nedb-lite.svg?style=flat-square)](https://www.npmjs.com/package/nedb-lite) [![NPM](https://img.shields.io/npm/dm/nedb-lite.svg?style=flat-square)](https://www.npmjs.com/package/nedb-lite)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-nedb-lite.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)
[![build commit status](https://kaizhu256.github.io/node-nedb-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-nedb-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-nedb-lite/tree/master) | [beta](https://github.com/kaizhu256/node-nedb-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-nedb-lite/tree/alpha)|
|--:|:--|:--|:--|
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



# documentation
#### this package requires
- darwin or linux os

#### this package is derived from
- nedb @ 1.8.0

#### [api-doc](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)
[![api-doc](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-nedb-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-nedb-lite/build/doc.api.html)



# npm-dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-nedb-lite)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "standalone, single-script version of nedb \
that runs in both browser and nodejs",
    "devDependencies": {
        "electron-lite": "2015.12.3",
        "utility2": "2016.1.5"
    },
    "keywords": [
        "browser",
        "db",
        "embed", "embedded",
        "lite", "lightweight",
        "minimal", "mongo", "mongodb",
        "nedb",
        "standalone"
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
        "build-doc": "MODE_LINENO=0 \
utility2 shRun shReadmeExportFile package.json package.json && \
utility2 shRun shDocApiCreate \"module.exports={ \
exampleFileList:['README.md','test.js','index.js'], \
moduleDict:{ \
Nedb:{exports:require('./index.js')}, \
'Nedb.prototype':{aliasList:['collection'], \
exports:require('./index.js').prototype} \
} \
}\"",
        "test": "export MODE_LINENO=0 && \
export NODE_ENV=test && \
utility2 shRun shReadmeExportFile package.json package.json && \
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js"
    },
    "version": "2016.1.1"
}
```



# todo
- none



# change since 9fe8c225
- npm publish 2016.1.1
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-nedb-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-nedb-lite/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuild() {(set -e
# this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit

    (set -e
    # run npm-test on published package
    (export npm_config_mode_coverage=1 &&
        shNpmTestPublished)

    # run npm-test
    (export MODE_BUILD=npmTest &&
        shRunScreenCapture npm test --mode-coverage)

    # create api-doc
    npm run-script build-doc

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v5.0" ] && exit || true
    )

    # save exit-code
    EXIT_CODE=$?

    # create package-listing
    (export MODE_BUILD=gitLsTree &&
        shRunScreenCapture shGitLsTree)

    # create recent changelog of last 50 commits
    (export MODE_BUILD=gitLog &&
        shRunScreenCapture git log -50 --pretty="%ai\u000a%B")

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v5.0" ] && exit || true

    # cleanup remote build dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"

    # upload build-artifacts to github, and if number of commits > 16, then squash older commits
    (export COMMIT_LIMIT=16 &&
        export MODE_BUILD=githubUpload &&
        shBuildGithubUpload)

    # exit exit-code
    exit "$EXIT_CODE"
)}
shBuild
```
