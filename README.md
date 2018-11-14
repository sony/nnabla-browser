# NNabla Browser

NNabla browser is a browser base visualizer for Neural Network Libraries.


## Installation

TODO

## Requirements
npm  
node  
pipenv

## Before running
```shell
# install node dependency 
$ npm install 

# install python dependency
$ pipenv install
$ pipenv shell
```
Note that if you can create same python environment written in PipFile, you don`t need to install pipenv. 

## Run server
```shell
$ python server.py --logdir /path/to/logdir --port PORT
```

If you want to bundle js files again, try --build option like
 
 ```shell
 $ python server.py --build True --logdir /path/to/logdir --port PORT
 ```
