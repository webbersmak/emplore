function register(name, needs, run) {

    if (!window.container) {

        window.onload = function () {
            window.container.run();
            delete window.container;
        };

        window.container = (function () {
            var activeModules = [];
            var modulesToActivate = [];

            function getModuleToActivate(moduleName) {
                for (var i = 0; i < modulesToActivate.length; i++) {
                    if (modulesToActivate[i].name == moduleName) {
                        return modulesToActivate[i];
                    }
                }
            };

            function removeModuleToActivate(moduleName) {
                for (var i = 0; i < modulesToActivate.length; i++) {
                    if (modulesToActivate[i].name == moduleName) {
                        modulesToActivate.splice(i, 1);
                        return;
                    }
                }
            };

            function activateModule(module) {
                var moduleName = module.name;

                if (activeModules[moduleName]) {
                    return;
                }

                for (var i = 0; i < module.needs.length; i++) {
                    if (!activeModules[module.needs[i]]) {
                        activateModule(getModuleToActivate(module.needs[i]));
                    }
                }

                var args = [];
                for (var i = 0; i < module.needs.length; i++) {
                    args.push(activeModules[module.needs[i]]);
                }

                activeModules[moduleName] = module.run.apply(window, args);
                removeModuleToActivate(moduleName);
            };

            return {
                add: function (name, needs, run) {
                    if (needs.length > 0) {
                        modulesToActivate.push({ name: name, needs: needs, run: run });
                    }
                    else {
                        activeModules[name] = run();
                    }
                },
                run: function () {
                    while (modulesToActivate.length > 0) {
                        activateModule(modulesToActivate[0]);
                    }
                }
            };
        })();
    }

    window.container.add(name, needs, run);
};
