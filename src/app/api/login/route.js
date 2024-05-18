import prisma from "@/lib/db/prisma";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";

export const POST = async (request) => {
  const { password, email } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  
  if (user) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);

    const result = {
      ...userWithoutPass,
      accessToken,
    };
    console.log("🚀 ~ POST ~ result:", result);
    return Response.json(result);
  } else
    return Response.json(
      {
        message: "Unathenticated",
      },
      {
        status: 401,
      }
    );
};
