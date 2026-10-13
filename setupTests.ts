import 'react'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Force certain date to keep tests deterministic.
jest.useFakeTimers();
jest.setSystemTime(new Date(2021, 1, 1, 1, 1, 1, 1));

jest.mock('next/router', () => require('next-router-mock'));

export {}
