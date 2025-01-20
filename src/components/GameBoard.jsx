import { useState } from "react";

export default function GameBoard({onSelectSquare, board}){
   
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);
// // Use of usestate is to manage and update the gameboard
//     function handleClick(rowIndex, colIndex){
//         setGameBoard((prevGameBoard)=> {
//             const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
//             // Why a copy?: In React, state should never be mutated directly. Creating a deep copy ensures immutability and prevents unintended side effects.
//             updateBoard[rowIndex][colIndex] = activePlayerSymbol;
//             // In the above line, we are doing immutable update
//             return updateBoard;
//         } );

//         onSelectSquare();
//     }
    return(
        <ol id="game-board">
            {board.map((row, rowIndex)=> <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex)=> <li
                     key={colIndex}>
                        <button 
                        onClick={() => onSelectSquare(rowIndex, colIndex)}  disabled = {playerSymbol !== null}>
                            {/* disabled = {playerSymbol !== null}
                            checks if the button is clicked already or not
                            if clicked then the button is disabled
                            if the condition is null, the button won't be disabled
                            */ }
                            {playerSymbol}
                        </button>
                     </li> )}
                </ol>
            </li>)}
        </ol>
    );
}