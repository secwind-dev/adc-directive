import { toCombineText } from './fnTo'

export function dateDiff(a: Readonly<Date>, b: Date = new Date()) {
    const diffMs = Math.abs(a.valueOf() - b.valueOf()) // milliseconds
    const secs = Math.floor(Math.abs(diffMs) / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)

    return {
        days: days,
        hours: hours % 24, // ชั่วโมงที่ไม่เท่ากันถ้าเทียบวันเดียวกัน
        hoursTotal: hours, // ชั่วโมงทั้งหมด
        minutesTotal: mins, //นาทีทั้งหมด
        minutes: mins % 60, // นาทีที่ไม่เท่ากันถ้าเทียบวันเดียวกัน
        seconds: secs % 60,
        secondsTotal: secs,
    }
}

export function dateDiffToString(
    a: Readonly<Date>,
    b: Date = new Date(),
    local: 'th' | 'en' = 'th'
): string {
    const { minutesTotal, days } = dateDiff(a, b)

    const isTh = local == 'th'
    let suffix = isTh ? 'ที่แล้ว' : ' ago'
    const years = Math.floor(days / 365)
    const months = Math.floor(days / 30)
    const hours = Math.floor(minutesTotal / 60)

    if (a.valueOf() > b.valueOf()) suffix = ''
    if (years) return years + ` ${isTh ? 'ปี' : 'year'}${suffix}`
    else if (months) return months + ` ${isTh ? 'เดือน' : 'months'}${suffix}`
    else if (days) return days + ` ${isTh ? 'วัน' : 'days'}${suffix}`
    else if (hours) return hours + ` ${isTh ? 'ชั่วโมง' : 'mins'}${suffix}`
    else if (minutesTotal)
        return minutesTotal + ` ${isTh ? 'นาที' : 'mins'}${suffix}`
    else return isTh ? 'นาทีที่แล้ว' : 'a few seconds ago'
}

export function addDate(value: Readonly<Date>, day: number) {
    const event = new Date(value.valueOf())
    const res = event.getDate() + day
    event.setDate(res)
    return event
}
export function addMonth(value: Readonly<Date>, month: number) {
    const event = new Date(value.valueOf())
    const res = event.getMonth() + month
    event.setMonth(res)
    return event
}

export function addHour(value: Readonly<Date>, hour: number) {
    const event = new Date(value.valueOf())
    const res = event.getHours() + hour
    event.setHours(res)
    return event
}

export function addMinute(value: Readonly<Date>, minute: number) {
    const event = new Date(value.valueOf())
    const res = event.getMinutes() + minute
    event.setMinutes(res)
    return event
}

export function dateToCombine(value: Readonly<Date>) {
    const year = value.getFullYear().toString()
    const month = (value.getMonth() + 1).toString().padStart(2, '0')
    const day = value.getDate().toString().padStart(2, '0')
    const hour = value.getHours().toString().padStart(2, '0')
    const minute = value.getMinutes().toString().padStart(2, '0')
    const second = value.getSeconds().toString().padStart(2, '0')
    const valueOfDate = toCombineText([year, month, day], '-')
    const valueOfTime = toCombineText([hour, minute, second], ':')
    const valueOfValue = toCombineText([valueOfDate, valueOfTime], ' ')

    const th = value.toLocaleDateString('th', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    })

    return {
        year: year.toString(),
        month,
        day,
        hour,
        minute,
        second,
        valueOfDate,
        valueOfTime,
        valueOfValue,
        th,
    }
}
