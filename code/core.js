const memoryjs = require('memoryjs');

let CoreModule = {
    process: null,
    client: null,
    engine: null,
    offsets: null,
};

CoreModule.init = (process, client, engine, offsets) => {
    CoreModule.process = process;
    CoreModule.client = client;
    CoreModule.engine = engine;
    CoreModule.offsets = offsets;
    let player = require('./player')
    player.init()

    let easy = require('../easy/draw')
    easy.setup();
    setInterval(() => {
        easy.draw()   
    }, 1);

    
    
};


CoreModule.getOffset = (name) => {
    if (!CoreModule.offsets.hasOwnProperty(name)) {
        throw `Can't allocate offset ${name}`;
    }

    return parseInt(CoreModule.offsets[name]);
};

CoreModule.readMemory = (offset, dataType) => {
    dataType = dataType || memoryjs.INT;

    return memoryjs.readMemory(CoreModule.process, offset, dataType);
};


module.exports = CoreModule;