import { Function, Parameter } from '@/types/nnablaApi'
import { Vector2D } from '@/types/geometry'

export interface Layer extends Function {
    name: string;
    index: number;
    depth: number[] | number;
    visitCount: number;
    parameters: Parameter[];
}

export interface Node extends Layer {
    position: Vector2D;
    type: string;
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
