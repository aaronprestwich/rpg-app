import React, { useState, useRef, useEffect } from "react";
import MonsterInfo from "./MonsterInfo";
import MonsterList from "./MonsterList";


const Container = () => {

    const url = 'https://www.dnd5eapi.co/api';
    const monsterIDRef = useRef();
    const [error, setError] = useState(null);
    let [monsterID, setMonsterID] = useState('');
    let [monsterInfo, setInfo] =useState('');

    const getNewID = (event) => {
        const id = monsterIDRef.current.value;
        if(id === '') return
        console.log(id);
        monsterIDRef.current.value = null;
        getNewMonster(id.toLowerCase());
    }

    const getNewMonster = (id) =>{
        
            fetch(`${url}/monsters/${id}`)
            .then(response => {
                console.log(response);
                if(!response.ok){
                    throw Error(`${id} is not found in the DND 5e API https://www.dnd5eapi.co/api/monsters/${id}. Try "aboleth".`);
                }
                return response.json()})
            .then(data => {setMonsterID(data.Name) ; setInfo(data); console.log(data); setError(null)}) 
            .catch(err =>{
                setError(err.message);
            })
    }

    return(
        <>
        
        <input ref = {monsterIDRef} type="text"/>
        <button onClick={getNewID}>Get New Monster</button>
        <button>Remove Monster</button>
        {error && <div> { error }</div>}
        <MonsterInfo monsterInfo = {monsterInfo}/>
        <MonsterList monsterInfo = {monsterInfo}/>
        
        </>
    )
}
export default Container;