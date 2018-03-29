const addOnToTypeEvent = type => `on${type}`;

const listenersMap = new WeakMap();

class EventListener {
  constructor() {
    listenersMap.set(this, {});
  }

  dispatchEvent(type, ...args) {
    const listeners = listenersMap.get(this);
    const listenerType = listeners[type];
    if (listenerType) {
      listenerType.forEach(l => {
        l(...args);
      });
    }

    const func = this[addOnToTypeEvent(type)];
    if (func) {
      func(...args);
    }
  }

  addEventListener(type, listener) {
    const listeners = listenersMap.get(this);
    const listenerType = listeners[type];
    if (listenerType) {
      if (!listenerType.includes(listener)) {
        listenerType.push(listener);
      }
    } else {
      listeners[type] = [listener];
    }
  }

  removeEventListener(type, listener) {
    const listeners = listenersMap.get(this);
    const listenerType = listeners[type];
    if (listenerType) {
      listeners[type] = listenerType.filter(l => l !== listener);
    }
  }
}

export default EventListener;
