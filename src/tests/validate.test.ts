import { describe, it, expect } from 'vitest'
import { dcFindPayload } from '../directive'

const payload = {
    id: 99,
    name: 'Lisa',
    age: 27,
    salary: 35000,
    likes: ['cat', 'car', 'football'],
}

describe('ADC Validate', () => {
    it('dcFindPayload toThrowError key color', () => {
        expect(() => dcFindPayload(payload, ['id', 'color'])).toThrowError(
            /color/
        )
    })
    it('dcFindPayload toThrowError(/test msg/)', () => {
        expect(() =>
            dcFindPayload(payload, ['id', 'color'], 'test msg')
        ).toThrowError(/test msg/)
    })
})
