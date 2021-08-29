export class Behaviour{
    gameObject:any
    constructor(public enabled:boolean=true){
        this.gameObject=null
        //console.log(`script "${this.constructor.name}" is created`)
    }
    start=()=>{
        return
    }
    tick=(dt:number)=>{
        return
    }
}