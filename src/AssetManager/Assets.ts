export class Assets{
    static images:{[key:string]:HTMLImageElement}={}
    static sounds:{[key:string]:HTMLAudioElement}={}

    static loadAllAssets(ToLoad:{name:string,url:string}[],callback:Function){ //we will do sprite initialisation only in the callback 
                                                                                //as it will be called only if all images are loaded
            Assets.images={}
            Assets.sounds={}
            let counter:number=0 //keep track of how many loaded
            let total:number=ToLoad.length
            if(total===0){
                callback() //if no images there then just call the callback
                return
            }
            ToLoad.forEach(asset=>{
                if(/(.jpg|.jpeg|.png)$/.test(asset.url))//if image type
                {
                    let image=new Image()
                    image.src=asset.url
                    image.addEventListener('load',()=>{
                        Assets.images[asset.name]=image
                        counter++
                        if(counter<total){
                            return
                        }
                        callback() //reaches it after all images are attemted to load
                    }) 
                    image.addEventListener('error',(e)=>{
                        throw e
                    }) 
                }
                else if(/(.mp3|.ogg)$/.test(asset.url)){

                    let sound=new Audio()
                    sound.src=asset.url
                    sound.preload='auto'
                    sound.addEventListener('loadeddata',()=>{
                        Assets.sounds[asset.name]=sound
                        counter++
                        if(counter<total){
                            return
                        }
                        callback() //reaches it after all images are attemted to load
                    }) 
                    sound.addEventListener('error',(e)=>{
                        throw e
                    })
                }

            })
    }


}
