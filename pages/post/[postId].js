import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import Markdown from "react-markdown";
import { getAppProps } from "../../utils/getAppProps";
import Image from "next/image";

const Post = (props) => {
  return (
    <div className="mx-auto max-w-screen-sm  xl:max-w-screen-lg p-3">
      <div className="text-md font-bold mt-6 p-2 text-slate-900 bg-slate-600 rounded-sm">
        Title and Description
      </div>
      <div className="p-4 my-2 border border-slate-600 rounded-md">
        <div className="text-2xl font-bold">{props.title}</div>
        <div className="mt-2 text-gray-400">{props.description}</div>
      </div>

      <div className="text-md text-slate-900 font-bold mt-6 p-2 bg-slate-600 rounded-sm">
        Keywords
      </div>
      <div className="flex flex-wrap pt-2 gap-1">
        {props.keywords.split(',').map((keyword, index) => {
          return (
            <div className="bg-slate-900 py-2 px-3 rounded-2xl" key={index}>
              <span className="italic font-bold text-xl">#</span>{keyword}
            </div>
          )
        })}
      </div>
      {
        props.image_url && 
        <img
          src={props.image_url}
          alt="Your Image Alt Text"
          className="w-full aspect-[4/2] object-none"
        />

      }

      <div className="text-md text-slate-900 font-bold mt-6 p-2 bg-slate-600 rounded-sm">
        Blog Post
      </div>

      

      

      <Markdown>{props.postContent || ""}</Markdown>
    </div>
  );
};

export default Post;

Post.getLayout = function (page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {


    const props = await getAppProps(context);

    const id = context.params.postId;

    const client = await clientPromise;
    const db = client.db("blog_standard");

    const postData = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
   

    if (!postData) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        postContent: postData.postContent,
        title: postData.title,
        description: postData.description,
        keywords: postData.keywords,
        topic: postData.topic,
        image_url: postData.image_url || null,
        ...props
      },
    };
  },
});
