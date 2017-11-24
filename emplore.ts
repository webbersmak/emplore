function register(name: string, needs: string[], run: Function) {
    interface IModule {
        name: string;
        needs: string[];
        run: Function;
    }

    interface MyWindow extends Window {
        container: container;
    }

    class container {
        private readonly modulesToActivate: Array<IModule> = [];
        private readonly activeModules: Array<IModule> = [];

        private getModuleToActivate(name: string) {
            for (var i = 0; i < this.modulesToActivate.length; i++) {
                if (this.modulesToActivate[i].name === name) {
                    return this.modulesToActivate[i];
                }
            }
        }

        private activateModule(module: IModule) {
            if (!this.activeModules[module.name]) {
                var args: Array<Function | null> = [null];
                module.needs.forEach((name: string): void => {
                    if (!this.activeModules[name]) {
                        this.activateModule(<IModule>this.getModuleToActivate(name));
                    }
                    args.push(this.activeModules[name]);
                });

                this.activeModules[module.name] = new (Function.prototype.bind.apply(module.run, args));
                this.modulesToActivate.splice(this.modulesToActivate.indexOf(module), 1);
            }
        }

        public add(name, needs, run) {
            this.modulesToActivate.push({ name: name, needs: needs, run: run });
        }

        public run = () => {
            while (this.modulesToActivate.length) {
                this.activateModule(this.modulesToActivate[0]);
            }
        }
    }

    if (!(<MyWindow>window).container) {
        (<MyWindow>window).container = new container();
        (<MyWindow>window).onload = (<MyWindow>window).container.run;
    }

    (<MyWindow>window).container.add(name, needs, run);
}
