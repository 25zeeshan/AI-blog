import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { AppLayout } from '../components/AppLayout';

const Topup = () => {
  return (
    <div>Topup</div>
  )
}

export default Topup;


Topup.getLayout = function (page, pageProps){
  return <AppLayout {...pageProps}>{page}</AppLayout>
}


export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
})