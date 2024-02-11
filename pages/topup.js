import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

const Topup = () => {
  const handleAddToken = async () => {
    const result = await fetch("/api/addTokens", {
      method: "POST",
    });

    const json = await result.json();
    window.location.href = json.session.url;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="border border-solid text-center flex flex-col mx-5 p-5 w-full lg:w-1/2">
        <div className="text-2xl font-bold mb-5">Topup</div>
        <button className="btn" onClick={handleAddToken}>
          Add Tokens
        </button>
      </div>
    </div>
  );
};

export default Topup;

Topup.getLayout = function (page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const props = await getAppProps(context);

    return {
      props,
    };
  },
});
