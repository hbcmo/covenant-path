'use client';

interface ClosingScreenProps {
  content: string;
  onComplete: () => void;
}

export default function ClosingScreen({ content, onComplete }: ClosingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Closing</h2>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">{content}</p>
        <button
          onClick={onComplete}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
