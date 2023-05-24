import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { repositoryId } = req.body;

      console.log('favorites repositoryId', repositoryId);

      const existingRepository = await prismadb.repository.findMany({
        where: {
          id: repositoryId
        }
      });
  
      if (!existingRepository) {
        throw new Error('Invalid ID');
      }
  
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: repositoryId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const { repositoryId } = req.query as { repositoryId: string };

      const existingRepository = await prismadb.repository.findMany({
        where: {
          id: repositoryId,
        },
      });

      if (!existingRepository) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, repositoryId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
  
   