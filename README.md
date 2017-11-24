# emplore js ![](http://summonstrike.com/images/15.png "")

Usage:

```typescript
class item1 {
    public name = "a white staff";
}

class item2 {
    public name = "a fire spell";
}

class mage {
    constructor(first: item1, second: item2) {
        alert("a wild mage appears with " + first.name + " and " + second.name);
    }
}

register("item1", [], item1);
register("item2", [], item2);
register("mage", ["item1", "item2"], mage);
```

The main module does not need to return anything. The "window.onload" event starts the modules.
All modules are registered as singletons. Create a factory module if you need multiple instances of a class.

license: MIT License, Copyright (c) 2017 webbersmak
