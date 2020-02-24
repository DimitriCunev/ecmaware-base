'use strict';
const Core = require('./core');
const State = require('./state');
const memoryjs = require('memoryjs');

class Player {
    constructor(memoryAddress) {
        this.memoryAddress = memoryAddress;
    }

    get shotsFired() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_iShotsFired'), memoryjs.DWORD);
    }

    get aimPunchX() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_aimPunchAngle') + 0x4, memoryjs.FLOAT);
    }

    get aimPunchY() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset('m_aimPunchAngle'), memoryjs.FLOAT);
    }

    get team() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_iTeamNum"), memoryjs.DWORD);
    }

    get dormant() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_bDormant"), memoryjs.DWORD);
    }

    get glowIndex() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_iGlowIndex"), memoryjs.DWORD);
    }

    get flags() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_fFlags"), memoryjs.INT);
    }

    get armorValue() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_ArmorValue"), memoryjs.INT);
    }

    get x() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_vecOrigin")+ 0x4, memoryjs.FLOAT);
    }
    get y() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_vecOrigin"), memoryjs.FLOAT);
    }
    get z() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_vecOrigin")+ 0x4 + 0x4, memoryjs.FLOAT);
    }
    get spotted() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_bSpotted"), memoryjs.DWORD);
    }
    get spottedMe() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_bSpottedByMask"), memoryjs.DWORD);
    }
    get health() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_iHealth"), memoryjs.INT);
    }


    get rank() {
        return memoryjs.readMemory(Core.process.handle, this.memoryAddress + Core.getOffset("m_flDefuseLength"), memoryjs.DWORD);
    }
    
    
}

Player.getPlayers = ()=>{
    let pList = []

    for(var i = 0; i < 20; i++){
        let dwEntity = memoryjs.readMemory(Core.process.handle, Core.client.modBaseAddr + Core.getOffset("dwEntityList") + (0x10 * i), memoryjs.DWORD);
        if (dwEntity == State.localPlayer){
            Player.meIndex = i;
        }
        pList.push(new Player(dwEntity)); 
    }
    return pList
}

Player.list = []
Player.meIndex = 1
Player.init = ()=>{
    setInterval(()=>{
        Player.list = Player.getPlayers()
        
    },10)
}
Player.me = ()=>{
    return(new Player(State.localPlayer));

}

module.exports = Player;