import apiClient, { createPost } from "@/api";
import React, { useState } from "react";

function UploadPost() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    // Append tags with indices

    console.log(tags);
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    for (let i in images) {
      formData.append("images", images[i]);
    }
    console.log(images);

    // try {
    //   createPost(formData).then((response) => {
    //     console.log(response);
    //     setMessage("Post created successfully");
    //   });
    // } catch (error) {
    //   console.log(error);
    //   setMessage("Error creating the post");
    // }
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages(selectedImages);
  };

  return (
    <div className="mx-auto p-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2 font-medium">
            Tags (Separate with commas):
          </label>
          <input
            id="tags"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block mb-2 font-medium">
            Images (Up to 6):
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none">
          Create Post
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default UploadPost;
