import prisma from "@/configs/prisma";
import { NextRequest, NextResponse } from 'next/server';

// Function to handle the GET request
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id);
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to handle the PUT request
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id);
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const { title, content } = await req.json();

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title,
                content
            }
        });

        return NextResponse.json({ message: 'Post Updated', post: updatedPost });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Function to handle the DELETE request
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const postId = Number(params.id);
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return NextResponse.json({ message: 'Post Deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
