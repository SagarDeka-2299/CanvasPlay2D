export class Vec2{
    constructor(public x:number=0,public y:number=0){}   
    static normalise(vec:Vec2){
        vec.x/=Vec2.magnitude(vec)
        vec.y/=Vec2.magnitude(vec)
    }
    static magnitude(vec:Vec2):number{
        return Math.sqrt(vec.x**2+vec.y**2)
    }
    static dot(vec1:Vec2,vec2:Vec2):number{
        return vec1.x*vec2.x+vec1.y*vec2.y;
    }
    static cross(vec1:Vec2,vec2:Vec2):number{
        return vec1.x*vec2.y-vec1.y*vec2.x;
    }
    static mult(vec1:Vec2,vec2:Vec2):Vec2{
        return new Vec2(vec1.x*vec2.x,vec1.y*vec2.y);
    }
    static add(vec1:Vec2,vec2:Vec2):Vec2{
        return new Vec2(vec1.x+vec2.x,vec1.y+vec2.y);
    }
    static sub(vec1:Vec2,vec2:Vec2):Vec2{
        return new Vec2(vec1.x-vec2.x,vec1.y-vec2.y);
    }
    static constMult(vec1:Vec2,k:number):Vec2{
        return new Vec2(vec1.x*k,vec1.y*k);
    }
}



