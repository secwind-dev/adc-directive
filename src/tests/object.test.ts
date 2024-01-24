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

describe('ADC Array', () => {
    it('checkObject Has Key expect 1', () => {
        const res = checkObject(data, [
            'name',
            'like.profile.name.a',
            'cars.length',
            'like.colors[1]',
        ])
        expect(res).toBe(1)
    })
    it('checkObject Not Has Key expect 0', () => {
        const res = checkObject(data, [
            'cars.length',
            'like.profile.job',
            'emailX',
        ])
        expect(res).toBe(0)
    })
    it('selectObject expect 1', () => {
        const res = selectObject(data, ['email', 'name', 'like.animal'])
        expect(checkObject(res, ['email', 'name', 'like.animal'])).toBe(1)
    })
    it('selectObject expect 0', () => {
        const res = selectObject(data, ['email', 'name'])
        expect(checkObject(res, ['email', 'name', 'like.animal'])).toBe(0)
    })
    it('mapToKeys expect name,color,animal,0', () => {
        const res = mapToKeys('name.color.length.animal[0]').toString()
        expect(res).toBe('name,color,animal,0')
    })
    it('mergeObject expect 1', () => {
        const res = mergeObject(
            {
                name: 'Max',
                like: { color: 'red', number: 9 },
            },
            { like: { car: 'Toyota' } }
        )

        expect(checkObject(res, ['like.car', 'like.color'])).toBe(1)
    })
    it('createObj expect 1', () => {
        const res = createObj(data, 'like.profile.name.a')!

        expect(checkObject(res, ['like.profile.name.a'])).toBe(1)
    })
    it('checkNestedValue expect 1', () => {
        const res = checkNestedValue(data, {
            salary: 20000,
            animal: 'CAT',
            name: 'Max',
            colors: ['red', 'blue', 'green'],
        })

        expect(res).toBe(1)
    })
})
