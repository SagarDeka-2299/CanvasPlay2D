import { Game } from "../Game/Game";
import * as vec2 from '../DataStructure/Vec2'
import {objRenderer} from './objRenderer'

export class PolygonRenderer extends objRenderer{
    vertices:vec2.Vec2[];//local space
    color:string='white';
    constructor(v:vec2.Vec2[]){//obj space
        super();
        this.vertices=[...v];
    }
    tick=()=>{
        Game.viewPort.drawPolygon(this.drawingPosition,this.vertices,this.color);
    }
}

export class PolygonWireframeRenderer extends objRenderer{
    vertices:vec2.Vec2[];//local space
    color:string='white';
    constructor(v:vec2.Vec2[]){//obj space
        super();
        this.vertices=[...v];
    }
    tick=()=>{
        Game.viewPort.drawPolygonWireframe(this.drawingPosition,this.vertices,this.color);
    }
}