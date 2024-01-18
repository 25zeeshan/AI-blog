import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'

const Topup = () => {
  return (
    <div>Topup</div>
  )
}

export default Topup

export const getServerSideProps = withPageAuthRequired (() => {
    return {
        props: {}
    };
})