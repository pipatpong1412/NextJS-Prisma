import prisma from "@/configs/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const postId = Number(params.id)
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    return Response.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { title, content } = await req.json()
    const postId = Number(params.id)

    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title,
            content
        }
    })
    return Response.json({ message: 'Post Updated' })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const postId = Number(params.id)
    await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return Response.json({ message: 'Post Deleted' })
}