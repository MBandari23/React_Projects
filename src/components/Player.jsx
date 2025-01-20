import {useState} from 'react';

export default function Player({initialName, symbol, isActive}){
    // Usestate to update the playernames in the input form
    const [playerName, setPlayerName] = useState(initialName);
    // usestate to toggle between edit and save options
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !isEditing);
    }

    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.Value);
        //Here we are taking the input from the user with the below code line and feeding back the input form with the updated player name
        //<input type="text" required Value={playerName} onChange ={HandleChange}/>
        //This concept is called as 2 way binding

    }
    let editablePlayerName = <span className = "player-name">{playerName}</span>;
    // let btnCaption = 'Edit';
    if(isEditing){
        editablePlayerName = <input type="text" required Value={playerName} onChange ={handleChange}/>;
        // btnCaption = 'Save';
    }
    return(
        <li className={isActive ? 'active' : undefined}>
        <span className = "player">
          {editablePlayerName}
          <span className = "player-symbol">{symbol}</span>
        </span>
        <button onClick = {handleEditClick}>{isEditing? 'Save': 'Edit'}</button>
        </li>
    );
}