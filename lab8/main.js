const AuthProxy = require('./proxy.js');

async function run() {
    let myProxy = new AuthProxy("api_key", "secret_key_123");
    let data = await myProxy.sendRequest("https://jsonplaceholder.typicode.com/todos/1");
    console.log(data);
}

run();