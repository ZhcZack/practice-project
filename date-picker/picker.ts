interface MonthInfo {
    numberOfDates: number
    firstDay: string
    lastDay: string
}

function getMonthInfo(date: Date): MonthInfo {
    const year = date.getFullYear()
    const month = date.getMonth()
    return {} as MonthInfo
}

function isLeapYear(year: number): boolean {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true
    }
    return false
}

/**一个月有几天 */
function daysNumberOfMonth(year: number, month: number): number | undefined {
    if (month < 0 || month > 11 || month !== Math.floor(month)) {
        return undefined
    }
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (isLeapYear(year)) {
        months[1] = 29
    }
    return months[month]
}