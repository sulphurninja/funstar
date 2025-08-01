import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';
import serverAuth from '../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await serverAuth(req, res);

    const { q: query, category, limit = 50 } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Build search filters
    const searchFilters: any = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          genre: {
            hasSome: [query]
          }
        }
      ]
    };

    // Add category filter if specified
    if (category && category !== 'all') {
      searchFilters.AND = [
        { category: category }
      ];
    }

    const movies = await prismadb.movie.findMany({
      where: searchFilters,
      take: parseInt(limit as string)
    });

    return res.status(200).json(movies);

  } catch (error) {
    console.log('Search error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}