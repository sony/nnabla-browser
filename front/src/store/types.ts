import { NodeInfo } from '@/utils/serverEventHandler'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  editor: any;
  graphInfo: any;
}

/***************************************
 graphinfo
 ***************************************/

export interface Link {
  source: number;
  destination: number;
}

export interface Graph {
  x?: number;
  y?: number;
  name?: string;
  nodes: NodeInfo[];
  links: Link[];
}

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

export interface DirectoryNode {
  id: number;
  name: string;
  children: DirectoryNode[];
  nntxtFiles: Array<{ name: string; data: any }>;
  monitorFiles: Array<{ name: string; data: any }>;
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
  inputDef: any; // after replace jquey by others, fix this.
}

/***************************************
 chartInfo
 ***************************************/

export interface ChartInfoState {
  charts: any[];
}
