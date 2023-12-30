import { describe, it, expect } from 'vitest'
import * as valid from '../fnValidate'

const payload = {
    id: 99,
    name: 'Lisa',
    age: 27,
    salary: 35000,
    likes: ['cat', 'car', 'football'],
}

describe('ADC Validate', () => {
    it('validateObject expect to status 1', () => {
        const res = valid.validateObject(payload, ['id', 'salary'])
        expect(res.status).toBe(1)
    })
    it('validateObject expect to status 0', () => {
        const res = valid.validateObject(payload, ['id', 'color'], 'test msg')
        expect(res.status).toBe(0)
    })
})
