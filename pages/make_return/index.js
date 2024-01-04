import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [check, setCheck] = useState('');
  const [correct,setCorrect]= useState('');
  //추후 check와 input은 db에서 입출력을 꺼내 와야 할 수도 있음.
  
  const runCode = async () => {
    try {
      const response = await fetch('https://judge-worker.run.goorm.io/submit/check_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, input, check }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      const result = await response.json();
      setResult(result.result);
      if (result.correct==1){
        setCorrect("정답입니다!");
      }
      else{
        setCorrect("오답입니다!");
      }
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <input type="text" value={check} onChange={(e)=> setCheck(e.target.value)}/>
      <button onClick={runCode}>Run C++ Code</button>
      <h2>Result:</h2>
      <pre>{result}</pre>
      <h2>정답여부:</h2>
      <pre>{correct}</pre>
    </div>
  );
}
