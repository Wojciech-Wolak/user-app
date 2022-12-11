import Link from 'next/link'
import React from 'react'
import { FormComponent } from './Form.types'

const Form = <T extends string>({ heading, handler, fields, handleChange, inputs, errorMsg, buttons}: FormComponent<T>) => {
  return (
    <form className='register__form' onSubmit={handler}>
            <h2 className='register__heading'>{heading}</h2>
            {fields.map(field => (
                <label key={field.name}>
                    <h3 className='register__inputHeading'>{field.label}</h3>
                    <input 
                        className={`register__input register__input--${field.id}`}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        value={inputs[field.name]}
                        name={field.id}
                        placeholder={field.label}
                        type={field.type}
                    />
                </label>
            ))}
            {errorMsg ? <p className='register__errorMsg'>{errorMsg}</p>:null}
            {buttons.map(button => 'href' in button 
                ? <Link key={button.content} className='register__link' href={button.href}>{button.content}</Link> 
                : <button 
                    key={button.content}
                    className='register__button' 
                    type={button.type}
                    onClick={button.onClick}
                >
                    {button.content}
                </button>
            )}
            
            
        </form>
  )
}

export default Form