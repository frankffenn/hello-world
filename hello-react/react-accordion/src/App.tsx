import React from 'react';
import './App.css';
import { useState } from 'react'

interface Data {
  question: string,
  answer: string
}

function App() {
  const [ selected, setSelected ] = useState(-1)
  
  const toggle = (i: number) => {
    if (selected == i) {
      return setSelected(-1)
    }

    setSelected(i)
  }

  return (
    <div className="wrapper"> 
    <div className="accordion">
     {
      data.map((item, index) => {
        return <>
          <div className="item" onClick={() => toggle(index)}>
            <div className="title"> 
              <h2>{item.question}</h2>
              <span>{selected === index ? '-': '+'}</span>
            </div>
            <div className={selected === index? 'content show': 'content'}>{item.answer}</div>
          </div>
        </>
      })
     }
    </div>
    </div>
  );
}


const data: Data[] = [
  {
    question: 'Question1',
    answer: 'A Week on the Trail With the “Disgusting Reporters” Covering Donald Trump..Five stories about Nick Kyrgios, tennis’ misunderstood genius.'
  },
  {
    question: 'Question2',
    answer: 'If the vote is close, Donald Trump could easily throw the election into chaos and subvert the result. Who will stop him? What’s wrong with some forgery, fraud, and crystal meth if you’ll soon be gone? A better question: What the hell happens if you survive?    '
  },
  {
    question: 'Question3',
    answer: 'Twenty-five years after 82 Branch Davidians and 4 federal officers were killed, the lead negotiator at the scene is still arguing about what happened.'
  },
  {
    question: 'Question4',
    answer: 'The evolution and economics of English football.Twenty-five years after 82 Branch Davidians and 4 federal officers were killed, the lead negotiator at the scene is still arguing about what happened.'
  }
]

export default App;
