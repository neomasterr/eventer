import EventerMixin from './mixin';

/**
* Базовый класс с обработкой событий
*
* https://github.com/neomasterr/eventer
*/
function Eventer(events = {}) {
    this.events = {};

    if (typeof events == 'object' && events !== null) {
        for (let event in events) {
            this._listen(event, {callback: events[event]});
        }
    }
}

/**
 * Внутренний метод для добавления событий
 * @param {String} event   Имя события
 * @param {Object} options Параметры
 */
Eventer.prototype._listen = function(event, options) {
    const callbacks = [];
    if (typeof options.callback == 'function') {
        callbacks.push(options.callback);
    } else if (typeof options.callback == 'object' && Array.isArray(options.callback)) {
        options.callback.filter(callback => typeof callback == 'function').forEach(callback => {
            callbacks.push(callback);
        });
    }

    if (!this.events[event]) {
        this.events[event] = [];
    }

    callbacks.forEach(callback => {
        const data = {
            once: options.once || false,
            callback,
        }

        this.events[event].push(data);
    });

    return this.events[event].length;
}

/**
 * Подписываемся на событие
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
Eventer.prototype.on = function(event, callback) {
    return this._listen(event, {
        callback,
    });
}

/**
 * Одноразовое событие
 * @param {String}   event    Имя события
 * @param {Function} callback Вызываемый метод
 */
Eventer.prototype.once = function(event, callback) {
    return this._listen(event, {
        once: true,
        callback,
    });
}

/**
 * Вызов события
 * @param  {String}  event Имя события
 * @param  {Object}  data  Данные
 * @return {Boolean}       true если выполнение было прервано, undefined если нет подписчиков
 */
Eventer.prototype.emit = function(event) {
    // нет обработчиков
    if (!this.events[event] || !this.events[event].length) {
        return;
    }

    const args = [].slice.call(arguments, 1);

    const interrupted = this.events[event].some(item => {
        // возврат true означает прерывание вызова событий (handled)
        return item.callback.apply(this, args) === true;
    });

    this.events[event] = this.events[event].filter(item => !item.once);

    return interrupted;
}

export {
    Eventer as default,
    EventerMixin,
}
