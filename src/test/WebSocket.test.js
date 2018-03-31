import WebSocket from '../index';

global.WebSocket = WebSocket;

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
    const onclose = jest.fn(() => {
      expect(ws.readyState).toBe(WebSocket.CLOSING);
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
});
