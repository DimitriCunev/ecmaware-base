const state = require('../code/state');
const players = require('../code/player');
const control = require('../code/control');
const math = require('../code/basicMath');

//Cheats
let aim = require('./aim')
let rec = require('./recorder')
let glow = require('./glow')
Easy = {}

Easy.setup = ()=>{
    console.log('<===Ecmaware Loaded===>');
    
    
    
}

Easy.draw = ()=>{
    aim.update()
    glow.update()
    rec.update()
}

module.exports = Easy