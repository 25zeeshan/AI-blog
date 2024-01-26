import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { AppLayout } from "../../components/AppLayout";
import Markdown from "react-markdown";

const New = () => {
  const [post, setPost] = useState();

  const [topic, setTopic] = useState("");
  const [keyword, setKeyWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic, keyword }),
    });

    const data = await response.json();
    console.log(data);
    setPost(data.post.postContent);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="border border-solid flex flex-col p-5 w-1/2"
        onSubmit={handleSubmit}
      >
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="title"
        >
          Enter title for blog:
        </label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          id="title"
          placeholder="Enter Blog title"
          required
        ></textarea>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
          htmlFor="keyword"
        >
          Targeting the following keywords
        </label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={keyword}
          onChange={(e) => setKeyWord(e.target.value)}
          id="keyword"
          placeholder="Enter comma seperated keywords to include in blog"
          required
        ></textarea>
        <button type="submit" className="btn mt-5">
          Generate Blog
        </button>
      </form>

      
    </div>
  );
};

export default New;

New.getLayout = function (page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
