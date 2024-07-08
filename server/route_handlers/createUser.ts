import { Request, Response } from "express";
import { CreateUserRequest, CreateUserResponse } from "../../shared/types";
import prisma from "../utilities/Prisma";

export default async function createUser(req: Request<undefined, undefined, CreateUserRequest>, res: Response<CreateUserResponse>) {
  console.log(`POST /createUser ${req.body.email}`);
  const email = req.body.email;
  try {
      await prisma.user.create({
      data: {email}
    });
  } catch (e) {
    console.error(e);
    res.json({success: false});
    return;
  }
  res.json({success: true});
}