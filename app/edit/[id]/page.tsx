'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Post } from '@/interfaces/post.interface'

const Edit = ({ params }: { params: { id: string } }) => {

    const { id } = params
    const router = useRouter()

    const [post, setPost] = useState<Post>({
        title: '',
        content: '',
        categoryId: ''
    })
    const [categories, setCategories] = useState([])

    const fetchPost = async (id: Number) => {
        try {
            const res = await axios.get(`/api/posts/${id}`)
            setPost(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCates = async () => {
        try {
            const res = await axios.get(`/api/categories`)
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchPost(parseInt(id))
            fetchCates()
        }
    }, [id])

    // console.log(post)

    const hdlChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setPost(prv => ({ ...prv, [name]: value }))
    }

    const hdlSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await axios.put(`/api/posts/${id}`, post)
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
            <form onSubmit={hdlSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={post.title}
                        onChange={hdlChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        required
                        rows={4}
                        value={post.content}
                        onChange={hdlChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div>
                    <div>
                        <label>Category</label>
                        <select
                            name='categoryId'
                            value={post.categoryId}
                            onChange={hdlChange}
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Edit