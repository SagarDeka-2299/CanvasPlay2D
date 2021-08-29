import { GameObject } from "../Scripting/GameObject";

export interface Hierarchy{
    objName:string
    objClass:typeof GameObject
    child:Hierarchy[]
}