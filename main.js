// include required packages
const argv = require("argv");
const parcelBundler = require("parcel-bundler");
const Path = require("path");
const express = require('express');
const fs = require("fs");
const pythonShell = require("python-shell");

// get argument

argv.option([
    {name: "logdir", short: "d", type: "list,path"},
    {name: "port", short: "p", type: "int"}
]);

const args = argv.run();

// bundle vue component (main js for editor)


const file = Path.join(__dirname, "/editor/js/index.js");

const bundleOptions = {
    outDir: "editor/dist",
    watch: false,
    minify: true,
    logLevel: 0,
    // detailedReport: true
};

const bundler = new parcelBundler(file, bundleOptions);

// web page to serve
const serve = (bundle) => {
    const app = express();

    app.use(express.static(__dirname + "/editor"));

    app.listen(args.options.port);

    console.log("starting server, port: " + args.options.port);
};

bundler.on("bundled", serve);

bundler.bundle();

// supervise local nntxt

const logDir = args.options.logdir.toString();

console.log(`local target dir: ${logDir}`);

const checkFileExist = (filePath) => {
    return new Promise(resolve => {
        fs.open(filePath, "r", (err, fd) => {
            if (err) {
                if (err.code === "ENOENT") {
                    console.log(`${filePath} dose not exist`);
                    throw err;
                }
            } else {
                resolve(filePath);
            }
        })
    })
};

const readFunctions = {
    ".nntxt": (filePath) => {
        const options = {mode: "text", args: [filePath]};
        return new Promise(resolve => {
            pythonShell.run("./scripts/convert_proto_to_json.py", options, (err, res) => {
                if (err) {
                    console.log("unexpected error is occurred in convert_proto_to_json");
                    throw err;
                }
                resolve(JSON.parse(res));
            })
        })
    },
    "default": () => {
        throw new Error;
    },
};

let result = [];

const readDir = () => {
    return new Promise(resolve => {
        fs.readdir(logDir, (err, files) => {
            if (err) throw err;

            for (let filename of files) {
                let ext = Path.extname(filename);
                let filePath = Path.join(logDir, filename);
                checkFileExist(filePath)
                    .then(readFunctions[ext] || readFunctions["default"])
                    .then((x) => result.push(x))
                    .then(() => console.log(result))
                    .catch(() => {
                    });
            }
        });
    })
};

readDir().then(() => console.log(result));

