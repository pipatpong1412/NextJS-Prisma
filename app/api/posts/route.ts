import prisma from "@/configs/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'desc'

    const whereCondition = category
        ? {
            category: {
                is: {
                    name: category
                }
            },
            title: {
                contains: search,
                mode: 'insensitive',
            },
        }
        : {
            title: {
                contains: search,
                mode: 'insensitive',
            },
        }

    try {
        const post = await prisma.post.findMany({
            where: whereCondition as any,
            orderBy: {
                createdAt: sort
            } as any,
            include: {
                category: true
            }
        })
        return NextResponse.json(post)

    } catch (error) {
        return NextResponse.json({ message: 'Fail to Get Posts' }, { status: 400 })
    }
}

export async function POST(req: Request) {
    try {
        const { title, content, categoryId } = await req.json()
        await prisma.post.create({
            data: {
                title,
                content,
                categoryId: Number(categoryId)
            },
        })
        return NextResponse.json({ message: 'Post created' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Fail to Create Post' }, { status: 400 })
    }
}