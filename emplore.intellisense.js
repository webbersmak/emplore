(function () {

    var log = {
        write: function (msg) {
            if (log.on) {
                intellisense.logMessage(msg);
            }
        },
        on: false
    };

    // get out if emplore isn't loaded
    if (!register) {
        log.write("emplore not found");
        return;
    }

    //save original function of register
    var originalRegister = register;

    //active modules
    var activeDeps = {};

    //track who called register
    var regs = [];

    //modules that can't activate yet
    var deferredDeps = [];

    function registerModule(name, needs, run, tryDeferred) {

        log.write("begin registerModule");

        intellisense.progress(); // keep VS happy

        if (needs.length) {

            var haveNeeds = true;
            var args = [];
            for (var i = 0; i < needs.length && haveNeeds; i++) {
                haveNeeds = activeDeps.hasOwnProperty(needs[i]);
                args.push(activeDeps[needs[i]]);
            }

            if (haveNeeds) {
                log.write("running: " + name);
                activeDeps[name] = run.apply(window, args);

                if (tryDeferred) {
                    registerDefferedModules();
                }
            }
            else if (tryDeferred) {
                log.write("deferred: " + name);
                deferredDeps.push([name, needs, run, false]);
            }
        }
        else {
            log.write("running: " + name);
            activeDeps[name] = run();

            if (tryDeferred) {
                registerDefferedModules();
            }
        }

        log.write("end registerModule");
    }

    function registerDefferedModules() {

        log.write("begin registerDefferedModules");

        for (var i = 0; i < deferredDeps.length; i++) {
            if (!activeDeps.hasOwnProperty(deferredDeps[i][0])){
                registerModule.apply(window, deferredDeps[i]);
            }
        }

        log.write("end registerDefferedModules");
    }

    register = function (name, needs, run) {
        if (regs.indexOf(name) == -1) {
            regs.push(name);
            registerModule(name, needs, run, true);
        }
    };

    intellisense.redirectDefinition(register, originalRegister);
})();
