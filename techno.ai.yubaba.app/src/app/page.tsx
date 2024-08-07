'use client'

import { useState } from 'react';
import "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Home() {

  const {
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [message, setMessage] = useState("");

  const handleClickStart = () => {
    SpeechRecognition.startListening();
  };

  const handleClickStop = () => {
    SpeechRecognition.stopListening;
    setMessage(transcript);
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='overflow-x-hidden text-black'>
      <p>{message}</p>
      <button onClick={handleClickStart}>Start</button>
      <button onClick={handleClickStop}>Stop</button>
    </div>
  );
}
