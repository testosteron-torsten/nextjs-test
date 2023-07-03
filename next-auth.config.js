import Providers from 'next-auth/providers';

export default {
  providers: [
    Providers.GitHub({
      clientId: '3d3064cc33740bd7d39c',
      clientSecret: '93fc6fa1ffabffbf759ddaadc901fd2816fdcdbd',
    }),
  ],
};
