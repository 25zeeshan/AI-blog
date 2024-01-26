import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react'
import { AppLayout } from '../../components/AppLayout';

const New = () => {
  return (
    <div>New page</div>
  )
}

export default New;

New.getLayout = function (page, pageProps){
  return <AppLayout {...pageProps}>{page}</AppLayout>
}

export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
})