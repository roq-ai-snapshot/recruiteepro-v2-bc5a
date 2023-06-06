import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { userPermissionValidationSchema } from 'validationSchema/user-permissions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.user_permission
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUserPermissionById();
    case 'PUT':
      return updateUserPermissionById();
    case 'DELETE':
      return deleteUserPermissionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUserPermissionById() {
    const data = await prisma.user_permission.findFirst(convertQueryToPrismaUtil(req.query, 'user_permission'));
    return res.status(200).json(data);
  }

  async function updateUserPermissionById() {
    await userPermissionValidationSchema.validate(req.body);
    const data = await prisma.user_permission.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteUserPermissionById() {
    const data = await prisma.user_permission.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
