// Copyright 2021 Sony Group Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { AnyObject } from '@/types/basic'

export interface Shape {
    dim: number[];
}

export interface Variable {
    dataName: string;
    variableName: string;
}

export interface Parameter {
    name: string;
    shape: Shape;
    type: string;
}

export interface RawFunction {
    api_type: string;
    arguments: AnyObject;
    inputs: AnyObject; // function arguments
    color: string;
    layer_name: string;
    snake_name: string;
}

export interface NNtxtFunction {
    input: string[];
    output: string[];
    name: string;
    type: string;
    param: AnyObject;
}

export interface NNtxtNetwork {
    name: string;
    variable: Parameter[];
    function: NNtxtFunction[];
}

export interface NNtxtExecutor {
    name: string;
    networkName: string;
    dataVariable: Variable[];
    outputVariable: Vairable[];
}

export interface NNtxt {
    network?: NNtxtNetwork[];
    executor?: NNtxtExecutor[];
}
