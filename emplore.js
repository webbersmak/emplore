function register(name, needs, run) {
    "use strict";

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
            }

            function activateModule(module) {

                if (activeModules[module.name]) {
                    return;
                }

                var args = [];
                module.needs.forEach(function (targetModuleName) {
                    if (!activeModules[targetModuleName]) {
                        activateModule(getModuleToActivate(targetModuleName));
                    }
                    args.push(activeModules[targetModuleName]);
                });

                activeModules[module.name] = module.run.apply(window, args);
                modulesToActivate.splice(modulesToActivate.indexOf(module), 1);
            }

            return {
                add: function (name, needs, run) {
                    modulesToActivate.push({ name: name, needs: needs, run: run });
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
}
