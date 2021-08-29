import * as vec2 from '../DataStructure/Vec2'

export class Input{
    
    static mouse:vec2.Vec2=new vec2.Vec2(Infinity,Infinity)
    static mouseDown:boolean=false
    static keysDown:string[]=[]
    static keyUp:string=""
    static touches:vec2.Vec2[]=[]
    static touchDown:boolean=false

    static getKeyDown(k:string):boolean{
        return Input.keysDown.some(key=>key===k)
    }

    static detectInputs(element:HTMLElement){
        addEventListener('mousemove',e=>{
            Input.mouse.x=e.clientX-element.offsetLeft
            Input.mouse.y=e.clientY-element.offsetTop
        })
        addEventListener('mousedown',(e)=>{
            Input.mouseDown=true
            Input.mouse.x=e.clientX-element.offsetLeft
            Input.mouse.y=e.clientY-element.offsetTop
        })
        
        addEventListener('mouseup',()=>{
            Input.mouseDown=false
        })
    
        addEventListener('touchmove',e=>{
            e.preventDefault()
            Input.touches=[]
            for(let i=0;i<e.touches.length;i++){
                let x=e.touches[i].clientX-element.offsetLeft
                let y=e.touches[i].clientY-element.offsetTop
                Input.touches.push(new vec2.Vec2(x,y))
            }

        },{passive:false})
    
    
        addEventListener('touchstart',(e)=>{
            e.preventDefault()
            Input.touchDown=true
            Input.touches=[]
    
    
            for(let i=0;i<e.touches.length;i++){
                let x=e.touches[i].clientX-element.offsetLeft
                let y=e.touches[i].clientY-element.offsetTop
                Input.touches.push(new vec2.Vec2(x,y))
            }

        },{passive:false})
        
        addEventListener('touchend',(e)=>{
            Input.touchDown=false

            for(let i=0;i<e.touches.length;i++){
                let x=e.touches[i].clientX-element.offsetLeft
                let y=e.touches[i].clientY-element.offsetTop
                Input.touches.push(new vec2.Vec2(x,y))
            }

            let str=``
            Input.touches.forEach(t=>{
                str+=`<br>${t.x},${t.y}`
            })
            document.querySelector('.touch')!.innerHTML=str
        })
        
        addEventListener('keydown',(e)=>{
            if(!Input.keysDown.some(k=>k===e.key)){
                Input.keysDown.push(e.key)
            }
        })
        
        addEventListener('keyup',(e)=>{
            Input.keysDown.forEach((k,i)=>{
                if(k===e.key){
                    Input.keysDown.splice(i,1)
                }
            })
            Input.keyUp=e.key
            setTimeout(()=>{
                Input.keyUp=""
            },20)
        })
    }
    

}




