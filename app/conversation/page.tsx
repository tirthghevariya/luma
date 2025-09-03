'use client';

import Avatar from '@/app/components/Avatar';
import EndCallIcon from '@/app/components/icons/EndCallIcon';
import MicrophoneIcon from '@/app/components/icons/MicrophoneIcon';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getResponse } from './actions';

const initialMessages: { [key: string]: string } = {
  'en-US':
    'AI: Hello, I’m Luma ✨ your calm and sweet astrologer. I’m here to gently guide you through love, career, and your future. May I know your birth date, time, and place so I can look into the stars for you?',
  'es-ES':
    'AI: Hola, soy Luma ✨ tu astróloga tranquila y dulce. Estoy aquí para guiarte suavemente a través del amor, la carrera y tu futuro. ¿Puedo saber tu fecha, hora y lugar de nacimiento para poder mirar las estrellas por ti?',
  'fr-FR':
    'AI: Bonjour, je suis Luma ✨ votre astrologue calme et douce. Je suis ici pour vous guider doucement à travers l’amour, la carrière et votre avenir. Puis-je connaître votre date, heure et lieu de naissance pour que je puisse regarder les étoiles pour vous?',
  'de-DE':
    'AI: Hallo, ich bin Luma ✨ deine ruhige und süße Astrologin. Ich bin hier, um dich sanft durch Liebe, Karriere und deine Zukunft zu führen. Darf ich dein Geburtsdatum, deine Geburtszeit und deinen Geburtsort erfahren, damit ich für dich in die Sterne schauen kann?',
  'hi-IN':
    'AI: नमस्ते, मैं लूमा ✨ आपकी शांत और प्यारी ज्योतिषी हूँ। मैं यहाँ प्यार, करियर और आपके भविष्य में आपका मार्गदर्शन करने के लिए हूँ। क्या मैं आपकी जन्म तिथि, समय और स्थान जान सकती हूँ ताकि मैं आपके लिए सितारों को देख सकूं?',
  'gu-IN':
    'AI: નમસ્તે, હું લુમા છું ✨ તમારી શાંત અને મીઠી જ્યોતિષી. હું અહીં તમને પ્રેમ, કારકિર્દી અને તમારા ભવિષ્ય માટે હળવાશથી માર્ગદર્શન આપવા માટે છું. શું હું તમારી જન્મ તારીખ, સમય અને સ્થળ જાણી શકું જેથી હું તમારા માટે તારાઓમાં જોઈ શકું?',
};

export default function ConversationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [transcript, setTranscript] = useState<string[]>([
    initialMessages[language],
  ]);
  const recognition = useRef<SpeechRecognition | null>(null);

  const toggleRecording = useCallback(() => {
    if (recognition.current) {
      if (isRecording) {
        recognition.current.stop();
      } else {
        recognition.current.start();
      }
      setIsRecording(!isRecording);
    } else {
      // For the initial call from useEffect
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = false;
        recognition.current.lang = language;

        recognition.current.onresult = event => {
          const last = event.results.length - 1;
          const text = event.results[last][0].transcript;
          setTranscript(prev => [...prev, 'User: ' + text]);
          getResponse(text).then(response => {
            setTranscript(prev => [...prev, 'AI: ' + response]);
            const utterance = new SpeechSynthesisUtterance(response);
            utterance.lang = language;
            speechSynthesis.speak(utterance);
          });
        };
        recognition.current.start();
        setIsRecording(true);
      }
    }
  }, [isRecording, language]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.lang = language;

      recognition.current.onresult = event => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        setTranscript(prev => [...prev, 'User: ' + text]);
        getResponse(text).then(response => {
          setTranscript(prev => [...prev, 'AI: ' + response]);
          const utterance = new SpeechSynthesisUtterance(response);
          utterance.lang = language;
          speechSynthesis.speak(utterance);
        });
      };
    }

    // Automatically start recording
    toggleRecording();

    // Speak the first message
    const firstMessage = initialMessages[language].substring(4);
    const utterance = new SpeechSynthesisUtterance(firstMessage);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    setTranscript([initialMessages[language]]);
  }, [language]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="w-full max-w-4xl h-[60vh] bg-gray-900 rounded-lg p-4 overflow-y-auto">
        {transcript.map((line, index) => (
          <p key={index} className="mb-2">
            {line}
          </p>
        ))}
      </div>
      <div className="mt-8 flex items-center space-x-8">
        <button
          onClick={toggleRecording}
          className={`p-4 rounded-full transition-colors ${
            isRecording ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <MicrophoneIcon />
        </button>
        <Avatar />
        <Link href="/welcome">
          <button className="p-4 bg-red-500 rounded-full hover:bg-red-600">
            <EndCallIcon />
          </button>
        </Link>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="en-US">English</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
          <option value="de-DE">Deutsch</option>
          <option value="hi-IN">हिन्दी</option>
          <option value="gu-IN">ગુજરાતી</option>
        </select>
      </div>
    </div>
  );
}
