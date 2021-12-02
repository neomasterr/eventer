[![npm](https://img.shields.io/npm/v/eventer.svg?style=flat-square)](https://www.npmjs.org/eventer)

# Eventer

Simple lightweight inheritable dependency free event emitter with minimal footprint

# Example
```JAVASCRIPT
import Eventer from 'eventer';

const ev = new Eventer();

ev.on('init', (foo, bar) => {
    console.log(foo, bar);
});

ev.emit('init', 'foo', 'bar');
```

# Inheritance (mixin)
```JAVASCRIPT
///////////////////////////
// my-super-component.js //
///////////////////////////
import {EventerMixin} from 'eventer';

function MySuperComponent(options = {on: {}}) {
    EventerMixin.call(this, options.on);

    // typeof this.eventer == 'Eventer'

    this.emit('init'); // or this.eventer.emit('init');

    setTimeout(() => {
        this.emit('init:after');
    }, 1000);
}

// mixin
Object.assign(MySuperComponent.prototype, EventerMixin.prototype);

// prototype chaining
Object.defineProperty(MySuperComponent.prototype, 'constructor', {
    value: MySuperComponent,
    writable: true,
    enumerable: false,
});

/////////////
// page.js //
/////////////
import MySuperComponent from './my-super-component';

const component = new MySuperComponent({
    on: {
        init: () => {
            console.log('Hello world!');
        },
    },
});

component.on('init:after', () => {
    console.log('After init');
});
```
