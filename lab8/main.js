const AuthProxy = require('./proxy.js');

async function run() {
    let myProxy = new AuthProxy("api_key", "secret_key_123");
    let data1 = await myProxy.sendRequest("https://jsonplaceholder.typicode.com/todos/1");
    console.log("Result 1:", data1.id);

    myProxy.changeStrategy("jwt", "expired_token_test");
    
    let data2 = await myProxy.sendRequest("https://jsonplaceholder.typicode.com/todos/2");
    console.log("Result 2:", data2.id);
    
    let data3 = await myProxy.sendRequest("https://jsonplaceholder.typicode.com/todos/3");
    console.log("Result 3:", data3.id);
}

run();