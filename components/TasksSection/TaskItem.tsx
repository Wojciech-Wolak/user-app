import React from 'react'
import { formatDate } from 'utils/formatDate'
import { TaskType } from './TaskSection.types'

const TaskItem = ({content, date, done, title, id, removeHandler}: TaskType & {removeHandler: (id: string) => void}) => {
  return (
    <li className='taskSection__listItem'>
    <div className='taskSection__listItemContent'>
        <h3>{title}</h3> 
        <p>{content}</p>
    </div>
    <span>
        {formatDate(date)}
    </span>
    <button
        className='taskSection__listItemChangeDoneBtn'
    >
        Done: {done ? "🟢" : "🔴"}
    </button>
    <button 
        className='taskSection__listItemRemoveBtn'
        onClick={() => removeHandler(id)}
    >
        ❌
    </button>
</li>
  )
}

export default TaskItem