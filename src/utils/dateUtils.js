export const dateFormat = (date, includeDay = false) => {

    let formattedDate = new Date(date).toString()

    if(includeDay) return formattedDate.substring(0, 15);

    return formattedDate.substring(4, 15)


}