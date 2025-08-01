import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (!movieId || typeof movieId !== 'string') {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    if (req.method === 'GET') {
      const movie = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      return res.status(200).json(movie);
    }

    if (req.method === 'PUT') {
      const { title, description, videoUrl, thumbnailUrl, genre, duration, category, isTrending } = req.body;

      if (!title || !description || !videoUrl || !thumbnailUrl || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const movie = await prismadb.movie.update({
        where: {
          id: movieId
        },
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

      return res.status(200).json(movie);
    }

    if (req.method === 'DELETE') {
      await prismadb.movie.delete({
        where: {
          id: movieId
        }
      });

      return res.status(200).json({ message: 'Movie deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.log(error);
    
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}