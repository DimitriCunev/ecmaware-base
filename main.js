const rp = require('request-promise');
const memoryjs = require('memoryjs');
const Core = require('./code/core');

let csgoProcess = null;
let clientPanoramaDll = null;
let engineDll = null;
let offsets = null;

function openGame(){
  try {
    csgoProcess = memoryjs.openProcess('csgo.exe');
    clientPanoramaDll = memoryjs.findModule("client.dll", csgoProcess.th32ProcessID);
    engineDll = memoryjs.findModule("engine.dll", csgoProcess.th32ProcessID);
    console.log('Opened CS:GO process');    
  } catch (error) {
    console.log(`Couldn't find CS:GO process`)
  }
}

const init = async () => {
  openGame()
  let hazeDumperOffsets = await rp('https://raw.githubusercontent.com/frk1/hazedumper/master/csgo.json');
  offsets = JSON.parse(hazeDumperOffsets);
  offsets = Object.assign({}, offsets.signatures, offsets.netvars);
  Core.init(csgoProcess, clientPanoramaDll, engineDll, offsets);
}

init()
