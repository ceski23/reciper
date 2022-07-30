import fs from 'node:fs/promises';
import path from 'node:path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { RequestHandler, context } from 'msw';

import { CorsProxyHandler } from 'mocks/CorsProxyHandler';

import { lemoniada } from 'services/recipes/providers/fixtures/aniastarmach';

export const handlers: RequestHandler[] = [
  new CorsProxyHandler('https://aniastarmach.pl/przepis/najlepsza-lemoniada/', (req, res) => (
    res(context.text(lemoniada))
  )),

  new CorsProxyHandler('https://test.test/przepis/', (req, res) => (
    res(context.text('test'))
  )),

  new CorsProxyHandler(/\.(jpg|jpeg)$/, async (req, res, ctx) => {
    const fixturePath = path.resolve(__dirname, '../fixtures/image.jpg');
    const imageBuffer = await fs.readFile(fixturePath);

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      context.body(imageBuffer),
    );
  }),
];
