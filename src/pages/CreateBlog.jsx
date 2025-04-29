import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link'; 

const CreateBlogPost = ({ server }) => {
  const uploadedImagesRef = useRef([]);
  const server = import.meta.env.VITE_SERVER;
  const [formData, setFormData] = useState({
    title: '',
    photo: null,
    content: null, // Will hold the content from Editor.js
  });

  const [rend,setRend]=useState([]); 

  const editorRef = useRef(null); // Reference to the Editor.js instance

  // Initialize Editor.js when the component mounts
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs', // ID of the DOM element where Editor.js will render
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          inlineToolbar: true,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append('photo', file);
              
                try {
                  const response = await axios.post(`${server}/api/v1/blog/upload`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  });
              
                  const imageUrl = response.data.url;
                  uploadedImagesRef.current.push(imageUrl); // Track this URL
              
                  return {
                    success: 1,
                    file: {
                      url: imageUrl, // Return the uploaded image URL
                    },
                  };
                } catch (error) {
                  console.error('Error uploading image:', error);
                  return {
                    success: 0,
                    message: 'Image upload failed',
                  };
                }
              },
            },
          },
        },
        link: LinkTool, // Add Link Tool
      },
      onChange: async () => {
        const content = await editor.save();
        setFormData((prev) => ({ ...prev, content })); // Save content as JSON
      },
    });

    editorRef.current = editor;

    return () => {
      editor.destroy(); // Cleanup Editor.js on unmount
    };
  }, [server]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, photo } = formData;
  
    const usedImageUrls = (content?.blocks || [])
      .filter(block => block.type === 'image')
      .map(block => block.data.file.url);
  
    const unusedImageUrls = uploadedImagesRef.current.filter(
      (url) => !usedImageUrls.includes(url)
    );
  
    // Send request to delete unused images
    if (unusedImageUrls.length > 0) {
      try {
        await axios.post(`${server}/api/v1/blog/cleanup-images`, {
          urls: unusedImageUrls,
        });
      } catch (err) {
        console.warn('Failed to delete unused images:', err);
      }
    }
  
    const data = new FormData();
    data.append('title', title);
    data.append('content', JSON.stringify(content));
    data.append('photo', photo);
  
    try {
      await axios.post(`${server}/api/v1/blog/new`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Blog post created successfully!');
      setFormData({ title: '', photo: null, content: null });
      uploadedImagesRef.current = []; // Reset image tracking
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center mt-[10px]">
      <form
        onSubmit={handleSubmit}
        className="w-full  p-6  bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content
          </label>
          <div id="editorjs" className='border p-5 w-full'></div> 
        </div>

        <div className="mb-4">
          <label htmlFor="photo" className="block mb-1 font-semibold">
            Upload Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={handleChange}
            accept="image/*"
            className="w-full cursor-pointer border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
