import React, { useState } from "react";
import "./App.css";

let diceToValObj = {
  dice1: 0,
  dice2: 0,
  dice3: 0,
  dice4: 0,
  dice5: 0,
  dice6: 0,
};
let diceValArr = ["dice1", "dice2", "dice3", "dice4", "dice5", "dice6"];

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userBalance, setUserBalance] = useState(100);
  const [remainingSeconds, setRemainingSeconds] = useState(10);
  const [chooseOptions, setChooseOptions] = useState(false);
  const [displayWinMove, setDisplayWinMove] = useState(false);
  const [wonAmt, setWonAmt] = useState(0);
  const [lostAmt, setLostAmt] = useState(0);
  const [winMove, setWinMove] = useState(0);

  const decrementTotalBalance = (diceVal) => {
    if (chooseOptions && userBalance <= 99 && diceToValObj[diceVal] >= 1) {
      let val = diceToValObj[diceVal] - 1;
      diceToValObj[diceVal] = val;
      setUserBalance(userBalance + 1);
    }
  };
  const incrementTotalBalance = (diceVal) => {
    if (chooseOptions && userBalance <= 100 && diceToValObj[diceVal] >= 0) {
      let val = diceToValObj[diceVal] + 1;
      diceToValObj[diceVal] = val;
      setUserBalance(userBalance - 1);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setChooseOptions(true);
    let tempSecs = 10;
    let interval = setInterval(() => {
      if (tempSecs > 0) {
        setRemainingSeconds((remainingSeconds) => remainingSeconds - 1);
        tempSecs = tempSecs - 1;
      } else {
        setChooseOptions(false);
        clearInterval(interval);
        rollDice();
      }
    }, 1000);
  };

  const rollDice = () => {
    setTimeout(() => {
      let diceNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      setWinMove(diceNum);
      let wonAmt = 0;
      let lostAmt = 0;
      for (let j in diceToValObj) {
        if (j === diceValArr[diceNum - 1]) {
          wonAmt = wonAmt + diceToValObj[j];
          diceToValObj[j] = 0;
        } else {
          lostAmt = lostAmt + diceToValObj[j];
          diceToValObj[j] = 0;
        }
      }
      afterResult(wonAmt, lostAmt);
    }, 2000);
  };

  const afterResult = (wonAmt, lostAmt) => {
    setWonAmt(wonAmt);
    setLostAmt(lostAmt);
    setDisplayWinMove(true);
    setUserBalance((userBalance) => userBalance + wonAmt);
    setTimeout(() => {
      setWonAmt(0);
      setLostAmt(0);
      setDisplayWinMove(false);
      setGameStarted(false);
      setRemainingSeconds(10);
      setWinMove(0);
    }, 5000);
  };

  return (
    <div className="App">
      <h2>Your Balance : {`$${userBalance}`}</h2>
      {!gameStarted && (
        <button className="startGameBtn" onClick={startGame}>
          Start Game
        </button>
      )}
      {chooseOptions && (
        <h5>You have {`${remainingSeconds}`} seconds to make your move</h5>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "50px",
        }}
      >
        {diceValArr.map((data, index) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={"diceCont"}>
              <div>{`Dice ${index + 1}`}</div>
              <div>{`Bet: $${diceToValObj[data]}`}</div>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => decrementTotalBalance(data)}
                style={{ width: "50px" }}
                disabled={!chooseOptions}
              >
                -
              </button>
              <button
                className="btn btn-success"
                onClick={() => incrementTotalBalance(data)}
                style={{ width: "50px" }}
                disabled={!chooseOptions}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {displayWinMove && (
        <div className="displayWinMoceCont">
          <h4>{`Win Move :  Dice no ${winMove}`}</h4>
          <h4>{`You won $${wonAmt}`}</h4>
          <h4>{`You lost $${lostAmt}`}</h4>
          <h4>{`Your updated balance is $${userBalance}`}</h4>
        </div>
      )}
    </div>
  );
}
