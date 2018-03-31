import EventListener from './EventListener';
import Mock from './Mock';

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

    this.onopen = undefined;
    this.onmessage = undefined;
    this.onerror = undefined;
    this.onclose = undefined;
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
  close(...args) {
    this.readyState = WebSocket.CLOSING;
    this.dispatchEvent('close', ...args);
    this.readyState = WebSocket.CLOSED;
  }
}

export default WebSocket;
