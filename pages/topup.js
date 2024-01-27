import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from '../utils/getAppProps';

const Topup = () => {


  const handleAddToken = async () => {
    await fetch('/api/addTokens', {
      method: 'POST'
    });
  }

  return (
    <div>
      <h1>Topup</h1>
      <button className='btn' onClick={handleAddToken}>Add Tokens</button>


    </div>
  )
}

export default Topup;


Topup.getLayout = function (page, pageProps){
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