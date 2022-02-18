import { RouteObject } from 'react-router';

import { AuthWrapper } from 'components/app/AuthWrapper';

import { urls } from 'routing/urls';

import { GoogleAuthScreen } from 'views/auth/GoogleAuthScreen';

const authRoutes: RouteObject[] = [
  { path: urls.authRedirect.google, element: <GoogleAuthScreen /> },
  { path: '*', element: <AuthWrapper /> },
];

export default authRoutes;
