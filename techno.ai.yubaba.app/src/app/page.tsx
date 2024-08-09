'use client'

import ChatGPT from './chatGPT';

export default function Home() {


  return (
    <div className='w-screen h-screen overflow-x-hidden text-black'>
      <img className='w-full h-full absolute -z-10 object-cover' src='/yubaba.webp' />
      <h1>Chat GPT</h1>
      <ChatGPT/>
    </div>
  );
}
