import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  useGetSingleBlogQuery } from '../redux/blogApi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';

const SingleBlog = () => {

  const { slug } = useParams();  
  const server = import.meta.env.VITE_SERVER;
  const { data, error, isLoading } = useGetSingleBlogQuery(slug);
  const navigate = useNavigate();

  const blog = data?.blog; // backend sends { success, blog }

  if (isLoading) {
    return <p>Loading Blog...</p>;
  }

  if (error) {
    return <p>Something went wrong while fetching the blog.</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  // Delete the blog
  const deleteHandler = () => {
    fetch(`${server}/api/v1/blog/${blog._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Blog Deleted Successfully");
        navigate('/all-blogs');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const renderContent = () => {
    if (!blog) return null;
  
    let content;
    try {
      content = typeof blog.content === 'string' ? JSON.parse(blog.content) : blog.content;
    } catch (error) {
      console.error("Error parsing content:", error);
      return <p>Error parsing content</p>;
    }
  
    if (!content || !content.blocks || !Array.isArray(content.blocks)) {
      return <p>No content available</p>;
    }
  
    return content.blocks.map((block, index) => {
      switch (block.type) {
        case 'header':
          return block.data.level === 1 ? (
            <h1 key={index} className="text-6xl" dangerouslySetInnerHTML={{ __html: block.data.text }} />
          ) : (
            <h2 key={index} className="text-5xl font-bold pb-10" dangerouslySetInnerHTML={{ __html: block.data.text }} />
          );
        case 'paragraph':
          return (
            <p key={index} className="pb-10" dangerouslySetInnerHTML={{ __html: block.data.text }} />
          );
        case 'image':
          return (
            <img
              key={index}
              src={block.data.file.url}
              alt="blog image"
              className="mt-4 w-full max-w-2xl"
            />
          );
          case 'list':
            if (block.data.style === 'unordered') {
              return (
                <ul key={index} className="list-disc ml-6">
                  {block.data.items.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                  ))}
                </ul>
              );
            } else {
              return (
                <ol key={index} className="list-decimal ml-6">
                  {block.data.items.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                  ))}
                </ol>
              );
            }
        case 'link':
          return (
            <a
              key={index}
              href={block.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {block.data.text || block.data.link}
            </a>
          );
        default:
          return <p key={index}>Unsupported block type: {block.type}</p>;
      }
    });
  };
  
  
  
  

  return (
    <div className="flex flex-col items-center justify-center mt-6 border-t-2 border-black bg-white rounded shadow-md p-4">
      <div className='flex gap-10'>
      <button
        className="bg-red-500 hover:bg-white hover:text-red-500 flex items-center gap-1 hover:border-red-500 border transition-all duration-300 text-white px-4 py-1 cursor-pointer"
        onClick={deleteHandler}
      >
        Delete <AiTwotoneDelete />
      </button>
      <Link to={`/update-blog/${blog.slug}`}
        className="bg-green-900 hover:bg-white hover:text-green-500 flex items-center gap-1 hover:border-green-500 border transition-all duration-300 text-white px-4 py-1 cursor-pointer"
       
      >
        Update <GrUpdate />
      </Link>
      </div>
      {blog.photo && <img src={`${server}${blog.photo}`} alt={blog.photo} className="mt-4 w-96 h-auto rounded" />}
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <h3>{`${server}${blog.photo}`}</h3>
      <p>{blog.content}</p>
      <div className="content mt-4">{renderContent()}</div>
      <p className="mt-2 text-gray-600">Posted on: {blog.createdAt}</p>
    </div>
  );
};

export default SingleBlog;
