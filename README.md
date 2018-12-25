# NNabla Browser

NNabla browser is a browser base visualizer for Neural Network Libraries.


# For user

### Environment
python >=3.5, <=3.6.5 

### Build wheel
```shell
$ python setup.py bdist_wheel
```
.whl file is created in ./dist for default setting.

### Install
``` shell
$ pip install ./dist/nnablabrowser-<version>-<env>.whl
```

### Run server
Once you install nnabla-browser in your environment, you can launch server from anywhere as long as you use same python environment.

``` shell
$nnabla-browser --logdir /path/to/logdir --port PORT
```

### Access server
Launch any browser application and just access to \<server-address\>:PORT/  
For example, when you launch server on the same computer which browser can be used, you can access localhost:8888/


# For developer

### Requirements
 - pipenv
 - npm  
 - node.js  

### Bundle all js package
```shell
# install node dependency 
$ npm install 

# bundle packages
$ npm run build
```

### Run server
```shell
# install python dependency
$ pipenv install
$ pipenv shell

$ python server.py --logdir /path/to/logdir --port PORT

# If you want to bundle js files again from python script, try --build option like below
$ python server.py --build True --logdir /path/to/logdir --port PORT

```
Note that if you can create same python environment written in PipFile, you don`t need to install pipenv. 

