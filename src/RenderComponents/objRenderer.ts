import { Behaviour } from "../Scripting/Behaviour";
import { Vec2 } from "../DataStructure/Vec2";

export class objRenderer extends Behaviour{
    drawingPosition:Vec2=new Vec2(0,0)//w.r.t position of obj(i.e the pt around which transformation is done)
    pixelPerUnit:number=100
}