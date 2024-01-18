import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Post = () => {
  return <div>Post</div>;
};

export default Post;

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
