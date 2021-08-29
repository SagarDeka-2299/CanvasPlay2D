import * as vec2 from '../DataStructure/Vec2'

export class Canvas2d{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    constructor(selector:string,width:number=window.innerWidth,height:number=window.innerHeight)
    {
        this.canvas=document.querySelector(selector)!
        this.ctx=this.canvas.getContext('2d')!;
        this.canvas.width=width
        this.canvas.height=height
    }

    setsize(width:number,height:number){
        this.canvas.width=width
        this.canvas.height=height
    }

    setCanvasTransform(pos:vec2.Vec2,scale:vec2.Vec2,rotation:number){ //rotation indegree
        this.ctx.save()
        this.ctx.translate(pos.x,pos.y)
        this.ctx.scale(scale.x,scale.y)
        this.ctx.rotate(rotation*(Math.PI/180))
    }
    resetCanvasTransform(){ //rotation indegree
        this.ctx.restore()
    }

    drawCircle(pos:vec2.Vec2,radius:number,color:string,fraction:number){
        this.ctx.beginPath()
        this.ctx.arc(pos.x,pos.y,radius,0,2*Math.PI*fraction)
        this.ctx.fillStyle=color
        this.ctx.fill()
        this.ctx.closePath()
    }

    drawCircleWireFrame(pos:vec2.Vec2,radius:number,color:string,fraction:number){
        this.ctx.beginPath()
        this.ctx.arc(pos.x,pos.y,radius,0,2*Math.PI*fraction)
        this.ctx.strokeStyle=color
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawRect(pos:vec2.Vec2,ppu:number,color:string){ 
        this.ctx.fillStyle=color
        this.ctx.fillRect(pos.x,pos.y,ppu,ppu)   
    }

    drawRectWireFrame(pos:vec2.Vec2,ppu:number,color:string){
        this.ctx.strokeStyle=color
        this.ctx.strokeRect(pos.x,pos.y,ppu,ppu)
    }

    drawPolygon(position:vec2.Vec2,v:vec2.Vec2[],color:string){
        if(v.length<3)return;
        this.ctx.fillStyle=color;
        this.ctx.beginPath();
        this.ctx.moveTo(position.x+v[0].x,position.y+v[0].y);
        for(let i=1;i<v.length;i++){
            this.ctx.lineTo(position.x+v[i].x,position.y+v[i].y);
        }
        this.ctx.closePath();
        this.ctx.fill()
    }

    drawPolygonWireframe(position:vec2.Vec2,v:vec2.Vec2[],color:string){
        if(v.length<2)return;
        this.ctx.strokeStyle=color;
        this.ctx.beginPath();
        this.ctx.moveTo(position.x+v[0].x,position.y+v[0].y);
        for(let i=1;i<v.length;i++){
            this.ctx.lineTo(position.x+v[i].x,position.y+v[i].y);
        }
        this.ctx.stroke()
        this.ctx.closePath()      
    }

    drawSprite(imageElement:HTMLImageElement,sPos:vec2.Vec2,sSize:vec2.Vec2,dPos:vec2.Vec2,ppu:number,keepRatio:boolean){
        
        this.ctx.drawImage(
            imageElement,
            sPos.x,
            sPos.y,
            sSize.x,
            sSize.y,
            dPos.x,
            dPos.y,
            ppu,
            ppu*(keepRatio?1:sSize.x/sSize.y)
        )
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

}

