import { describe, it, expect } from 'vitest'
import * as valid from '../fnValidate'

const payload = {
    id: 99,
    name: 'Lisa',
    age: 27,
    salary: 35000,
    likes: ['cat', 'car', 'football'],
    profile: {
        job: {
            position: 'DEV',
            pe: 48,
            color: ['red', 'blue', 'green', 999],
            animal: {
                name: 'CaT',
            },
        },
    },
}

describe('ADC Validate', () => {
    it('validateObject expect to status 1', () => {
        const res = valid.validateObject(payload, [
            'id',
            'salary',
            'profile.job.color[2]',
        ])
        expect(res.status).toBe(1)
    })
    it('validateObject expect to status 0', () => {
        const res = valid.validateObject(payload, ['id', 'color'])
        expect(res.status).toBe(0)
    })
})
