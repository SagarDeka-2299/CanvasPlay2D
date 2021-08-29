import {Game} from '../Game/Game'
import { Vec2 } from '../DataStructure/Vec2'
import { objRenderer } from './objRenderer'
export class RectRenderer extends objRenderer{  
    color:string='white'
    tick=()=>{
        Game.viewPort.drawRect(
            this.drawingPosition,//relative to position
            this.pixelPerUnit,
            this.color
        )
    }
}

export class RectWireFrameRenderer extends objRenderer{  
    color:string='white'

    tick=()=>{
        Game.viewPort.drawRectWireFrame(
            this.drawingPosition,
            this.pixelPerUnit,
            this.color
        )
    }
}