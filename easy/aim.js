const state = require('../code/state');
const math = require('../code/basicMath');
const players = require('../code/player');
const control = require('../code/control');
const keyboard = require("asynckeystate");
let AimClass = {}

AimClass.update = ()=>{  
    // console.log('ya');

    let me = players.me()
    let other = {x:0,y:0,z:0}
    let angleX
    let angleY

    
    if (keyboard.getAsyncKeyState(0x01)){
        try {
            players.list.forEach((e)=>{
                let dx1,dx,dy
                if(e.team!=me.team){
                    angleX = math.angleBtw(me.x,me.y,e.x,e.y);
                    angleY = math.angleBtw(0,me.z,math.distance(me.x,me.y,e.x,e.y),e.z-5);
                    dx1 = (Math.abs((-angleX+90)-state.viewAnglesX)>360-4&&Math.abs((-angleX+4)-state.viewAnglesX)<360+70);
                    dx = (Math.abs((-angleX+90)-state.viewAnglesX)<4)||dx1;
                    dy = Math.abs((-angleY)-state.viewAnglesY)<2;
                }

                if(dx&&dy&&e.health>0&&!e.dormant&&e.team!=me.team){
                    other = e;
                    throw 1;
                }
            })
        } catch (e) {
            
        }
        if(other.x!=0){
            // console.log('ye');
            if(angleX) state.viewAnglesX = math.angleLerp(state.viewAnglesX, -angleX+90 ,1)
            if(angleY) state.viewAnglesY = math.angleLerp(state.viewAnglesY, -angleY ,1)   
        }
        
    }
    
}

module.exports = AimClass