// pages/index.js
import { useState, useEffect } from 'react';

async function executeShellCommand(command) {
  
  // const response = await fetch('https://judge-worker.run.goorm.io/health/hihi',{
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  const response = await fetch('https://judge-worker.run.goorm.io/health/execute_shell', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
    body: JSON.stringify({ command }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const result = await response.json();
  console.log('Shell command result:', result.result);
  return result.result;
}

export default function Home() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const shellCommand = 'ls -l';
    executeShellCommand(shellCommand)
      .then(result => setResult(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Shell Command Result:</h1>
      <pre>{result}</pre>
    </div>
  );
}
