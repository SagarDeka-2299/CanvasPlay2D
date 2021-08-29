import {Behaviour} from './Behaviour'
import { Game } from '../Game/Game'
import { objRenderer } from '../RenderComponents/objRenderer'
import { Scene } from '../Scene/Scene'
import { Vec2 } from '../DataStructure/Vec2'

export class GameObject{
    world:Scene|null=null
    children:GameObject[]=[]
    private components:Behaviour[]=[]
    renderComponents:objRenderer[]=[]
    
    constructor(
        public name:string=`newGameObject${Date.now}`,
        public position:Vec2=new Vec2(),
        public scale:Vec2=new Vec2(1,1),
        public rotation:number=0,
        public active:boolean=true,
        public visible:boolean=true,
        public lockTransform:boolean=false
    ){
    }

    update=(dt:number)=>{
        let oldPosition=this.position
        let oldScale=this.scale
        let oldRotation=this.rotation
        this.components.forEach(({tick,enabled})=>{
            if(enabled){
                tick(dt);
            }
        })
        this.children.forEach(({update})=>{
            update(dt)
        })
        if(this.lockTransform){
            this.position=oldPosition
            this.scale=oldScale
            this.rotation=oldRotation
        }
    }

    render=(dt:number)=>{
        Game.viewPort.setCanvasTransform(this.position,this.scale,this.rotation)
        this.renderComponents.forEach(({tick,enabled})=>{
            if(enabled){
                tick(dt);
            }
        })
        this.children.forEach(({render})=>{
            render(dt)
        })
        Game.viewPort.resetCanvasTransform()
    }

    start=()=>{
        this.components.forEach(({start})=>{
            start();
        })
        this.renderComponents.forEach(({start})=>{
            start();
        })
        this.children.forEach(({start})=>{
            start()
        })
    }
    addComponents(..._comp:Behaviour[]){
        
        _comp.forEach(comp=>{
            comp.gameObject=this
            if(comp instanceof objRenderer){
                this.renderComponents.push(comp)
                return
            }
            this.components.push(comp)}
        )
        //console.log(`${comp.constructor.name} script added`)
    }

    getComponent(type:string):Behaviour|null{       
        let script:Behaviour|null=null;
        if(/(Renderer)$/.test(type)){
            this.renderComponents.forEach(comp=>{
                if(comp.constructor.name=== type){
                    script=comp;
                }
            })
        }else{
            this.components.forEach(comp=>{
                if(comp.constructor.name=== type){
                    script=comp
                }
            })
        }
        return script
    }


}