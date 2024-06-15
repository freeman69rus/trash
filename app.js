"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tuyapi_1 = __importDefault(require("tuyapi"));
const device = new tuyapi_1.default({
    id: 'bfb592c9b4cc3291d612fp',
    key: '-^y`lBjQm+i7pkEx',
    ip: '192.168.1.115'
});
let stateHasChanged = false;
// Find device on network
device.find().then(() => {
    // Connect to device
    device.connect();
});
// Add event listeners
device.on('connected', () => {
    console.log('Connected to device!');
});
device.on('disconnected', () => {
    console.log('Disconnected from device.');
});
device.on('error', error => {
    console.log('Error!', error);
});
device.on('data', data => {
    console.log('Data from device:', data);
    console.log(`Boolean status of default property: ${data.dps['1']}.`);
    // Set default property to opposite
    if (!stateHasChanged) {
        // @ts-ignore
        device.set({ set: !(data.dps['1']) });
        // Otherwise we'll be stuck in an endless
        // loop of toggling the state.
        stateHasChanged = true;
    }
});
// Disconnect after 10 seconds
setTimeout(() => { device.disconnect(); }, 10000);
