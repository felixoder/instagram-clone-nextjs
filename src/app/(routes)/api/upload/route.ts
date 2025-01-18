import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
   /*
    Creating a group named ig-photos
    const info =  await pinata.groups.create({
            name: 'ig-photos', 
            isPublic: true
    })
        console.log({info})
    */
    const uploadData = await pinata.upload.file(file,{
            groupId: "01943d11-2cb5-72a6-9420-58a9c393bbd4",
        })
    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

