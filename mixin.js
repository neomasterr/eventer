import Eventer from './eventer';

function EventerMixin(events) {
    this.emitter = new Eventer(events, this);
}

EventerMixin.prototype.on = function() {
    this.emitter.on.apply(this.emitter, arguments);
}

EventerMixin.prototype.once = function() {
    this.emitter.once.apply(this.emitter, arguments);
}

EventerMixin.prototype.emit = function() {
    this.emitter.emit.apply(this.emitter, arguments);
}

export default EventerMixin;
