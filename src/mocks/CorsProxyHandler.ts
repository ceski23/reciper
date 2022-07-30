/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
import { RequestHandler, ResponseResolver, MockedRequest } from 'msw';

export class CorsProxyHandler extends RequestHandler<{
  proxiedUrlMatcher: string | RegExp,
  header: string
}> {
  constructor(
    proxiedUrlMatcher: string | RegExp,
    resolver: ResponseResolver,
  ) {
    super({
      info: {
        header: '/',
        proxiedUrlMatcher,
      },
      resolver,
    });
  }

  predicate(req: MockedRequest): boolean {
    if (!req.url.href.includes(import.meta.env.VITE_CORS_PROXY as string)) return false;

    const proxiedUrl = decodeURIComponent(req.url.search.slice(1));

    if (typeof this.info.proxiedUrlMatcher === 'string') {
      return proxiedUrl === this.info.proxiedUrlMatcher;
    }
    return this.info.proxiedUrlMatcher.test(proxiedUrl);
  }

  log(req: MockedRequest): void {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.url.toString()}`);
  }
}
