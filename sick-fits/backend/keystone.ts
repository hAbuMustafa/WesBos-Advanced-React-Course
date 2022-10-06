import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { CartItem } from './schemas/CartItem';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', // how you define a credential
  identityField: 'email', // your unique identifier
  secretField: 'password', // it can be the hashed session value?
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in initial roles here (all)
  },
  passwordResetLink: {
    async sendToken(args) {
      // args are in the form of:
      // {
      //   itemId: '63376aaa2546ac31c4152a21',
      //   identity: 'hosam.am.sultan@gmail.com',
      //   token: 'qPIDqV73RRtorhgdbYQO'
      // }
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  // it could have been made without the auth thing i.e. export default config()
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        // seed only when running 'npm run seed-data'
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO: change this for rules
      isAccessAllowed: ({ session }) =>
        //   console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      // User is the TABLE and 'id' and 'name' and 'email' are the queried columns
      User: 'id name email',
    }),
  })
);
