import { AnyObject } from '@/types/basic'
import { Graph } from '@/types/graph'
import { MonitorSeriesData } from './monitor'

export interface RootState {
  editor: EditorState;
  graphInfo: GraphInfoState;
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
  activeTabName: string;
}

/***************************************
 directoryInfo
 ***************************************/

export interface MonitorFile {
   name: string;
   data: MonitorSeriesData;
   isView?: boolean;
}

export interface NNtxtFile {
  name: string;
  data: AnyObject;
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
 dialogueInfo
 ***************************************/

export interface DialogueInfoState {
  data: {
    windowWidth: number;
    windowHeight: number;
  };
  isMaskActive: boolean;
  dialogueType: string;
  defaultStr: string;
  inputStr: string;
  inputDef: ReturnType<$.Deferred>; // after replace jquey by others, fix this.
}

/***************************************
 chartInfo
 ***************************************/

export interface ChartValue {
  t: number[];
  v: number[];
}

export interface ChartDatum {
  id: number;
  name: string;
  values: ChartValue;
}

export interface ChartData {
  data: ChartDatum[];
  name: string;
}

export interface ChartInfoState {
  charts: ChartData[];
}
