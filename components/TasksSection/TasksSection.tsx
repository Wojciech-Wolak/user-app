import React, { useReducer, useState } from 'react'
import { formatDate } from 'utils/formatDate'
import { taskReducer } from './TaskSection.reducer'
import { TaskSectionProps } from './TaskSection.types'

const TasksSection = ({ title }: TaskSectionProps) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [tasks, dispatch] = useReducer(taskReducer, [])

    const handleAdd = () =>{
        if(inputValue.length){
            dispatch({type:"add", payload:{
                id: Math.random().toString(),
                content:inputValue,
                date: new Date()
            }})
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
                        {task.content}
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