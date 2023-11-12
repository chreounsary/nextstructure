import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const { title, description } = await req.json();
        await connectMongoDB();
        await Topic.create({ title, description })
        return NextResponse.json({
            status: "OK",
            message: "Topic Created Succesfully"
        },
            {
                status: 201,
            })
    } catch (error) {
        return NextResponse.json({
            status: "ERROR",
            message: "Server Error"
        }, { status: 400 })
    }
}

export const GET = async () => {
    try {
        await connectMongoDB();
        const data = await Topic.find();
        return NextResponse.json({
            data,
            status: "OK",
            message: "Topics Get Succesfully",
        })
    } catch (error) {
        return NextResponse.json({
            status: "ERROR",
            message: "Server Error"
        }, { status: 400 })
    }
}