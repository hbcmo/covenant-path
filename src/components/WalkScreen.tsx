'use client';

interface WalkScreenProps {
  prompt: string;
  onNext: () => void;
}

export default function WalkScreen({ prompt, onNext }: WalkScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Walk</h2>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">{prompt}</p>
        <button
          onClick={onNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Continue to Meditation
        </button>
      </div>
    </div>
  );
}
