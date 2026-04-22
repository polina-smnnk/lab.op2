function asyncFilterCallback(items, handler, done) {
    let passed = [];
    let processed = 0;

    for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
            handler(items[i], result => {

                if (result) passed.push(items[i]);

                processed++;

                if (processed === items.length) {
                    done(passed);
                }

            });
        }, 200);
    }
}


function asyncFilterPromise(items, handler, signal) {
    return new Promise(async (resolve, reject) => {

        let output = [];

        for (const item of items) {

            if (signal?.aborted) {
                return reject("Stopped");
            }

            await new Promise(r => setTimeout(r, 200));

            if (await handler(item)) {
                output.push(item);
            }
        }

        resolve(output);
    });
}


asyncFilterPromise(
    [10, 15, 20, 25],
    value => value > 18
).then(console.log);


async function start() {
    const data = await asyncFilterPromise(
        [3, 6, 9, 12],
        value => value % 3 === 0
    );

    console.log(data);
}

start();


const controller = new AbortController();

asyncFilterPromise(
    [1,2,3,4,5,6],
    value => value > 2,
    controller.signal
)
.then(console.log)
.catch(console.log);

setTimeout(() => controller.abort(), 300);