# emplore js


constructor only dependency injection for JavaScript (ES5)

```javascript
            window.onload = emplore.run;

            emplore.register('item1', [], function () {  // this module name, array of module names we need, the module itself

                return {
                    name: 'a white staff'
                };
            });

            emplore.register('item2', [], function () {

                return {
                    name: 'a fire spell'
                };
            });

            emplore.register('mage', ['item1', 'item2'], function (item1, item2) {

                alert('a wild mage appears with ' + item1.name + ' and ' + item2.name);
                
            });
```

license: CC0
