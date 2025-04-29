import React from 'react'
import { useGetAllBlogsQuery } from '../redux/blogApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const GetBlog = () => {
    const server = import.meta.env.VITE_SERVER;

    const { data, error, isLoading } = useGetAllBlogsQuery();
   

    return (
        <div className='w-full flex justify-center'>
            <div className='grid grid-cols-3 gap-5 w-[90%] mt-10'>
                {isLoading && <p>Loading Blogs...</p>}
                {error && <p>Something went wrong while fetching blogs.</p>}
                {data && data.blogs.map((blog) => (
                    <div key={blog._id} className="flex flex-col items-center justify-center mt-6 border-t-2 border-black bg-white rounded shadow-md p-4">
                        {blog.photo && <img src={`${server}${blog.photo}`} alt={blog.photo} className="mt-4 w-24 h-auto rounded" />}
                        <h2 className="text-xl font-bold">{blog.title}</h2>
                        <p className="mt-2 tracking-widest pb-5">Created At : {blog.createdAt.slice(0, 10)}</p>
                        <Link to={`/blog/${blog.slug}`} className='bg-black text-white px-5 py-2'>Go to this Blog</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetBlog
