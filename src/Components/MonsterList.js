import React, {useState, useRef} from "react";
import MonsterInfo from "./MonsterInfo";

export default function MonsterList({monsterInfo}) {
    
    const crudcrudRef = useRef();
    const url = 'https://crudcrud.com/api/';
    let [monsterID, setMonsterID] = useState('');
    let [storedMonsterInfo, setInfo] =useState('');
    const [error, setError] = useState(null);

    const getENDPOINT = (event) =>{       
        const ENDPOINT = crudcrudRef.current.value;
        if(ENDPOINT === '') return
        console.log(ENDPOINT);
        addMonster(ENDPOINT);
    }
    
    const addMonster = (ENDPOINT) =>{
        const crudcrud = `${url}${ENDPOINT}/monsters`;
        fetch(crudcrud, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({monsterInfo})
        });
        getMonster(ENDPOINT)
    }
    const getMonster = (ENDPOINT) =>{
        const crudcrud = `${url}${ENDPOINT}/monsters`;
        fetch(crudcrud)
            .then(response => {
                console.log(response);
                if(!response.ok){
                    throw Error(`Monster is not found.`);
                }
                return response.json()})
            .then(data => {setMonsterID(data.Name) ; setInfo(data); console.log(data); setError(null)}) 
            .then(response => {
                response.forEach(storedMonsterInfo => document.write(storedMonsterInfo.name +'<br>'))
            })
            .catch(err =>{
                setError(err.message);
            })
    }
    return(
        <div>
            <p>To add a monster you will need to get a <a href="https://crudcrud.com/">CRUD CRUD ENDPOINT</a> first.</p>
            https://crudcrud.com/api/<input ref = {crudcrudRef} type="text"/>
            <button onClick={getENDPOINT}>Add Monster</button>            
            {error && <div> { error }</div>}
            <MonsterInfo monsterInfo={storedMonsterInfo}/>
        </div>
        
        // monsters.map(monster => {
        //     return <Monster key={monster.id} monster ={monster} />
        // })
    )
}