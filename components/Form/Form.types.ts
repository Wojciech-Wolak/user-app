import Link from "next/link"
import React from "react"

export type FormComponent<T extends string> = ({ 
    heading: string;
    handler?: (e: React.FormEvent<HTMLFormElement>) => void
    fields?: ({ label: string, name: T } & React.InputHTMLAttributes<HTMLInputElement>)[], 
    handleChange: (id: T, value:string) => void, 
    inputs?: Record<T, string>, 
    errorMsg: string, 
    buttons: ({content: string} 
        & (React.ComponentProps<typeof Link> | React.ButtonHTMLAttributes<HTMLButtonElement>))[]
})