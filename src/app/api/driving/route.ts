import { NextResponse } from "next/server";

type naverCoord = naver.maps.Coord | naver.maps.CoordLiteral;

const headers = new Headers();
headers.append(
  "X-NCP-APIGW-API-KEY-ID",
  process.env.NEXT_NAVER_CLIENT_ID as string
);
headers.append(
  "X-NCP-APIGW-API-KEY",
  process.env.NEXT_NAVER_CLIENT_SECRET as string
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const goal = searchParams.get("goal");

  if (!start || !goal) {
    return NextResponse.json({
      error: "Start and goal coordinates are required.",
    });
  }

  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start}&goal=${goal}&option=traoptimal`,
      {
        method: "GET",
        headers,
      }
    );

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data from Naver API." });
  }
}
