import { describe, it, expect } from 'vitest'
import { ci, withCi } from '../fnCi'
import { toDate } from '../fnTo'
import { withAddDate, withAddHour, withAddMinute } from '../fnCompose'
import { dateToCombine } from '../fnMoment'

describe('ADC Ci', () => {
    it('ci expect 2024-05-13 17:30:00', () => {
        const res = ci(
            '03-05-2024 12:00',
            toDate,
            withAddDate(10),
            withAddHour(5),
            withAddMinute(30),
            dateToCombine
        )

        expect(res.valueOfValue).toBe('2024-05-13 17:30:00')
    })
    it('withCi expect 2024-05-13 17:30:00', () => {
        const res = withCi(
            toDate,
            withAddDate(10),
            withAddHour(5),
            withAddMinute(30),
            dateToCombine
        )

        expect(res('03-05-2024 12:00').valueOfValue).toBe('2024-05-13 17:30:00')
    })
})
