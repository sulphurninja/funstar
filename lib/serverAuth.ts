import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import prismadb from '../lib/prismadb';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  // Remove authentication - just return empty object or mock user
  return { currentUser: null };
};

export default serverAuth;