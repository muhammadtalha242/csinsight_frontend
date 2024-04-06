export const paths = {
  home: '/',
  // auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    papers: '/dashboard/papers',
    authors: '/dashboard/authors',
    integrations: '/dashboard/integrations',
    // account: '/dashboard/account',
    // settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
