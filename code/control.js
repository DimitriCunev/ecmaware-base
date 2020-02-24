'use strict';
const Core = require('./core');
const memoryjs = require('memoryjs');

const pointer = Core.client.modBaseAddr;

class Control {
    static set dwForceJump(value) {
        return memoryjs.writeMemory(Core.process.handle, pointer + Core.getOffset('dwForceJump'), value, memoryjs.INT);
    }
}

module.exports = Control;