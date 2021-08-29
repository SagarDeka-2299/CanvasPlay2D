import { Canvas2d } from "../Renderer/Canvas";
import { Scene } from "../Scene/Scene";
import {Assets} from '../AssetManager/Assets'
import { Vec2 } from "../DataStructure/Vec2";

export class Game{ 
    public static viewPort:Canvas2d
    public static scenes:{[key:string]:Scene}={}
    public static startScene:string
    static currentScene:Scene//empty scene
    public static settings={fps:60}


    static loadScene(name:string){

        let foundScene:Scene=Game.scenes[name]
        if(foundScene===undefined){
            throw new Error(`there is no scene named "${name}"`)
        }

        Game.currentScene=foundScene

        Assets.loadAllAssets(Game.currentScene.AssetNeeded,()=>{ //assynchronous in nature
            Game.currentScene.loadGameObjects()
        
            //console.table([...Game.currentlyExexcutingScene.GameObjects])
            const frameTime=Math.floor(1000/Game.settings.fps) //in ms
            Game.currentScene.GameObjects.forEach(({start}) => {  //run start function of each obj and thereby each script
                                                            //only once, at the beginning of the scene
                start()
            });    
            
            let currentTime=Date.now()
            const update=()=>{
                let deltaTime=Date.now()-currentTime


                //destroy if any
                Game.currentScene.destroyNext.forEach(({obj,destroyFrom})=>{

                    destroyFrom.splice(destroyFrom.indexOf(obj),1)
                })
                Game.currentScene.destroyNext=[]

                Game.currentScene.GameObjects.forEach(({update,active}) => {
                    if(active)update(deltaTime)              
                });
                

                if(deltaTime>=frameTime){
                    //console.log(`rendering ${name}`)

                    //render loop
                    Game.viewPort.setCanvasTransform(
                        Vec2.mult( Game.currentScene.Camera.position,new Vec2(-1,1)),
                        new Vec2(Game.currentScene.Camera.zoom,Game.currentScene.Camera.zoom),
                        Game.currentScene.Camera.rotation
                    )

                    Game.viewPort.clear()
                    //position canvas at camera position
                    

                    Game.currentScene.GameObjects.forEach(({render,active,visible}) => {
                        if(active && visible)render(deltaTime)
                    })
                    Game.viewPort.resetCanvasTransform()
                    currentTime=Date.now()
                }

                requestAnimationFrame(update)
            }
            requestAnimationFrame(update)
         })
    
    }


    static GameLoopStart(){
        if(Game.viewPort===null){ //we can not proceed if viewport is null
                                //as we won't be able to draw
            throw new Error("viewport not set")
        }
        if(Game.startScene===null){ 
            throw new Error("Please assign a start scene")
        }
        this.loadScene(this.startScene)
    }
}