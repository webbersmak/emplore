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

                module.needs.forEach(function (targetModuleName) {
                    if (!activeModules[targetModuleName]) {
                        activateModule(getModuleToActivate(targetModuleName));
                    }
                });

                var args = [];
                module.needs.forEach(function (targetModuleName) {
                    args.push(activeModules[targetModuleName]);
                });

                activeModules[moduleName] = module.run.apply(window, args);
                removeModuleToActivate(moduleName);
            };

            return {
                add: function (name, needs, run) {
                    if (needs.length) {
                        modulesToActivate.push({ name: name, needs: needs, run: run });
                    }
                    else {
                        activeModules[name] = run();
                    }
                },
                run: function () {
                    while (modulesToActivate.length) {
                        activateModule(modulesToActivate[0]);
                    }
                }
            };
        })();
    }

    window.container.add(name, needs, run);
};
