import {Assets} from '../AssetManager/Assets'
import { Game } from '../Game/Game'
import { objRenderer } from './objRenderer'
import * as vec2 from '../DataStructure/Vec2'
export class SpriteRenderer extends objRenderer{
    private imageName:string
    maintainRatio:boolean=false
    imageElement:HTMLImageElement
    subImageLocation:vec2.Vec2 =new vec2.Vec2()//from which position on the image should we draw
    subImageSize:vec2.Vec2=new vec2.Vec2(Infinity,Infinity)      // how much of the whole image to draw
    size:vec2.Vec2=new vec2.Vec2(100,100)

    constructor(imageName:string){  //anything doing with gameObject must be done in start, as the constructor will run before even adding the component to any object
        super()
        this.imageName=imageName
        this.imageElement=new Image()
    } 

    start=()=>{
        this.imageElement=Assets.images[this.imageName]
        if(this.subImageSize.x===Infinity||this.subImageSize.y===Infinity){
            this.subImageSize.x=this.imageElement.naturalWidth
            this.subImageSize.y=this.imageElement.naturalHeight
        }
    }

    tick=()=>{
        Game.viewPort.drawSprite(
            this.imageElement!,
            this.subImageLocation,
            this.subImageSize,
            this.drawingPosition,
            this.pixelPerUnit,
            this.maintainRatio
        )
    }


}