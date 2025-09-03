
"use client";

import { useRouter } from 'next/navigation';

export default function Welcome() {
  const router = useRouter();

  const handleStartTalking = () => {
    router.push('/conversation');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">Ready to talk?</h1>
        <p className="text-xl text-gray-400 mb-8">I&apos;m here to listen. Share your thoughts, and I&apos;ll provide a safe space.</p>
        <button
          onClick={handleStartTalking}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Start Talking
        </button>
      </div>
    </div>
  );
}
