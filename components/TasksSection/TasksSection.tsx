import { Auth } from 'aws-amplify'
import React, { useEffect, useReducer, useState } from 'react'
import { formatDate } from 'utils/formatDate'
import TaskItem from './TaskItem'
import { taskReducer } from './TaskSection.reducer'
import { TaskAirtableType, TaskSectionProps } from './TaskSection.types'
import type { CognitoUserAttribute } from "amazon-cognito-identity-js"

const TasksSection = ({ title }: TaskSectionProps) => {
    const [inputValues, setInputValues] = useState<{title:string, content:string}>({content:"",title:""})
    const [tasks, dispatch] = useReducer(taskReducer, [])

    const addTasks = (records:TaskAirtableType[]) => {
        records.forEach((record: TaskAirtableType) => {
            dispatch({type:"add", payload:{
                id: record.id,
                content: record.fields.Content,
                date: new Date(record.createdTime),
                title: record.fields.Title,
                done: record.fields.Done || false
            }})
        })
    }

    const checkUser = (cb: (attrs: CognitoUserAttribute[]) => void) => {
        Auth.currentAuthenticatedUser().then(user => {
            Auth.userAttributes(user).then(cb).catch(err => {
                console.log('Error: ', err);
            })
        }).catch(err => {
            console.log('Error: ', err);
        })
    }

    useEffect(()=> {
        checkUser(attributes => {
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
                addTasks(data.records)
            })
        })
    }, [])

    const handleAdd = () =>{
        if(inputValues.title.length){
            checkUser(attributes => {
                const airtableData = attributes.find(attr => attr.Name === "custom:airtable") 

                if(!airtableData?.Value){
                    return;
                }
                const data = JSON.parse(airtableData?.Value)

                fetch("/api/add-task", {
                    method: "POST",
                    body: JSON.stringify({
                        baseID: data.baseID,
                        content: inputValues.content,
                        title: inputValues.title,
                        done: false,
                        date: new Date()
                    })
                }).then(res => {
                   return res.json();
                }).then(({data}) => {
                    addTasks(data.records)
                })
            })
            
            setInputValues({content:"",title:""})
        }
    }

    const handleRemove = (id: string) => {
        checkUser(attributes => {
            const airtableData = attributes.find(attr => attr.Name === "custom:airtable") 

            if(!airtableData?.Value){
                return;
            }
            const data = JSON.parse(airtableData?.Value)

            fetch("/api/remove-task", {
                method: "POST",
                body: JSON.stringify({
                    baseID: data.baseID,
                    id
                })
            }).then(res => {
               return res.json();
            }).then(({data}) => {
                data.records.forEach((record: {id:string, deleted: boolean}) => {
                    if(record.deleted){
                        dispatch({ type:"remove", payload:record.id })
                    }
                })
            })
        })
    }

    const changeDoneHandler = (id:string, newValue: boolean) => {
        checkUser(attributes => {
            const airtableData = attributes.find(attr => attr.Name === "custom:airtable") 

            if(!airtableData?.Value){
                return;
            }
            const data = JSON.parse(airtableData?.Value)

            fetch("/api/change-done", {
                method: "POST",
                body: JSON.stringify({
                    baseID: data.baseID,
                    done: newValue,
                    id,
                })
            }).then(res => {
               return res.json();
            }).then(({data}) => {
                data.records.forEach((record: TaskAirtableType) => {
                    dispatch({type:"update", payload:{
                        id: record.id,
                        content: record.fields.Content,
                        date: new Date(record.createdTime),
                        title: record.fields.Title,
                        done: record.fields.Done || false
                    }})
                })
                
            })
        })
    }

  return (
    <div className='taskSection'>
        {title ? <h2 className='taskSection__heading' >{title}</h2> : null}
        <div className='taskSection__formWrapper'>
            <div className='taskSection__inputsWrapper'>
                <input 
                    className='taskSection__input' 
                    value={inputValues.title} 
                    onChange={e => setInputValues(prev => ({...prev, title: e.target.value}))} 
                    placeholder="Title of task"
                />
                <textarea
                    className='taskSection__textarea'
                    placeholder='Content of task'
                    value={inputValues.content} 
                    onChange={e => setInputValues(prev => ({...prev, content: e.target.value}))} 
                ></textarea>
            </div>
            <button 
                className='taskSection__inputButton' 
                onClick={handleAdd}
            >
                    Add
            </button>
        </div>
        <ul className='taskSection__list'>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    changeDoneHandler={() => changeDoneHandler(task.id, !task.done)}
                    removeHandler={() => handleRemove(task.id)}
                    {...task}  
                    />
            ))}
        </ul>
    </div>
  )
}

export default TasksSection