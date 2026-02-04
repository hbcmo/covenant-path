'use client';

import { useState } from 'react';

interface ResponseScreenProps {
  prompt: string;
  onNext: () => void;
}

export default function ResponseScreen({ prompt, onNext }: ResponseScreenProps) {
  const [response, setResponse] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Response</h2>
        <p className="text-xl text-gray-700 mb-6">{prompt}</p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your response here..."
          className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
        />
        <button
          onClick={onNext}
          className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Continue to Closing
        </button>
      </div>
    </div>
  );
}
