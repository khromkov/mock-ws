import EventListener from './EventListener';
import Mock from './Mock';

class WebSocket extends EventListener {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  static mock = new Mock();

  constructor(url, protocols) {
    super();

    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;

    WebSocket.mock.addInstance(this);
  }
}

export default WebSocket;
