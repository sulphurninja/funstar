import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);

    if (req.method === 'GET') {
      const { category, trending } = req.query;
      
      let whereClause: any = {};
      
      if (category && category !== 'all') {
        whereClause.category = category;
      }
      
      if (trending === 'true') {
        whereClause.isTrending = true;
      }

      const movies = await prismadb.movie.findMany({
        where: whereClause
      });
      
      return res.status(200).json(movies);
    }

    if (req.method === 'POST') {
      const { title, description, videoUrl, thumbnailUrl, genre, duration, category, isTrending } = req.body;

      if (!title || !description || !videoUrl || !thumbnailUrl || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const movie = await prismadb.movie.create({
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genre: genre || [],
          duration: duration || '',
          category,
          isTrending: isTrending || false
        }
      });

      return res.status(201).json(movie);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}