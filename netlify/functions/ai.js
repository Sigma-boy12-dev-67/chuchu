exports.handler = async (e) => {
  if (e.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  const { prompt = '', text = '' } = JSON.parse(e.body || '{}');
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.GROQ_API_KEY },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: 'You are a writing assistant inside a document editor. Return only the resulting text, no preamble.' },
        { role: 'user', content: prompt + '\n\n' + text }
      ]
    })
  });
  const d = await r.json();
  return {
    statusCode: r.ok ? 200 : r.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: d.choices?.[0]?.message?.content || d.error?.message || 'No response' })
  };
};
