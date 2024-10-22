export async function conversation(val) {
  const url = 'https://api.smnet.asia/v1/chat/completions'
  const data = {
    messages: [{ role: 'user', content: '你是谁' }],
    stream: true,
    model: 'chatglm_pro',
    temperature: 0.5,
    presence_penalty: 0,
    frequency_penalty: 0,
    top_p: 1,
  }
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      authorization:
        'Bearer sk-GIBCTSWyrFH2dem1F9182aCc9e3b4061Ab93Bb5d4b65D0A6',
    },
    body: JSON.stringify(data),
  })
}
