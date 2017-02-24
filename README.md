# emplore js


constructor only dependency injection for JavaScript (ES5)


            window.onload = $emplore.run;

            $emplore.register('item1', [], function () {

                return {
                    name: 'a red staff'
                };
            });

            $emplore.register('item2', [], function () {

                return {
                    name: 'a fire spell'
                };
            });

            $emplore.register('mage', ['item1', 'item2'], function (item1, item2) {

                alert('a wild mage appears with ' + item1.name + ' and ' + item2.name);

            });
