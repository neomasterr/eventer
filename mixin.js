import Eventer from './eventer';

function EventerMixin(events) {
    this.eventer = new Eventer(events);
}

EventerMixin.prototype.on = function() {
    this.eventer.on.apply(this.eventer, arguments);
}

EventerMixin.prototype.once = function() {
    this.eventer.once.apply(this.eventer, arguments);
}

EventerMixin.prototype.emit = function() {
    this.eventer.emit.apply(this.eventer, arguments);
}

export default EventerMixin;
