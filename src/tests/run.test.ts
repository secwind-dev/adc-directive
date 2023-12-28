import { describe, it, expect } from 'vitest'
import * as run from '../fnRun'
import * as to from '../fnTo'
const USERS = [
    {
        id: 1,
        name: 'Max',
        age: 25,
        salary: 17500,
    },
    {
        id: 2,
        name: 'Jam',
        age: 15,
        salary: 9000,
    },
    {
        id: 3,
        name: 'Bar',
        age: 30,
        salary: 25000,
    },
    {
        id: 99,
        name: 'Lisa',
        age: 27,
        salary: 35000,
    },
]

describe('ADC Run of Loop', () => {
    it('dcRunProcess expect (Index)2_(id)3(Index)3_(id)99', () => {
        let res = ''
        run.dcRunProcess(
            USERS,
            (item, index) => {
                res = res += to.dcToCombineText(
                    ['(Index)' + index, '(id)' + item.id],
                    '_'
                )
            },
            2
        )
        expect(res).toBe('(Index)2_(id)3(Index)3_(id)99')
    })
    it('dcRunProcess expect Total All Salary', () => {
        let val = 0
        run.dcRunProcess(USERS, (v, index) => {
            val = val += v.salary
        })
        expect(val).toBe(86500)
    })
    it('dcRunProcess เลือก between index expect 2+3+4+5 = 18', () => {
        let val = 0
        run.dcRunProcess(
            [1, 2, 3, 4, 5, 6, 7, 8],
            (v, index) => {
                val += v
            },
            [2, 5]
        )
        expect(val).toBe(18)
    })

    it('dcToRandomNumber expect true', () => {
        let res = to.dcToRandomNumber(20, 10)
        expect(res >= 10 && res <= 20).toBe(true)
    })
})
