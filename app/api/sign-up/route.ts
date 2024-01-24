"use prisma";

import { prisma } from "@/lib/prisma";
import { validateEmail } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as any;

    // It's checking the form validity

    const errs = [] as { input: string; error: string }[];

    if (name.length < 6)
      errs.push({
        input: "name",
        error: "Votre nom doit contenir plus de 6 caractères",
      });

    if (!/^([A-Za-z]+[\-\']?)?$/.test(name))
      errs.push({
        input: "name",
        error: "Votre nom est invalide",
      });

    if (!validateEmail(email))
      errs.push({
        input: "email",
        error: "Votre adresse email est invalide",
      });

    if (password.length < 6)
      errs.push({
        input: "password",
        error: "Votre mot de passe doit contenir plus de 6 caractères",
      });

    if (errs.length > 0) return NextResponse.json(errs[0], { status: 400 });

    // It's checking if the email is already in used

    const emailDb = await prisma.user.findMany({
      where: {
        email,
      },
    });

    if (emailDb.length > 0)
      return NextResponse.json(
        {
          input: "email",
          error: "Cette adresse email est déjà utilisée",
        },
        { status: 409 }
      );

    // Everything is fine so it's creating the account in the database

    const accountCreation = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(
      { data: accountCreation, success: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "An error has occurred while performing your request!",
      },
      { status: 500 }
    );
  }
}
