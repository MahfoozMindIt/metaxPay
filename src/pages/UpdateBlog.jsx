// pages/UpdateBlog.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBlogQuery, useUpdateBlogMutation } from '../redux/blogApi';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';

const UpdateBlog = () => {
  const { slug } = useParams();
  const server = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleBlogQuery(slug);
  const [updateBlog] = useUpdateBlogMutation();

  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (data?.blog) {
      setTitle(data.blog.title);
    }

    // Initialize EditorJS once data is available
    if (data?.blog && !editorRef.current) {
      const contentData = typeof data.blog.content === 'string'
        ? JSON.parse(data.blog.content)
        : data.blog.content;

      editorRef.current = new EditorJS({
        holder: 'editorjs',
        data: contentData,
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: `${server}/api/v1/blog/update-image`, // you must handle this
              },
            },
          },
        },
      });
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editorRef.current) return;

    try {
      const outputData = await editorRef.current.save();

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', JSON.stringify(outputData));
      if (photo) formData.append('photo', photo);

      await updateBlog({ id: data.blog._id, formData }).unwrap();

      alert('Blog updated successfully!');
      navigate('/all-blogs');
    } catch (err) {
      console.error('Failed to update blog:', err);
      alert('Failed to update blog');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Update Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-2 border rounded"
        />
        <div id="editorjs" className="border p-2 rounded bg-white" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
