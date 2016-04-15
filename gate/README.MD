Gate
====
The ```Gate``` object represents a queue of functions. A function can be passed to any instance of a Gate object using ```Gate.execute(func)```. If the Gate is in the "unlocked" state, the passed function is immediately executed. If the gate is "locked," however, the function is added to a queue. The moment the gate is unlocked, the functions in the queue are executed in series.

If the function passed to ```Gate.execute``` returns a promise, any values passed to the returned promise via ```promise.resolve``` will be passed to the promise object returned by ```Gate.execute```.

A Gate instance can be locked with ```Gate.lock()``` and unlocked with ```Gate.unlock()```.
