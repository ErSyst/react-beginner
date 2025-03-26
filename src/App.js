import { useState } from 'react';
import './index.css';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'Что такое React Hook?',
    variants: [
      'Это способ взаимодействия с сервером',
      'Это специальная функция для работы с состоянием и эффектами',
      'Это класс в React',
    ],
    correct: 1,
  },
  {
    title: 'Что такое state в React?',
    variants: [
      'Это объект с данными, которые изменяются во время работы компонента',
      'Это постоянные данные, которые не изменяются',
      'Это функция для обновления UI',
    ],
    correct: 0,
  },
  {
    title: 'Что такое props в React?',
    variants: [
      'Это состояние компонента',
      'Это передаваемые данные от родительского компонента к дочернему',
      'Это специальный хук для работы с состоянием',
    ],
    correct: 1,
  },
  {
    title: 'Что такое Virtual DOM?',
    variants: [
      'Это реальный DOM, но с более быстрым рендером',
      'Это абстракция, которая ускоряет обновление UI в React',
      'Это специальная библиотека для работы с DOM',
    ],
    correct: 1,
  },
  {
    title: 'Какая функция используется для создания компонента в React?',
    variants: [
      'createComponent',
      'React.Component',
      'React.createElement',
    ],
    correct: 1,
  },
  {
    title: 'Что такое useEffect?',
    variants: [
      'Это хук для работы с состоянием',
      'Это хук для выполнения побочных эффектов в компоненте',
      'Это функция для обновления компонента',
    ],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это язык программирования, используемый в React',
      'Это синтаксический сахар, который позволяет писать HTML и JS в одном файле',
      'Это способ стилизации компонентов в React',
    ],
    correct: 1,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href='/'>
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({step, question, onClickVariant}) {
  const percentage = Math.round((step / questions.length) * 100);

  console.log(percentage);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
       {
        question.variants.map((text, index)=> (
        <li onClick={() => onClickVariant(index)} key={text}>
          {text}
        </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);

    if (index == question.correct){
      setCorrect(correct + 1);
    }
  }
  return (
    <div className="App">
      {
        step !== questions.length ? 
        (<Game step={step} question={question} onClickVariant={onClickVariant}/>
        ) : (<Result correct={correct}/> 
      )}
    </div>
  );
}

export default App;