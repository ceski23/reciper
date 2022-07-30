/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { createSerializer } from '@emotion/jest';

import 'configure';
import { server } from 'mocks/server';

expect.addSnapshotSerializer(createSerializer());

beforeAll(() => server.listen({
  onUnhandledRequest: 'error',
}));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
