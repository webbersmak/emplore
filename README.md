# emplore js ![](https://summonstrike.com/images/15.png "")

constructor only dependency injection for JavaScript (ES5)

```javascript
emplore.register("item1", [], function () {  // module name, array of modules we need, the module itself

    return {
        name: "a white staff"
    };
});

emplore.register("item2", [], function () {

    return {
        name: "a fire spell"
    };
});

emplore.register("mage", ["item1", "item2"], function (item1, item2) {

    alert("a wild mage appears with " + item1.name + " and " + item2.name);

});
```

Enable Intellisense: put "emplore.intellisense.js" into the same directory as "emplore.js". Then add "<reference path="emplore.js" />" to the top of "_references.js".


All modules are registered as singletons. Register a factory module if you need multiple instances of a class.

license: MIT License 
Copyright (c) 2017 webbersmak
