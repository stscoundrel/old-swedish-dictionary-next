// Force certain date to keep tests deterministic.
jest.useFakeTimers();
jest.setSystemTime(new Date(2021, 1, 1, 1, 1, 1, 1));

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

export {}
