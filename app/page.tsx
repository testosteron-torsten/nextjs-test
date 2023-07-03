import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from './logout-button'
import ShowOne from './showone'
import ShowAll from './showall'
import { useRouter } from 'next/router'
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions.js"
import {getServerSession} from "next-auth/next"
import SignInStatus from "./login"

const resources = [
  {
    title: 'Cookie-based Auth and the Next.js App Router',
    subtitle:
      'This free course by Jon Meyers, shows you how to configure Supabase Auth to use cookies, and steps through some common patterns.',
    url: 'https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF',
    icon: 'youtube',
  },
  {
    title: 'Supabase Next.js App Router Example',
    subtitle:
      'Want to see a code example containing some common patterns with Next.js and Supabase? Check out this repo!',
    url: 'https://github.com/supabase/supabase/tree/master/examples/auth/nextjs',
    icon: 'code',
  },
  {
    title: 'Supabase Auth Helpers Docs',
    subtitle:
      'This template has configured Supabase Auth to use cookies for you, but the docs are a great place to learn more.',
    url: 'https://supabase.com/docs/guides/auth/auth-helpers/nextjs',
    icon: 'book',
  },
]

const examples = [
  { type: 'Client Components', src: 'app/_examples/client-component/page.tsx' },
  { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' },
  { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' },
  { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },
  { type: 'Middleware', src: 'app/middleware.ts' },
  { type: 'Protected Routes', src: 'app/_examples/protected/page.tsx' },
]



export default async function Index() {
  const session = await getServerSession(authOptions)
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
    <SignInStatus />
    <h1 className='head'>SHOW ALL:</h1>
    <ShowAll />
    <br></br>
    <h1 className='head'>SHOW ONE:</h1>
    <ShowOne />
    </>
  )
}




















