const state = require('../code/state');
const math = require('../code/basicMath');
const players = require('../code/player');
const control = require('../code/control');
const keyboard = require("asynckeystate");
const memoryjs = require('memoryjs');
const Core = require('../code/core');
Glow = {}

Glow.update = ()=>{
    me = players.me()

    players.list.forEach((entity)=>{

        if(entity.team!=me.team&&!entity.dormant){
            let color = [0,255,0]
            let dwGlowObjectManager = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwGlowObjectManager"), memoryjs.DWORD);
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x4), color[0], "float");
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x8), color[1], "float");
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0xC), color[2], "float");
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x10), 1.0, "float");

            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x24), 1, "bool");
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x25), 0, "bool");
            memoryjs.writeMemory(Core.process.handle, dwGlowObjectManager + (entity.glowIndex * 0x38 + 0x26), 0, "bool");
        }

        
    })
}

module.exports = Glow