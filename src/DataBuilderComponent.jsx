import { useState } from "react";

const DataBuilderComponent = ({ handleData }) => {
  const [data, setData] = useState({
    title: "",
    pages: [],
  });

  return (
    <div className="p-8">
      <div className="my-4">
        <label htmlFor="video_title" className="block mb-2">
          Video Title
        </label>
        <input
          id="video_title"
          type="text"
          value={data?.title}
          onChange={(e) => {
            setData({
              ...data,
              title: e.target.value,
            });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Video Title"
          required
        />
      </div>

      <div className="my-4">
        <label htmlFor="video_pages" className="block mb-2">
          Video Pages
        </label>
        <textarea
          id="video_pages"
          value={data.pages}
          rows="15"
          onChange={(event) => {
            try {
              setData({
                ...data,
                pages: event.target.value,
              });
            } catch (e) {
              console.log(e);
            }
          }}
          className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>

      <button
        disabled={!data || !data.title || !data.pages}
        id="submit"
        onClick={() => {
          const jsonData = {
            ...data,
            pages: JSON.parse(data.pages),
          };
          handleData(jsonData);
        }}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default DataBuilderComponent;
