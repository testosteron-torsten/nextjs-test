import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import config from '../../../next-auth.config';

export default NextAuth({
  ...config,
});
