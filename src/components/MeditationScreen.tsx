'use client';

interface MeditationScreenProps {
  content: string;
  onNext: () => void;
}

export default function MeditationScreen({ content, onNext }: MeditationScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Meditation</h2>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">{content}</p>
        <button
          onClick={onNext}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Continue to Response
        </button>
      </div>
    </div>
  );
}
