export type TaskType = {
    id: string;
    date: Date;
    title: string;
    content: string;
    done: boolean;
}

export type TaskAirtableType = {
    id: string;
    createdTime: string;
    fields: {
        Content: string;
        Date: string;
        Title: string;
        done?: boolean;
    }
}

export type ActionType = 
    | {type: "add", payload: TaskType}
    | {type: "remove", payload: string}
    | {type: "reset"}

export type TaskSectionProps = {
    title?: string;
}