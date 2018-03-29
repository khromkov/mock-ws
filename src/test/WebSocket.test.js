import WebSocket from '../index';

global.WebSocket = WebSocket;

describe('WebSocket', () => {
  afterEach(() => {
    WebSocket.mock.clear();
  });

  test('new WebSocket', () => {
    new WebSocket('url'); // eslint-disable-line
    expect(WebSocket.mock.instances).toHaveLength(1);
    expect(WebSocket.mock.instances[0].url).toBe('url');
  });
});
