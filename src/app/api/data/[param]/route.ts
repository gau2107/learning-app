import { NextResponse } from "next/server";
import data from "../nextjs.json";
import aData from "../architecture.json";
import rData from "../redux.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ param: string }> }
) {
  const { param } = await params;
  // console.log("Received param:", param);

  let respData;
  switch (param) {
    case 'architecture':
      respData = aData;
      break;
    case 'nextjs':
      respData = data;
      break;
    case 'redux':
      respData = rData;
      break;
    default:
      respData = data;
      break;
  }

  const response = NextResponse.json(respData);

  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });

  // Add CORS headers for preflight requests
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}