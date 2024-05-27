import prisma from "@/configs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const rs = await prisma.category.findMany()
        return NextResponse.json(rs)

    } catch (error) {
        return NextResponse.json({ message: 'Fail to get categories' }, { status: 400 })
    }
}

export async function POST(req: Request) {
    const { name } = await req.json()
    try {
        await prisma.category.create({
            data: {
                name
            }
        })
        return NextResponse.json({ message: 'Success' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Fail to get categories' }, { status: 400 })
    }
}

