function register(name, needs, run) {
    "use strict";

    if (!window.container) {

        window.onload = function () {
            window.container.run();
            delete window.container;
        };

        window.container = (function (activeModules, modulesToActivate) {

            function getModuleToActivate(moduleName) {
                for (var i = 0; i < modulesToActivate.length; i++) {
                    if (modulesToActivate[i][0] == moduleName) {
                        return modulesToActivate[i];
                    }
                }
            }

            function activateModule(module) {

                //name = 0, needs = 1, run = 2

                if (activeModules[module[0]]) {
                    return;
                }

                var args = [];
                module[1].forEach(function (targetModuleName) {
                    if (!activeModules[targetModuleName]) {
                        activateModule(getModuleToActivate(targetModuleName));
                    }
                    args.push(activeModules[targetModuleName]);
                });

                activeModules[module[0]] = module[2].apply(window, args);
                modulesToActivate.splice(modulesToActivate.indexOf(module), 1);
            }

            return {
                add: function (name, needs, run) {
                    modulesToActivate.push([name, needs, run]);
                },
                run: function () {
                    while (modulesToActivate.length) {
                        activateModule(modulesToActivate[0]);
                    }
                }
            };
        })([],[]);
    }

    window.container.add(name, needs, run);
}
