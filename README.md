# NNabla Browser

[![test](https://github.com/nnabla/nnabla-browser/actions/workflows/test.yaml/badge.svg)](https://github.com/nnabla/nnabla-browser/actions/workflows/test.yaml)

NNabla browser is a browser based visualizer for Neural Network Libraries.

## For users

### Environment

python >=3.5

### Install

- Pip install from git repository

    ```shell
    $pip install git+http://github.com/nnabla/nnabla-browser.git
    ```

- Building from source by yourself & install

    ```shell
    $python setup.py bdist_wheel
    $pip install ./dist/nnablabrowser-<version>-<env>.whl
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

## For developers

### Requirements

- pipenv
- npm

### Bundle all js package

```shell
# install node dependency 
$ npm install 

# bundle packages
$ npm run build
```

### Run server for development

```shell
# install python dependency
$ pipenv install

# launch python server
$ pipenv run dev

# launch frontend server with hot-reloading
$ npm run serve

```

After that, access to `localhost:8000` from your browser.
