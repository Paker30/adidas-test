const axios = require('axios');

jest.mock('axios');
const { discard, process, notify, select } = require('../src/actions');
const { mqtt } = require('../src/config/env');

describe('actions', () => {
  const client = {
    publish: jest.fn(),
  };
  const consoleError = jest.spyOn(global.console, 'error').mockImplementation();
  const consoleLog = jest.spyOn(global.console, 'log').mockImplementation();

  beforeEach(() => {
    client.publish.mockReset();
    consoleError.mockClear();
    consoleLog.mockClear();
  });

  describe('discard', () => {
    test('message is not valid', () => {
      discard(client)(null, Buffer.from(JSON.stringify({ id: '1234', wrongProperty: 'this is not a valid property' })));
      expect(client.publish).toBeCalledTimes(0);
    });

    test('message was valid and publication went wrong', (done) => {
      client.publish.mockRejectedValue(new Error('Something went wrong'));
      discard(client)(null, Buffer.from(JSON.stringify({ id: '1234' })));
      expect(client.publish).toBeCalledTimes(1);
      setTimeout(() => {
        expect(consoleError).toBeCalledTimes(1);
        done();
      });
    });

    test('message was valid and published', (done) => {
      client.publish.mockResolvedValue({ publish: true });
      discard(client)(null, Buffer.from(JSON.stringify({ id: '1234' })));
      expect(client.publish).toBeCalledTimes(1);
      setTimeout(() => {
        expect(consoleError).toBeCalledTimes(0);
        done();
      }, 100);
    });
  });

  describe('process', () => {
    test('message is not valid', () => {
      process(client)(null, Buffer.from(JSON.stringify({ id: '1234', wrongProperty: 'this is not a valid property' })));
      expect(client.publish).toBeCalledTimes(0);
    });

    test('message was valid and api request went wrong', (done) => {
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));
      process(client)(null, Buffer.from(JSON.stringify({ id: '1234' })));
      expect(client.publish).toBeCalledTimes(0);
      expect(axios.get).toBeCalledTimes(1);
      setTimeout(() => {
        expect(consoleError).toBeCalledTimes(1);
        done();
      }, 100);
    });

    test('message was valid and publication went wrong', (done) => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
        data: [{ active: true, consent: true, email: 'mortadelo@tia.com', newsletterId: '123' }],
      }));
      client.publish.mockRejectedValue(new Error(''));
      process(client)(null, Buffer.from(JSON.stringify({ id: '1234' })));
      expect(axios.get).toBeCalledTimes(1);
      setTimeout(() => {
        expect(client.publish).toBeCalledTimes(1);
        expect(consoleError).toBeCalledTimes(1);
        done();
      }, 100);
    });

    test('message was valid and published', (done) => {
      axios.get.mockImplementationOnce(() => Promise.resolve({
        data: [{ active: true, consent: true, email: 'mortadelo@tia.com', newsletterId: '123' }],
      }));
      client.publish.mockResolvedValue({ publish: true });
      process(client)(null, Buffer.from(JSON.stringify({ id: '1234' })));
      expect(axios.get).toBeCalledTimes(1);
      setTimeout(() => {
        expect(client.publish).toBeCalledTimes(1);
        expect(consoleError).toBeCalledTimes(0);
        done();
      }, 100);
    });
  });

  describe('notify', () => {
    test('message is not valid', () => {
      notify(client)(null, Buffer.from(JSON.stringify({
        email: 'mortadelo@tia.com',
        newsletterId: '123',
        wrongProperty: 'this is not a valid property',
      })));
      expect(consoleLog).toBeCalledTimes(0);
    });

    test('message was valid and sent', () => {
      notify(client)(null, Buffer.from(JSON.stringify({
        email: 'mortadelo@tia.com',
        newsletterId: '123',
      })));
      expect(consoleLog).toBeCalledTimes(1);
    });
  });

  describe('select', () => {
    const selector = select('selector');
    expect(selector.topic).toBe(mqtt.topics.selector);
    expect(selector.action instanceof Function).toBeTruthy();
    const processor = select('processor');
    expect(processor.topic).toBe(mqtt.topics.process);
    expect(processor.action instanceof Function).toBeTruthy();
    const notifier = select('notifier');
    expect(notifier.topic).toBe(mqtt.topics.notify);
    expect(notifier.action instanceof Function).toBeTruthy();
    const otherCase = select('otherCase');
    expect(otherCase.topic).toBe(mqtt.topics.selector);
    expect(otherCase.action instanceof Function).toBeTruthy();
  });
});
