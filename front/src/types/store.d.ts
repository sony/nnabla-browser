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

import { Graph } from '@/types/graph'
import { MonitorSeriesData } from '@/types/monitor'
import { RawFunction } from '@/types/nnablaApi'

export interface RootState {
  editor: EditorState;
  graphInfo: GraphInfoState;
  chartInfo: ChartInfoState;
  directoryInfo: DirectoryInfoState;
}

/***************************************
 graphinfo
 ***************************************/

export interface GraphInfoState {
  prevGraph: Graph;
  graphs: Graph[];
  nntxtPath: string;
  activeIndex: { graph: number; layer: number };
  isDragging: boolean;
  assistAreaSize: { x: number; y: number };
}

/***************************************
 editor
 ***************************************/

export interface EditorState {
  nnablaFunctions: RawFunction[];
}

/***************************************
 directoryInfo
 ***************************************/

export interface MonitorFile {
   name: string;
   data: MonitorSeriesData|null;
   isView?: boolean;
}

export interface NNtxtFile {
  name: string;
  data: Graph[]|null;
}

export interface DirectoryNode {
  id: number;
  name: string;
  children: DirectoryNode[];
  nntxtFiles: NNtxtFile[];
  monitorFiles: MonitorFile[];
}

export interface DirectoryInfoState {
  data: DirectoryNode;
  activeFile: string;
  subscribedList: string[];
}

/***************************************
 chartInfo
 ***************************************/

export interface ChartValue {
  t: number[];
  v: number[];
}

export interface ChartDatum {
  name: string;
  values: ChartValue;
}

export interface ChartData {
  data: ChartDatum[];
  name: string;
}

export interface ChartInfoState {
  charts: ChartData[];
  activeChartPaths: string[];
}
