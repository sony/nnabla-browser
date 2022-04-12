# nnabla-browser

[![test](https://github.com/sony/nnabla-browser/actions/workflows/test.yaml/badge.svg)](https://github.com/sony/nnabla-browser/actions/workflows/test.yaml)

nnabla-browser is a browser-based visualizer for [Neural Network Libraries](https://github.com/sony/nnabla).

![](imgs/overview.gif)

## For users

### Requirements

python >= 3.6

### Install

```shell
$ pip install nnabla-browser
```

### Run server

Once you have installed nnabla-browser in your environment, you can launch server from anywhere as long as you use same python environment.

``` shell
$ nnabla-browser --logdir /path/to/logdir --port PORT
```

For macOS users, you might have to set an environment variable to allow NNabla Browser to use multi-process as follows:
``` shell
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
```

### Access server

Launch any browser application and just access to `<server-address>:PORT/`
For example, when you launch server on the same computer which browser can be used, you can access `localhost:8888/`

## For developers

### Requirements

- pipenv
- npm

### Install dependencies
```shell
# install javascript dependencies
$ npm install

# install python dependencies (`--pre` is required to install black.)
$ pipenv install --pre
```

### Build frontend

```shell
$ npm run build
```

### Run development server

```shell
# launch python server
$ pipenv run dev

# launch frontend server with hot-reloading
$ npm run serve
```

Then, access to `localhost:8000` from your browser.

### Build whl package

Using npm installed in your environment, you can create wheel as follows.
```shell
$ make nnabla-browser-wheel  # npm is required
$ pip install ./dist/nnablabrowser-<version>-<env>.whl
```

We also provide docker image so that you don't have to set up environment on your server:
```shell
$ make bwd-nnabla-browser-wheel # `bwd` stands for build with docker
$ pip install ./dist/nnablabrowser-<version>-<env>.whl
```

Note that .whl file is created in ./dist for default setting.
