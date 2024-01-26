import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Post = () => {
  return <div>
    post id page

  </div>;
};

export default Post;

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
