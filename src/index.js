import EventListener from './EventListener';
import Mock from './Mock';

const privateData = new WeakMap();

const BINARY_TYPES = ['blob', 'arraybuffer'];
const PROP_EVENTS = ['onopen', 'onmessage', 'onerror', 'onclose'];
const READY_STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];

class WebSocket extends EventListener {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  static isUseJest = true;
  static mock = new Mock();

  constructor(url, protocols) {
    super();

    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;

    WebSocket.mock.addInstance(this);

    if (WebSocket.isUseJest && jest) {
      this.send = jest.fn(this.send.bind(this));
      this.close = jest.fn(this.close.bind(this));
    }

    READY_STATES.forEach(state => {
      Object.defineProperty(this, state, {
        enumerable: true,
        get() {
          return WebSocket[state];
        },
      });
    });

    PROP_EVENTS.forEach(event => {
      Object.defineProperty(this, event, {
        enumerable: true,
        set(value) {
          if (typeof value === 'function') {
            privateData.get(this)[event] = value;
          } else {
            privateData.get(this)[event] = null;
          }
        },
        get() {
          return privateData.get(this)[event];
        },
      });
    });

    Object.defineProperty(this, 'bufferedAmount', {
      enumerable: true,
      get() {
        return 0;
      },
    });
    Object.defineProperty(this, 'extensions', {
      enumerable: true,
      get() {
        return '';
      },
    });
    Object.defineProperty(this, 'protocol', {
      enumerable: true,
      get() {
        return '';
      },
    });

    privateData.set(this, {
      binaryType: 'blob',
      onopen: null,
      onmessage: null,
      onerror: null,
      onclose: null,
    });
  }

  get binaryType() {
    return privateData.get(this).binaryType;
  }

  set binaryType(type) {
    if (BINARY_TYPES.includes(type)) {
      privateData.get(this).binaryType = type;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`The provided value '${type}' is not a valid enum value of type BinaryType.`);
    }
  }

  open(...args) {
    this.readyState = WebSocket.OPEN;
    this.dispatchEvent('open', ...args);
  }
  send() {
    const { readyState } = this;
    if (readyState === WebSocket.CLOSING || readyState === WebSocket.CLOSED) {
      throw new Error('WebSocket is already in CLOSING or CLOSED state');
    }
  }
  close(code = 1000, reason = '') {
    this.readyState = WebSocket.CLOSED;
    this.dispatchEvent('close', new CloseEvent('close', { wasClean: true, code, reason }));
  }
}

export default WebSocket;
