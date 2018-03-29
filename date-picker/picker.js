"use strict";
const log = console.log.bind(console);
function daysOfMonthInYear(year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isLeapYear(year)) {
        days[1] = 29;
    }
    return days;
}
/**
 * 得到xxxx年xx月的月份信息
 * @param year xxxx年
 * @param month xx月（从1开始计数）
 */
function getMonthInfo(year, month) {
    if (month < 0 || month > 12) {
        return null;
    }
    const daysOfMonth = daysOfMonthInYear(year);
    const days = daysOfMonth[month - 1];
    return {
        numberOfDays: days,
        firstDay: new Date(`${year}-${month}-1`).getDay(),
        lastDay: new Date(`${year}-${month}-${days}`).getDay(),
    };
}
/**
 * 是不是闰年
 * @param year 年份
 */
function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return true;
    }
    return false;
}
function monthView(year, month) {
    const result = [];
    const monthInfo = getMonthInfo(year, month);
    if (!monthInfo) {
        return result;
    }
    let { numberOfDays, firstDay, lastDay } = monthInfo;
    // 日期迭代数
    let n = 1;
    // 星期几迭代数
    let dayIndex = 0;
    let week = [];
    while (n <= numberOfDays) {
        if (dayIndex == 0 || dayIndex % 7 == 0) {
            week = [];
            result.push(week);
        }
        if (dayIndex >= firstDay) {
            week.push(n);
            n++;
        }
        else {
            week.push(undefined);
        }
        dayIndex++;
    }
    return result;
}
function testMonthView() {
    let view = monthView(2018, 1);
    log(view);
}
testMonthView();
