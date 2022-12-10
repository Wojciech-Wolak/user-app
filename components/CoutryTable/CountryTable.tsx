import React, { useMemo } from 'react'
import { CountryTableProps } from './CountryTable.types'

const CountryTable = ({ country }: CountryTableProps) => {

    const tableRows = useMemo(()=>{
        return (
            Object.entries(country).map(([key, value]) => {
                if(value instanceof Array){
                    const options = value.map(el => <option key={el}>{el}</option>)

                    return (
                        <tr key={key} className="countryTable__row">
                            <th className='countryTable__rowField countryTable__rowField--th'>{key.replaceAll("_", " ")}</th>
                            <td className='countryTable__rowField'>
                                <select className='countryTable__select'>
                                    {options}
                                </select>
                            </td>
                        </tr>
                    )
                }
                return (
                    <tr key={key} className="countryTable__row">
                        <th className='countryTable__rowField countryTable__rowField--th'>{key.replaceAll("_", " ")}</th>
                        <td className='countryTable__rowField'>{value}</td>
                    </tr>
                )
            })
        )
    }, [country])

  return (
    <table className='countryTable'>
        <tbody>
            {tableRows}
        </tbody>
    </table>
  )
}

export default CountryTable