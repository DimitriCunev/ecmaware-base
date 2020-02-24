const state = require('../code/state');
const math = require('../code/basicMath');
const players = require('../code/player');
const control = require('../code/control');
const keyboard = require("asynckeystate");

Rec = {}
let angles = []
let recmode = false;
let index = 0;
Rec.update = ()=>{
    let me = players.me()
    if (keyboard.getAsyncKeyState(0x51)){
        angles.push([state.viewAnglesX,state.viewAnglesY])
        index = 0;
        console.log('ye');
        
    }//0x45
    if (keyboard.getAsyncKeyState(0x45)){
        if(angles[index]){
            state.viewAnglesX = angles[index][0]
            state.viewAnglesY = angles[index][1]
            index+=1;
            
        } else {index = 0}
        
        
    }
    if (keyboard.getAsyncKeyState(0x5A)){
        angles = []
        index = 0
    }

}
module.exports = Rec