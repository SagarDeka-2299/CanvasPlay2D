import { Assets } from "../AssetManager/Assets"
import { Vec2 } from "../DataStructure/Vec2"
import { Game } from "../Game/Game"
import { Behaviour } from "../Scripting/Behaviour"
import { objRenderer } from "./objRenderer"

export class SpriteAnimationRenderer extends objRenderer{
    private animations:{name:string,row:number,frames:number,loop:boolean,frameTime:number}[]=[]
    private spriteShreet:HTMLImageElement=new Image()
    private remainingTime:number=20 //20 ms
    private currentPlaying:{name:string,row:number,frames:number,loop:boolean,frameTime:number}
    private currentFrame=0
    private currentPosition:Vec2=new Vec2()
    private frameSize:Vec2=new Vec2()
    private keepStatic:boolean=false

    constructor(
        public spriteSheetName:string,
        public rowCount:number,
        public columnCount:number,
        public pixelPerUnit:number,
    ){
        super()
        this.currentPlaying={name:"",row:0,frames:columnCount,loop:true,frameTime:20}
    }
    start=()=>{
        if(this.animations.length===0)throw new Error('no animation added')
        this.spriteShreet=Assets.images[this.spriteSheetName]
        this.currentPlaying=this.animations[0]
        this.frameSize.x=this.spriteShreet.naturalWidth/this.columnCount
        this.frameSize.y=this.spriteShreet.naturalHeight/this.rowCount

    }
    setCurrentAnimation(name:string){
        for(let i=0;i<this.animations.length;i++){
            let anim=this.animations[i]
            if(anim.name===name){
                this.currentPlaying=anim
                this.keepStatic=false
                break
            }
        }
    }
    addAnimations(...anims:{name:string,row:number,frameCount:number,loop:boolean,fps:number}[]){
        anims.forEach(anim=>{
            this.animations.push({
                name:anim.name,
                row:anim.row,
                frames:anim.frameCount,
                loop:anim.loop,
                frameTime:Math.floor(1000/anim.fps)
            })
        })
        
    }
    tick=(dt:number)=>{
        if(this.keepStatic){
            this.currentFrame=0
        }else{
            if(this.remainingTime<=0){
                if(this.currentFrame===this.columnCount-1){
                    this.currentFrame=0
                    if(!this.currentPlaying.loop){
                        this.keepStatic=true
                    }
                }else{
                    this.currentFrame++
                }
                this.currentPosition.x=this.currentFrame*this.frameSize.x
                this.remainingTime=this.currentPlaying.frameTime
            }    
        }
        this.currentPosition.y=this.currentPlaying.row*this.frameSize.y

        Game.viewPort.drawSprite(
            this.spriteShreet,
            this.currentPosition,
            this.frameSize,
            this.drawingPosition,
            this.pixelPerUnit,
            true
        )
        this.remainingTime-=dt
    }
}