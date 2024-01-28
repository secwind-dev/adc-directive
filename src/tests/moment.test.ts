import { describe, it, expect } from 'vitest'
import {
    addDate,
    addHour,
    addMinute,
    addMonth,
    dateDiffToString,
    dateToCombine,
} from '../fnMoment'

describe('ADC Moment For Test', () => {
    it('dateDiffToString < 3 currentDate', () => {
        const res = dateDiffToString(addDate(new Date(), -3))
        expect(res).toBe('3 วันที่แล้ว')
    })
    it('dateDiffToString > 7 currentDate', () => {
        const res = dateDiffToString(addDate(new Date(), +7))
        expect(res).toBe('7 วัน')
    })
    it('dateDiffToString < 25 min', () => {
        const res = dateDiffToString(addMonth(new Date(), -30))
        expect(res).toBe('2 ปีที่แล้ว')
    })
    it('dateDiffToString < 25 min', () => {
        const res = dateDiffToString(addMinute(new Date(), -25))
        expect(res).toBe('25 นาทีที่แล้ว')
    })
    it('dateDiffToString 0 min', () => {
        const res = dateDiffToString(addMinute(new Date(), 0))
        expect(res).toBe('นาทีที่แล้ว')
    })
    it('dateDiffToString < 2hr', () => {
        const res = dateDiffToString(addHour(new Date(), -2))
        expect(res).toBe('2 ชั่วโมงที่แล้ว')
    })
    it('dateToCombine = 2019-05-03', () => {
        const res = dateToCombine(new Date('2019/05/03'))
        expect(res.valueOfDate).toBe('2019-05-03')
    })
})
