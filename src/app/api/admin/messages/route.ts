// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@harts/lib/db/mongodb";
// import { ContactMe } from "@harts/lib/models";
// import { verifyJWT } from "@harts/lib/auth";

// export async function GET(req: Request) {
//   try {
//     await connectToDatabase();

//     const user = await verifyJWT(req);

//     if (typeof user === "object" && user.role !== "admin") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
//     }

//     const messages = await ContactMe.find().sort({ createdAt: -1 });

//     return NextResponse.json(messages, { status: 200 });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 401 });
//     }
//     return NextResponse.json({ message: "Error" }, { status: 401 });
//   }
// }
