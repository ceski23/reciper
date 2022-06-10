import React from 'react';
import { RouteObject } from 'react-router';

import { urls } from 'routing/urls';

import { GoogleAuthScreen } from 'views/auth/GoogleAuthScreen';

const AuthWrapper = React.lazy(() => import('components/app/AuthWrapper'));

const authRoutes: RouteObject[] = [
  { path: urls.authRedirect.google, element: <GoogleAuthScreen /> },
  { path: '*', element: <AuthWrapper /> },
];

export default authRoutes;
