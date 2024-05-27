import prisma from "@/configs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const cateId = Number(params.id)
    try {

        const res = await prisma.category.findUnique({
            where: {
                id: cateId
            },
            include: {
                Post: true
            },
        })
        return NextResponse.json(res)

    } catch (error) {
        return NextResponse.json({ message: 'fail to get category by id' }, { status: 400 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { name } = await req.json()
    const cateId = Number(params.id)
    try {
        await prisma.category.update({
            where: {
                id: cateId
            },
            data: {
                name
            }
        })

        return NextResponse.json({ message: 'category updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'fail to update category' }, { status: 400 })
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const cateId = Number(params.id)
    try {
        await prisma.category.delete({
            where: {
                id: cateId
            }
        })
        return NextResponse.json({ message: 'Category Deleted' }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'Fail to Delete Category' }, { status: 400 })
    }
}