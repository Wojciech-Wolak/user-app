import { Auth } from 'aws-amplify'
import React, { useEffect, useReducer, useState } from 'react'
import { formatDate } from 'utils/formatDate'
import { taskReducer } from './TaskSection.reducer'
import { TaskAirtableType, TaskSectionProps } from './TaskSection.types'

const TasksSection = ({ title }: TaskSectionProps) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [tasks, dispatch] = useReducer(taskReducer, [])

    useEffect(()=> {
        Auth.currentAuthenticatedUser().then(user => {
            Auth.userAttributes(user).then(attributes => {
                const airtableData = attributes.find(attr => attr.Name === "custom:airtable") 

                if(!airtableData?.Value){
                    return;
                }

                const data = JSON.parse(airtableData?.Value)

                fetch("/api/get-tasks", {
                    method: "POST",
                    body: JSON.stringify({
                        baseID: data.baseID
                    })
                }).then(res => {
                   return res.json();
                }).then(({data}) => {
                    dispatch({type:"reset"})

                    data.records.forEach((record: TaskAirtableType) => {
                        dispatch({type:"add", payload:{
                            id: record.id,
                            content: record.fields.Content,
                            date: new Date(record.createdTime),
                            title: record.fields.Title,
                            done: record.fields.done || false
                        }})
                    })
                })
            }).catch(err => {
                console.log('Error: ', err);
            })
        }).catch(err => {
            console.log('Error: ', err);
        })
    }, [])

    const handleAdd = () =>{
        if(inputValue.length){
            // dispatch({type:"add", payload:{
            //     id: Math.random().toString(),
            //     content:inputValue,
            //     date: new Date()
            // }})
            setInputValue("")
        }
    }

  return (
    <div className='taskSection'>
        {title ? <h2 className='taskSection__heading' >{title}</h2> : null}
        <div className='taskSection__inputWrapper'>
            <input 
                className='taskSection__input' 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} 
            />
            <button 
                className='taskSection__inputButton' 
                onClick={handleAdd}
            >
                    Add
            </button>
        </div>
        <ul className='taskSection__list'>
            {tasks.map(task => (
                <li key={task.id} className='taskSection__listItem'>
                    <span className='taskSection__listItemContent'>
                        {task.title} {task.content}
                    </span>
                    <span>
                        {formatDate(task.date)}
                    </span>
                    <button 
                        className='taskSection__listItemRemoveBtn'
                        onClick={() => dispatch({ type:"remove", payload:task.id })}
                    >
                        ❌
                    </button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TasksSection