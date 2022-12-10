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
        default :{
            return [...state]
        }
    }
}