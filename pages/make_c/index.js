import React, { useState } from 'react';


async function sendCodeToServer(code) {
  const response = await fetch('https://judge-worker.run.goorm.io/submit/create_cpp_file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const result = await response.json();
  console.log(result.message);
}

export default function CodeSender() {
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await sendCodeToServer(code);
      alert('코드 전송 완료!');
    } catch (error) {
      alert(`에러 발생: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Code Sender</h1>
      <form onSubmit={handleSubmit}>
        <label>
          코드 입력:
          <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        </label>
        <br />
        <button type="submit">코드 서버로 전송</button>
      </form>
    </div>
  );
}
