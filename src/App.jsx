import React, { useState } from "react";
import "./App.css";

function App() {
  const SYMBOL_X = "X";
  const SYMBOL_O = "O";
  const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //Тереперішній стан гри
  const [state, setState] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  //Теперішній год
  const [currentStep, setCurrentStep] = useState(SYMBOL_X);
  //Розуміння чи переміг чи ні
  const [win, setWin] = useState(false);
  //Стилі коли переміг
  const [StyleWin, SetStyleWin] = useState("");
  //Хто переміг
  const [comboWin, SetcomboWin] = useState([]);
  //Для розуміння хто переміг та чи перемога є
  function Winner(newStates) {
    const stateStartX = [];
    const stateStartO = [];
    newStates.forEach((item, idx) => {
      if (item === SYMBOL_X) {
        stateStartX.push(idx);
      } else if (item === SYMBOL_O) {
        stateStartO.push(idx);
      } else {
        return;
      }
    });
    winner.forEach((itemI, idx) => {
      const resultsX = itemI.every((itemII) => stateStartX.includes(itemII));
      const resultsO = itemI.every((itemII) => stateStartO.includes(itemII));
      if (resultsX) {
        SetcomboWin([idx, SYMBOL_X]);
        setWin(`${SYMBOL_X}`);
        SetStyleWin(true);
      } else if (resultsO) {
        SetcomboWin([idx, SYMBOL_O]);
        setWin(`${SYMBOL_O}`);
        SetStyleWin(true);
      }
    });
  }
  // Стиль коли переміг
  function winnerBackground(idx) {
    if (!comboWin.length) {
      return;
    }
    if (winner[comboWin[0]].includes(idx)) {
      if (comboWin[1] === SYMBOL_X) {
        return "Background_red";
      } else if (comboWin[1] === SYMBOL_O) {
        return "Background_blue";
      }
    } else {
      return null;
    }
  }
  //Стилі на хрестики та нулики
  function LogicColorSymbol(symbol) {
    switch (symbol) {
      case SYMBOL_X:
        return "symbol-x";
      case SYMBOL_O:
        return "symbol-o";
      default:
        return "name";
    }
  }
  //головна функція при клікі
  const handleClickListener = (idx) => {
    if (!!state[idx]) {
      return;
    }
    const newState = [...state];
    newState[idx] = currentStep;
    Winner(newState);
    setState(newState);
    if (currentStep === SYMBOL_O) {
      setCurrentStep(SYMBOL_X);
    } else {
      setCurrentStep(SYMBOL_O);
    }
  };
  function resetFn() {
    setCurrentStep(SYMBOL_X);
    setWin(false);
    SetStyleWin("");
    SetcomboWin([]);
    setState([null, null, null, null, null, null, null, null, null]);
  }
  return (
    <div className={`game`}>
      <div className="get_info">
        <span>
          Йде крок:
          <span className={` ${LogicColorSymbol(currentStep)}`}>
            {` ${currentStep}`}
          </span>
        </span>
        <div className="Winner_div">
          Winner : <span className={`${LogicColorSymbol(win)}`}>{win}</span>
        </div>
        <div className={`info_hehe ${StyleWin ? "info_hehe_on" : ""}`}>
          Шо ти клікаєш я тебе зараз по клікаю, виходь! звідси!
        </div>
      </div>
      <div className={`grid ${StyleWin ? "win_this_game" : ""}`}>
        {state.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`${LogicColorSymbol(item)} ${winnerBackground(idx)}`}
              onClick={() => {
                handleClickListener(idx);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          resetFn();
        }}
        className={`btn_reset`}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
