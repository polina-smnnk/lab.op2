const EventEmitter = require("events");

class SmartHome extends EventEmitter {
    turnOn(device) {
        this.emit("deviceOn", device);
    }
}

class LightBulb {
    constructor(room, home) {
        this.room = room;
        this.home = home;

        this.listener = (device) => {
            if (device === this.room) {
                console.log("Light in " + this.room + " is now ON");
            }
        };

        this.home.on("deviceOn", this.listener);
    }

    disconnect() {
        this.home.off("deviceOn", this.listener);

        console.log("Light in " + this.room + " disconnected");
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

home.on("deviceOn", (device) => {
    console.log("[security] activity detected in " + device);
});

home.turnOn("kitchen");

kitchenLight.disconnect();

home.turnOn("kitchen");