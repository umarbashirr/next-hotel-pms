import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message: error?.message
        },{status:500})
    }
}