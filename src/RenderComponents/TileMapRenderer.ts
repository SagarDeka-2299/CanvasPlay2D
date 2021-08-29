import { Assets } from "../AssetManager/Assets";
import { Vec2 } from "../DataStructure/Vec2";
import { Game } from "../Game/Game";
import { objRenderer } from "./objRenderer";

export class TileMapRenderer extends objRenderer{
    images:{name:string,subImageLocation:Vec2,subImageSize:Vec2}[]=[]
    //tileSize:Vec2
    tileOffset:Vec2
    private imageElements:HTMLImageElement[]=[]
    private rowNumber:number
    private columnNumber:number
    tileMatrix:number[] //contains index of image in imageList

    constructor(tileRows:number,tileColumns:number,...imgs:{name:string,x:number,y:number,sizeX:number,sizeY:number}[]){
        super()
        //this.tileSize=new Vec2(100,100)
        this.rowNumber=tileRows
        this.columnNumber=tileColumns
        this.tileOffset=new Vec2()
        imgs.forEach(
            img=>{
                this.images.push({
                    name:img.name,
                    subImageLocation:new Vec2(img.x,img.y),
                    subImageSize:new Vec2(
                        img.sizeX,
                        img.sizeY
                    )
                })
            }
        )
        this.tileMatrix=new Array<number>(tileRows*tileColumns)
    }

    start=()=>{
        this.gameObject.lockTransform=true
        this.images.forEach(img=>{
            let element=Assets.images[img.name]
            this.imageElements.push(element)
            //also check sub image size,location, if infinity then put natural size
            if(img.subImageLocation.x===Infinity || img.subImageLocation.y===Infinity){
                img.subImageLocation=new Vec2()
            }
            if(img.subImageSize.x===Infinity || img.subImageSize.y===Infinity){
                img.subImageSize=new Vec2(
                    element.naturalWidth,
                    element.naturalHeight
                )
            }
            
        })

        for(let i=0;i<this.rowNumber;i++){
            for(let j=0;j<this.columnNumber;j++){
                this.tileMatrix[i*this.columnNumber+j]=0
            }
        }
        
    }

    tick=()=>{
        let drawing=0
        for(let i=0;i<this.rowNumber;i++){
            for(let j=0;j<this.columnNumber;j++){
                let index=this.tileMatrix[(i*this.columnNumber+j)]
                let drawingPos=new Vec2(
                    i*(this.pixelPerUnit+this.tileOffset.x),
                    j*(this.pixelPerUnit+this.tileOffset.y)
                )
                Game.viewPort.drawSprite(
                    this.imageElements[index],
                    this.images[index].subImageLocation,
                    this.images[index].subImageSize,
                    drawingPos,
                    this.pixelPerUnit,
                    true                 
                )
                drawing++;
            }
        }
    }


}