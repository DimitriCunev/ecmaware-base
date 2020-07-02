const state = require('../code/state');
const players = require('../code/player');
const control = require('../code/control');
const math = require('../code/basicMath');


const
    io = require("socket.io-client"),
    client = io.connect("http://localhost:3000");
//Cheats
let aim = require('./aim')
let glow = require('./glow')
let aimon = true;
let glowon = true;
Easy = {}
let smoothdata = {smoothX:0.5,smoothY:0.5}
let glowdata = {ally:[45,209,19],enemy:[255,0,0]}
Easy.setup = ()=>{
    console.log('<===ecmaware Loaded===>');
    console.log('Please launch your GUI.exe to configure the cheat.')
    console.log('Do not close this window!')
    console.log('Made by Typical Exploiter YT')
    console.log('UPDATE EVERYDAY!!')
}

Easy.draw = ()=>{
    aimon?aim.update(smoothdata):0
    glowon?glow.update(glowdata):0
}


client.on('connect',()=>{
    console.log('Connected to GUI')
})
client.on('glowdata',(data)=>{
    glowdata = data
})
client.on('aimdata',(data)=>{
    smoothdata = data
})

client.on('glowtoggle',(data)=>{
    glowon = !glowon
})
client.on('aimtoggle',(data)=>{
    aimon = !aimon
})
module.exports = Easy