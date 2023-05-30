'use client'
import { Toaster } from 'react-hot-toast'

const Providers = function({children}){
  return <>
  <Toaster position='top-center' reverseOrder={false} />
    {children}
  </>
}

export default Providers