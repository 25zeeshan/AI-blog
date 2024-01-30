import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';

const Success = () => {

  return (
    <div>
      <h1>Thank you for purchase</h1>
    </div>
  )
}

export default Success;


Success.getLayout = function (page, pageProps){
  return <AppLayout {...pageProps}>{page}</AppLayout>
}


export const getServerSideProps = withPageAuthRequired ({
   async getServerSideProps(context){
      const props = await getAppProps(context);

      return {
        props
      }
   }
})