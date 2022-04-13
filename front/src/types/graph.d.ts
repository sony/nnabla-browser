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

import { NNtxtFunction, Parameter } from '@/types/nnablaApi'
import { Vector2D } from '@/types/geometry'

export interface Layer extends NNtxtFunction {
    index: number;
    depth: number[] | number;
    visitCount: number;
    parameters: Parameter[];
}

export interface Node extends Layer {
    position: Vector2D;
    outputShape: string[];
}

export interface Link {
    index?: number;
    destNodeId: number;
    srcNodeId: number;
}

export interface Graph {
    name?: string;
    nodes: Node[];
    links: Link[];
}

interface DrawingLinkMemory extends Link {
    tmpLine?: d3.Selection<SVGPathElement, unknown, HTMLElement, unknown>;
    delta: Vector2D;
}

interface TempLink {
    index: number;
    srcPosition?: Vector2D;
    destPosition?: Vector2D;
    update: (arg0: Vector2D) => void;
}

interface NextTransition {
    index: number;
    transform: string;
}
