const log = console.log.bind(console)

/**
 * 一个月的信息
 */
interface MonthInfo {
    /**
     * 这个月的天数
     */
    numberOfDays: number
    /**
     * 第一天是星期几
     */
    firstDay: number
    /**
     * 最后一天是星期几
     */
    lastDay: number
}

function daysOfMonthInYear(year: number): number[] {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (isLeapYear(year)) {
        days[1] = 29
    }
    return days
}

/**
 * 得到xxxx年xx月的月份信息
 * @param year xxxx年
 * @param month xx月（从1开始计数）
 */
function getMonthInfo(year: number, month: number): MonthInfo | null {
    if (month < 0 || month > 12) {
        return null
    }
    const daysOfMonth = daysOfMonthInYear(year)
    const days = daysOfMonth[month - 1]

    return {
        numberOfDays: days,
        firstDay: new Date(`${year}-${month}-1`).getDay(),
        lastDay: new Date(`${year}-${month}-${days}`).getDay(),
    }
}

/**
 * 是不是闰年
 * @param year 年份
 */
function isLeapYear(year: number): boolean {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true
    }
    return false
}

/**
 * 得到xxxx年xx月分的数组表达式
 *
 * @param year 年份
 * @param month 月份
 */
function monthView(year: number, month: number): (number | undefined)[][] {
    const result: (number | undefined)[][] = []
    const monthInfo = getMonthInfo(year, month)
    if (!monthInfo) {
        return result
    }
    let { numberOfDays, firstDay, lastDay } = monthInfo
    // 日期迭代数
    let n = 1
    // 星期几迭代数
    let dayIndex = 0
    let week: (number | undefined)[] = []
    while (n <= numberOfDays) {
        if (dayIndex == 0 || dayIndex % 7 == 0) {
            week = []
            result.push(week)
        }
        if (dayIndex >= firstDay) {
            week.push(n)
            n++
        } else {
            week.push(undefined)
        }
        dayIndex++
    }
    return result
}

function testMonthView() {
    let view = monthView(2018, 1)
    log(view)
}

testMonthView()
