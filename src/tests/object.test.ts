import { describe, it, expect } from 'vitest'
import {
    checkNestedValue,
    checkObject,
    createObj,
    mapToKeys,
    mergeObject,
    selectObject,
} from '../fnObject'
const data = {
    username: 'username',
    name: 'Max',
    age: 15,
    email: 'test@test.com',
    like: {
        colors: ['red', 'blue', 'green'],
        price: 35000,
        animal: 'CAT',
        profile: {
            job: 'DEV',
            salary: 20000,
            name: {
                a: 'A',
                b: 100,
            },
        },
    },
    cars: ['TOYOTA', 'HONDA', 'SUZUKI'],
    value: new Date(),
}

describe('ADC Object', () => {
    it('checkObject Has Key expect true', () => {
        const res = checkObject(data, [
            'name',
            'like.profile.name.a',
            'cars.length',
            'like.colors[1]',
        ])
        expect(res).toBe(true)
    })
    it('checkObject Not Has Key expect false', () => {
        const res = checkObject(data, [
            'cars.length',
            'like.profile.job',
            'emailX',
        ])
        expect(res).toBe(false)
    })
    it('selectObject expect true', () => {
        const res = selectObject(data, ['email', 'name', 'like.animal'])
        expect(checkObject(res, ['email', 'name', 'like.animal'])).toBe(true)
    })
    it('selectObject expect false', () => {
        const res = selectObject(data, ['email', 'name'])
        expect(checkObject(res, ['email', 'name', 'like.animal'])).toBe(false)
    })
    it('mapToKeys expect name,color,animal,0', () => {
        const res = mapToKeys('name.color.length.animal[0]').toString()
        expect(res).toBe('name,color,animal,0')
    })
    it('mergeObject expect true', () => {
        const res = mergeObject(
            {
                name: 'Max',
                like: { color: 'red', number: 9 },
            },
            { like: { car: 'Toyota' } }
        )

        expect(checkObject(res, ['like.car', 'like.color'])).toBe(true)
        // expect(res).toBe(true)
    })
    it('createObj expect true', () => {
        const res = createObj(data, 'like.profile.name.a')!

        expect(checkObject(res, ['like.profile.name.a'])).toBe(true)
    })
    it('checkNestedValue expect true', () => {
        const res = checkNestedValue(data, {
            salary: 20000,
            animal: 'CAT',
            colors: ['red', 'blue', 'green'],
            name: {
                a: 'A',
                b: 100,
            },
        })

        expect(res).toBe(true)
    })
})
