/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.text || data.error);
    } catch (err) {
      setResponse('Error: Could not connect to Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Jeby</h1>
        <p className="text-gray-600 mb-6">
          Aplicativo de finanças pessoais para rastrear receitas, despesas, dívidas e muito mais.
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.jeby.connect.myapp&pcampaignid=web_share"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-8 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baixar no Google Play
        </a>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Pergunte ao Gemini</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="border p-2 rounded"
              placeholder="Faça uma pergunta..."
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Pensando...' : 'Perguntar'}
            </button>
          </form>
          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-left whitespace-pre-wrap text-sm">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
