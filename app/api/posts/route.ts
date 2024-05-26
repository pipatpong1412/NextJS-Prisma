import prisma from "@/configs/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const post = await prisma.post.findMany()
        return NextResponse.json(post)

    } catch (error) {
        return NextResponse.json({ message: 'Fail to Get Posts' }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, content } = await req.json()
        await prisma.post.create({
            data: {
                title,
                content,
            },
        })
        return NextResponse.json({ message: 'Post created' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Fail to Create Post' }, { status: 400 })
    }
}