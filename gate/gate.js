function Gate() {
    var Deferred = function() {
        var deferred = this;
        deferred.promise = new Promise(function(resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
    };
    var arrQueue = [];
    var arrResolves = [];
    var locked = false;
    var recurser = function(queue, resolves) {
        if (!queue.length) return;
        var result = queue[0]();
        if (typeof result.then === 'function') {
        		result.then(function(val) {
                resolves[0].resolve(val);
                recurser(queue.splice(1), resolves.splice(1));
            });
        } else {
            resolves[0].resolve(result);
            recurser(queue.splice(1), resolves.splice(1));
        }
    };
    this.lock = function() {
        locked = true;
    };
    this.unlock = function() {
        locked = false;
        recurser(arrQueue, arrResolves);
        arrQueue = [];
        arrResolves = [];
    };
    this.execute = function(promise) {
        if (locked) {
            arrQueue.push(promise);
            var dfd = new Deferred();
    	      arrResolves.push(dfd);
            return dfd.promise;
        } else {
            return Promise.resolve(promise());
        }
    };
}
