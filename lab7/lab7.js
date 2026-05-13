const EventEmitter = require("events");

class SmartHome extends EventEmitter {
    turnOn(device) {
        this.emit("deviceOn", device);
    }
}

class LightBulb {
    constructor(room, home) {
        this.room = room;

        home.on("deviceOn", (device) => {
            if (device === this.room) {
                console.log("Light in " + this.room + " is now ON");
            }
        });
    }
}

class AirConditioner {
    constructor(room, home) {
        this.room = room;

        home.on("deviceOn", (device) => {
            if (device === this.room) {
                console.log("Air conditioner in " + this.room + " started");
            }
        });
    }
}

const home = new SmartHome();

const kitchenLight = new LightBulb("kitchen", home);
const kitchenAC = new AirConditioner("kitchen", home);

home.turnOn("kitchen");