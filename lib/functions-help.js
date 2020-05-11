const INCREMENT_ONE_NUMBER_MONTH = 1

const currentDateToday = () => {

    const today = new Date()
    return today.getFullYear, '-', (today.getMonth + INCREMENT_ONE_NUMBER_MONTH), '-', today.getDay
}

export default {

    currentDateToday
}