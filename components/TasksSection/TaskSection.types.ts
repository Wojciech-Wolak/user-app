export type TaskType = {
    id: string;
    date: Date;
    content: string;
}

export type ActionType = 
    | {type: "add", payload: TaskType}
    | {type: "remove", payload: string}

export type TaskSectionProps = {
    title?: string;
}