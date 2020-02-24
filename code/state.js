'use strict';
const Core = require('./core');
const memoryjs = require('memoryjs');

const memoryAddress = memoryjs.readMemory(Core.process.handle, Core.engine.modBaseAddr + Core.getOffset('dwClientState'), memoryjs.DWORD);

class State {
    static get viewAnglesX() {
        return memoryjs.readMemory(Core.process.handle, memoryAddress + Core.getOffset('dwClientState_ViewAngles') + 0x4, memoryjs.FLOAT);
    }

    static set viewAnglesX(value) {
        return memoryjs.writeMemory(Core.process.handle, memoryAddress + Core.getOffset('dwClientState_ViewAngles') + 0x4, value, memoryjs.FLOAT);
    }

    static get viewAnglesY() {
        return memoryjs.readMemory(Core.process.handle, memoryAddress + Core.getOffset('dwClientState_ViewAngles'), memoryjs.FLOAT);
    }

    static set viewAnglesY(value) {
        return memoryjs.writeMemory(Core.process.handle, memoryAddress + Core.getOffset('dwClientState_ViewAngles'), value, memoryjs.FLOAT);
    }

    static get localPlayer() {
        let pointer = Core.client.modBaseAddr + Core.getOffset("dwLocalPlayer");
        return memoryjs.readMemory(Core.process.handle, pointer, memoryjs.DWORD);
    }
}

module.exports = State;