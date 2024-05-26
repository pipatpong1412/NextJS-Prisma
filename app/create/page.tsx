'use client'
import { Post } from '@/interfaces/post.interface'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const Create = () => {

    const [post, setPost] = useState<Post>({
        title: '',
        content: '',
        category: ''
    })

    const router = useRouter()

    const hdlChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setPost(prv => ({ ...prv, [name]: value }))
    }

    const hdlSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            await axios.post('/api/posts/', post)
            router.push('/')

        } catch (error) {
            console.log('error', error)
        }

    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
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
                    <label>Category</label>
                    <select
                        name='category'
                        value={post.category}
                        onChange={hdlChange}
                    >
                        <option value="">Select a category</option>
                        {/* Example static categories, replace or populate dynamically */}
                        <option value="Tech">Tech</option>
                        <option value="Lifestyle">Lifestyle</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create