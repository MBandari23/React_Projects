import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard =[
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


//helper functin for the derivedActivePlayer

function derivedActivePlayer(gameTurns){
  let curPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      curPlayer = 'O';
    }
  return curPlayer;
}



function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');
  //commenting the above codeline to avoid unnecessary usestate values
  //Instead of having dedicated activeplayer state, we can have derived state update
  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];
    for( const turn of gameTurns){
        //looping over the turns array
        //in below we are destructuring the objects in the 1st item of the array 
        const {square, player} = turn; 
        const {row, col} = square;

        gameBoard [row][col] = player
    }
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
      winner = firstSquareSymbol;
    }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    if(winner || hasDraw) return;
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );
    
    //In the below line, the new turns depend on the old turns array
    //This method is "Function updator"
    setGameTurns((prevTurns) => {

     const curPlayer  = derivedActivePlayer(prevTurns);
    //creation of a deep copy
    // ...prevTurns --> this shows old turns array i.e, the existing turns. bcz we can't update the state as immutable way
    // and {square: {row: rowIndex, col: colIndex}, player: activePlayer} --> this shows the new turns array
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: curPlayer},...prevTurns]

      return updatedTurns;
      //Passing the updatedTurns array as a new value to the gameturns state
    } );
  }

  function handleRestart(){
    setGameTurns([]);
  }
  return (
  <main>
    <div id="game-container">
      {/* PLAYERS   */}
      <ol id ="players" className = "highlight-player" >
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
        <Player initialName="Player 2" symbol="0" isActive={activePlayer === 'O'}/>
      </ol> 
      {(winner || hasDraw) && <GameOver winner ={winner} onRestart = {handleRestart}/>  }
      
      <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}/>
      <Log turns = {gameTurns}/>
    </div>
  </main>
  );
}

export default App
