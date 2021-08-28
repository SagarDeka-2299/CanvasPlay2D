# CanvasPlay2D is a small library to create HTML5 based game in javascipt

## start a basic game
- Create child class of GameObject and add Components
```typescript
    class player extends GameObject{
        constructor(){
            super();

            let movementComponent=new Move();//we can create the script for Move

            this.addComponents(movementComponent)
        }
    }
```

- Create script or component from Behaviour class
```typescript
    class Move extends Behaviour{//GameObject scripts extends Behaviour class
        start=()=>{
            //start runs when scene loaded
        }
        tick=(deltaTime:number)=>{
            //runs at each gameloop
            //deltaTime is the time from last loop
        }

        //any other variables are to be declared outside constructor and initialise inside constructor
        // or initialise outside constructor
    }
```
- for Input look at Input class
- Create a Scene
```typescript
    let scene1=new Scene()

    //add hierarchy of objects to specify parent child relation

    scene1.hierarchy=[
        {
            objName:'player',
            objClass:player,
            child:[
                {
                    objName:'ChildObj1',
                    objClass:childClassName,//need to create
                    child:[]//as it has no children                
                }
            ]
        }
    ]
    
    //if we use any image assets, audio assets the specify them
    scene1.AssetNeeded={
        {name:'my image',//this name can be used in script to use this asset
        url:'myimage.jpg'}'
    }

```
- setup the Game
```typescript

    //setting (optional)
    Game.settings={fps:60}
    //scene (compulsory)
    Game.scenes={
        "level1":scene1, //level name on the L.H.S will be used to load this scene from other scene
    }

    Game.startScene="level1"

    Game.viewPort=new Canvas2D('canvas') //the argument is tag name or class name or id name in HTML

    Input.detectInput(Game.viewPort.canvas)//takes HTMLElement is argument, on which input is to detect
    //At last
    Game.GameLoopStart()
```
