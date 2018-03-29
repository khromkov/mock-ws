import EventListener from '../EventListener';

describe('EventListener', () => {
  describe('addEventListener', () => {
    test('add event listener', () => {
      const eventListener = new EventListener();
      const fn = jest.fn();

      eventListener.addEventListener('click', fn);
      eventListener.dispatchEvent('click');

      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('add same event listener', () => {
      const eventListener = new EventListener();
      const fn = jest.fn();

      eventListener.addEventListener('click', fn);
      eventListener.addEventListener('click', fn);
      eventListener.dispatchEvent('click');

      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('add same type event listener', () => {
      const eventListener = new EventListener();
      const fn1 = jest.fn();
      const fn2 = jest.fn();

      eventListener.addEventListener('click', fn1);
      eventListener.addEventListener('click', fn2);
      eventListener.dispatchEvent('click');

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeEventListener', () => {
    test('remove empty listener', () => {
      const eventListener = new EventListener();
      const fn = jest.fn();
      eventListener.removeEventListener('click', fn);
    });

    test('remove listener', () => {
      const eventListener = new EventListener();
      const fn = jest.fn();

      eventListener.addEventListener('click', fn);
      eventListener.removeEventListener('click', fn);
      eventListener.dispatchEvent('click');
      expect(fn).toHaveBeenCalledTimes(0);
    });
  });
});

describe('"on" event listener', () => {
  test('set "on" event', () => {
    const eventListener = new EventListener();
    const fn = jest.fn();

    eventListener.onclick = fn;
    eventListener.dispatchEvent('click');
    expect(fn).toHaveBeenCalledTimes(1);

    eventListener.onclick = null;
    eventListener.dispatchEvent('click');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
