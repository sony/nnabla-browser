# nnabla Browser

[![test](https://github.com/nnabla/nnabla-browser/actions/workflows/test.yaml/badge.svg)](https://github.com/nnabla/nnabla-browser/actions/workflows/test.yaml)

nnabla browser is a browser based visualizer for [Neural Network Libraries](https://github.com/sony/nnabla).

![](imgs/overview.gif)

## For users

### Environment

python >= 3.6

### Install

- Pip install from pypi

    ```shell
    $pip install nnabla-browser
    ```

- Build from source by yourself & install (required npm)

    ```shell
    $ make nnabla-browser-wheel
    $ pip install ./dist/nnablabrowser-<version>-<env>.whl
    ```

    We also provide docker image so that you don't have to set up environment on your server except docker: 
    ```shell
    $ make bwd-nnabla-browser-wheel # `bwd` stands for build with docker
    $ pip install ./dist/nnablabrowser-<version>-<env>.whl
    ```

    Note that .whl file is created in ./dist for default setting.

### Run server

Once you have installed nnabla-browser in your environment, you can launch server from anywhere as long as you use same python environment.

``` shell
$nnabla-browser --logdir /path/to/logdir --port PORT
```

For macOS users, you have to set an environment variable to allow NNabla Browser to use multi-process as follows:
``` shell
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
```

### Access server

Launch any browser application and just access to \<server-address\>:PORT/  
For example, when you launch server on the same computer which browser can be used, you can access localhost:8888/

## contributions

### Requirements

- pipenv
- npm

### Bundle js packages

```shell
# install node dependency 
$ npm install 

# bundle packages
$ npm run build
```

### Run server for development

```shell
# install python dependency (`--pre` is required to install black.)
$ pipenv install --pre

# launch python server
$ pipenv run dev

# launch frontend server with hot-reloading
$ npm run serve

```

After that, access to `localhost:8000` from your browser.
