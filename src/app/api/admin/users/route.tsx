import { connection } from "@/database/dbConnection";
import { UserRepository } from "@/repositories/UserRepository";
import { createUser } from "@/usecases/admin/users/createUser";
import { fetchUsers } from "@/usecases/admin/users/fetchUsers";
import { updateUser } from "@/usecases/admin/users/updateUser";
import { NextRequest, NextResponse } from "next/server";

connection();
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "";
    const offset = searchParams.get("offset") || "";
    const searched = searchParams.get("searched") || "";

    const resp = await fetchUsers(
      { page, offset, searched },
      {
        userRepository: new UserRepository(),
      }
    );

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await createUser(body, {
      userRepository: new UserRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await updateUser(body, {
      userRepository: new UserRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
