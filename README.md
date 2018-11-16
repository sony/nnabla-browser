# NNabla Browser

NNabla browser is a browser base visualizer for Neural Network Libraries.


## Installation

TODO

## Requirements
#### for run
 - pipenv

#### for dev
 - npm  
 - node.js  

## Before running

#### for run
```shell
# install python dependency
$ pipenv install
$ pipenv shell
```
Note that if you can create same python environment written in PipFile, you don`t need to install pipenv. 

#### for dev
```shell
# install node dependency 
$ npm install 

# bundle packages
$ npm run build
```

## Run server
```shell
$ python server.py --logdir /path/to/logdir --port PORT
```

If you want to bundle js files again, try --build option like
 
 ```shell
 $ python server.py --build True --logdir /path/to/logdir --port PORT
 ```
