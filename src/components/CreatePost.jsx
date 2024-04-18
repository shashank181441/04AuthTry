import { createPost } from "@/api";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

function CreatePost() {
  const { register, handleSubmit, control } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags", // Name of the field array
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const onSubmit = async (data) => {
    console.log(data.content);
    console.log(selectedImages);
    const tagsArray = data.tags.map((tag) => tag.value); // Extract value property from each tag object
    console.log(tagsArray); // Log the tags array

    try {
      const response = await createPost(
        data.content,
        selectedImages,
        tagsArray
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full rounded pt-6 pb-8 mb-4"
      encType="multipart/form-data">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content">
          Content
        </label>
        <input
          type="text"
          name="content"
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter content here..."
          {...register("content")}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="images">
          Images
        </label>
        <input
          type="file"
          name="images"
          id="images"
          className="hidden"
          onChange={handleImageChange}
          multiple
        />
        <label
          htmlFor="images"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Select Images
        </label>
        <div className="flex flex-wrap mt-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="w-1/4 p-2">
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tags">
          Tags
        </label>
        {fields.map((tag, index) => (
          <div key={tag.id} className="flex items-center mb-2">
            <input
              type="text"
              {...register(`tags.${index}.value`)}
              defaultValue={tag.value} // Set default value from form state
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 mr-2"
              placeholder="Enter tag here..."
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Add Tag
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreatePost;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { createPost } from "@/api";

// export default function CreatePost() {
//   const { register, handleSubmit, reset } = useForm();
//   const onSubmit = async (data) => {
//     console.log(Object.values(data.images));
//     const images = Object.values(data.images);
//     const resp = await createPost("Hello world", images, []);

//     console.log(resp);
//   };
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" {...register("content")} />
//       <input type="file" {...register("images")} multiple />
//       <button>submit</button>
//     </form>
//   );
// }
