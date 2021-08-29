import { Vec2 } from '../DataStructure/Vec2'
import {GameObject} from '../Scripting/GameObject'
import { Hierarchy } from './Hierarchy'
export class Scene{
    GameObjects:GameObject[]=[]
    destroyNext:{obj:GameObject,destroyFrom:GameObject[]}[]=[]
    objectQueries:{objName:string,callback:Function}[]=[]
    AssetNeeded:{name:string,url:string}[]=[]
    hierarchy:Hierarchy[]=[{
        objName:"empty",
        objClass:GameObject,
        child:[]
    }]

    public Camera:{
        position:Vec2,
        rotation:number,
        zoom:number
    }={position:new Vec2(),rotation:0,zoom:1}

    private loadHierarchy(h:Hierarchy[]):GameObject[]{
        let objs:GameObject[]=[]
        h.forEach(_h=>{
            let obj=new _h.objClass(_h.objName)
            obj.world=this
            obj.children=[...this.loadHierarchy(_h.child)]
            objs.push(obj)
        })
        //this.GameObjects.push(...objs)
        return objs
    }

    loadGameObjects(){
        this.GameObjects=[...this.loadHierarchy(this.hierarchy)]
    }

    Instantiate(objType:typeof GameObject){    
        this.GameObjects.push(new objType(`newGameObject${Date.now}`))
    }

    destroyObj(name:string){
        const {obj,foundIn}=this.find(this.GameObjects,name)

        this.objectQueries.forEach(cb=>{
            if(cb.objName===name || (obj!==null && this.find(obj.children,cb.objName)!=null)){//if this obj is ever queried we put null in those places
                cb.callback(null)
            }           
        })  
        if(obj!==null)
        {
            this.destroyNext.push({obj,destroyFrom:foundIn}) 
        }

    }                        

    findObj(name:string,callBack:Function){
        callBack(this.find(this.GameObjects,name).obj) //obj found is passed through callback
        this.objectQueries.push({objName:name,callback:callBack}) //the callback is stored such that on destroying the obj the callback called again and put the value null
    }

    private find(inside:GameObject[],name:string):{obj:GameObject|null,foundIn:GameObject[]}{
        let objfound:GameObject|null=null
        let findIn=inside
        for(let i=0;i<findIn.length;i++){
            if(findIn[i].name===name){
                objfound=findIn[i]
                break
            }else{
                findIn=findIn[i].children
                let {obj,foundIn}=this.find(findIn,name)
                if(obj!==null){
                    objfound=obj
                    findIn= foundIn
                    break
                }
            }
        }

        return {obj:objfound,foundIn:findIn}
    }

}
