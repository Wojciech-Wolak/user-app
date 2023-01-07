import { Reducer } from "react";
import { ActionType, TaskType } from "./TaskSection.types";

export const taskReducer: Reducer<TaskType[], ActionType> = (state, action) => {
    switch (action.type){
        case "add":{
            return [...state, action.payload]
        }
        case "remove":{
            return state.filter(task => task.id !== action.payload)
        }
        case "reset": {
            return []
        }
        case "update": {
            return state.map(task => {
                if(task.id === action.payload.id){
                    return action.payload
                }
                else return task
            })
        }
        default :{
            return [...state]
        }
    }
}