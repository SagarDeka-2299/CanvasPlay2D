
import { Game } from '../Game/Game';
import { objRenderer } from './objRenderer';

export class CircleRenderer extends objRenderer{
    color:string='white';
    fraction:number=1 //for semi circle it is 1/2 or 0.5
    tick=()=>{
        Game.viewPort.drawCircle(
            this.drawingPosition,
            this.pixelPerUnit,
            this.color,
            this.fraction
        )
    }
}

export class CircleWireFrameRenderer extends objRenderer{
    color:string='white';
    fraction:number=1
    tick=()=>{
        Game.viewPort.drawCircleWireFrame(
            this.drawingPosition,
            this.pixelPerUnit,
            this.color,
            this.fraction
        )
    }
}
