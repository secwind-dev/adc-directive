import { describe, it, expect } from 'vitest'
import { dcFindPayload, dcNestedKey } from '../directive'

const payload = {
    id: 99,
    name: 'Lisa',
    age: 27,
    salary: 35000,
    likes: ['cat', 'car', 'football'],
}

describe('ADC Validate', () => {
    it('dcFindPayload toMatchObject PAYLOAD', () => {
        const res = dcFindPayload(payload, Object.keys(payload))
        expect(res).toMatchObject(payload)
    })
    it('dcFindPayload Select id toMatchObject PAYLOAD', () => {
        const res = dcFindPayload(payload, ['id'])
        expect(res).toMatchObject(payload)
    })
    it('dcFindPayload toThrowError', () => {
        expect(() => dcFindPayload(payload, ['id', 'color'])).toThrowError(
            /color/
        )
    })
    it('dcFindPayload toThrowError(/test msg/)', () => {
        expect(() =>
            dcFindPayload(payload, ['id', 'color'], 'test msg')
        ).toThrowError(/test msg/)
    })
    it('dcNestedKey expect undefined', () => {
        const res = dcNestedKey(payload, ['notName'])
        expect(res).toBe(undefined)
    })
})
