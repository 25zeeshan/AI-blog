import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react'

const New = () => {
  return (
    <div>New page</div>
  )
}

export default New;


export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
})