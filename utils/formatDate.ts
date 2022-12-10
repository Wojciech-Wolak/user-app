const getFormatedNumber = (num:number) => num < 10 ? `0${num}` : num

export const formatDate = (date: Date) => {
    const day = getFormatedNumber(date.getDate())
    const month = getFormatedNumber(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = getFormatedNumber(date.getHours())
    const minutes = getFormatedNumber(date.getMinutes())

    return `${hour}:${minutes}, ${day} / ${month} / ${year}`
}