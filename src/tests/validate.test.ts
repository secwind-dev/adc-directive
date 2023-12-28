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
    it('dcValidatePayload expect to status 200', () => {
        const res = valid.dcValidatePayload(payload, ['id', 'salary'])
        expect(res.status).toBe(200)
    })
    it('dcValidatePayload expect to status 404', () => {
        const res = valid.dcValidatePayload(
            payload,
            ['id', 'color'],
            'test msg'
        )
        expect(res.status).toBe(404)
    })
})
