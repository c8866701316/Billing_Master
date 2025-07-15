import { connectDB, sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const LocationCode = searchParams.get("LocationCode") || null; 
    const CompanyCode = searchParams.get("CompanyCode");

    // console.log("Received Params:", { LocationCode });

    const pool = await connectDB();
    const request = pool.request();

    request.input("LocationCode", sql.VarChar, LocationCode);
    request.input("CompanyCode", sql.VarChar, CompanyCode);

    // console.log("Executing Stored Procedure: USP_GetLocations with", { LocationCode });

    const result = await request.execute("USP_GetLocations");
    console.log("Stored Procedure Result:", result);
    
    
    return NextResponse.json(
      { status: true, data: result.recordset },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { status: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
