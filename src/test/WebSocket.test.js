import WebSocket from '../index';

global.WebSocket = WebSocket;

const WEBSOCKET_KEYS = [
  'CONNECTING',
  'OPEN',
  'CLOSING',
  'CLOSED',
  'url',
  'readyState',
  'bufferedAmount',
  'onopen',
  'onerror',
  'onclose',
  'extensions',
  'protocol',
  'onmessage',
  'binaryType',
  'close',
  'send',
  'addEventListener',
  'removeEventListener',
  'dispatchEvent',
];

describe('WebSocket', () => {
  afterEach(() => {
    WebSocket.mock.clear();
  });

  test('create new', () => {
    const ws = new WebSocket('url');
    expect(WebSocket.mock.instances).toHaveLength(1);
    expect(WebSocket.mock.instances[0].url).toBe('url');
    expect(ws.readyState).toBe(WebSocket.CONNECTING);
  });

  test('instances keys', () => {
    const ws = new WebSocket('url');
    WEBSOCKET_KEYS.forEach(key => {
      expect(ws[key]).toBeDefined();
    });
  });

  test('reassign "on" event handle props', () => {
    const ws = new WebSocket('url');
    expect(ws.onmessage).toBeNull();
    ws.onmessage = 2;
    expect(ws.onmessage).toBeNull();
  });

  test('open', () => {
    const ws = new WebSocket('url');
    const onopen = jest.fn();
    ws.onopen = onopen;
    ws.open();
    expect(onopen).toHaveBeenCalledTimes(1);
    expect(ws.readyState).toBe(WebSocket.OPEN);
  });

  test('close', () => {
    const ws = new WebSocket('url');
    const onclose = jest.fn(event => {
      expect(ws.readyState).toBe(WebSocket.CLOSED);
      expect(event.wasClean).toBe(true);
      expect(event.reason).toBe('');
      expect(event.code).toBe(1000);
    });
    ws.onclose = onclose;
    ws.close();
    expect(onclose).toHaveBeenCalledTimes(1);
    expect(ws.readyState).toBe(WebSocket.CLOSED);
  });

  test('send', () => {
    const ws = new WebSocket('url');
    ws.send();
    ws.close();
    expect(() => {
      ws.send();
    }).toThrow();
  });

  test('without jest', () => {
    global.WebSocket.isUseJest = false;
    const ws = new WebSocket('url');
    expect(ws.send.mock).toBe(undefined);
    expect(ws.close.mock).toBe(undefined);
    ws.send();
    ws.close();
  });

  test('binaryType', () => {
    const ws = new WebSocket('url');
    expect(ws.binaryType).toBe('blob');
    ws.binaryType = 'test';
    expect(ws.binaryType).toBe('blob');
    ws.binaryType = 'arraybuffer';
    expect(ws.binaryType).toBe('arraybuffer');
  });
});
