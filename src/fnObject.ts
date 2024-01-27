import { NestedKeys } from './type'
import { mapArray } from './fnArray'
import { isObject } from './service'
import { toConvertData } from './fnTo'

/**
 * @category แปลง profile.name.colors[2].length เป็น array
 * @return ['profile','name','colors','2']
 * @example
 * mapToKeys("profile.name.colors[2].length")
 */
export function mapToKeys(key: string) {
    return key
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t)
        .filter((t) => t !== 'length')
}

/**
 * @category ตรวจ key[] ใน object
 * @return 1 | 0 | -1
 * @example
 * checkObject(payload, ['saleOrderItems[0]','profile.name',])
 */
export function checkObject<T extends object, K extends NestedKeys<T>>(
    payload: T,
    keyNames: K[] | string[]
): 1 | 0 | -1 {
    if (typeof payload != 'object' || payload == null) return -1
    const keys = keyNames.map((key) => mapToKeys(key))
    let value: 1 | 0 | -1 = 0
    for (let k = 0; k < keys.length; k++) {
        let items = keys[k]
        let data: any = payload
        for (let i = 0; i < items.length; i++) {
            const newData = data[items[i]]
            value = newData ? 1 : 0
            data = newData
            if (value === 0) {
                break
            }
        }
        if (value === 0) {
            break
        }
    }
    return value
}

/**
 * @category รวม object ระดับ nested ให้เข้ากันในทุกระดับ
 * return
 * {name:'a',profile:{color:'red',email:'email'}}
 * @example
 * mergeObject({name:'a',profile:{color:'red'}},{profile:{email:'email'}})
 */
export function mergeObject(...objects: object[]): Record<string, any> {
    return mapArray(objects).reduce((prev, obj) => {
        if (isObject(obj)) {
            Object.keys(obj).forEach((key) => {
                const preValue = obj[key]
                const value = prev[key]

                if (Array.isArray(value) && Array.isArray(preValue)) {
                    prev[key] = value.concat(...preValue)
                } else if (isObject(value) && isObject(preValue)) {
                    prev[key] = mergeObject(value, preValue)
                } else {
                    prev[key] = preValue
                }
            })
        }

        return prev
    }, {})
}

export function createObj<T extends object, K extends NestedKeys<T>>(
    payload: T,
    key: K | string
): Record<string, any> | undefined {
    if (checkObject(payload, [key])) {
        let keys = mapToKeys(key)
        let length = keys.length
        let data: Record<string, any> = payload
        keys.forEach((_key, index) => {
            const dataValue = data[_key]
            if (dataValue) {
                if (Array.isArray(dataValue))
                    data = data = { [`${_key}`]: data[_key] }
                else if (typeof dataValue == 'object') data = dataValue
                else data = { [`${_key}`]: data[_key] }
            }

            if (index === length - 1) {
                keys.reverse().forEach((k, indexKey) => {
                    if (indexKey != 0) {
                        data = { [`${k}`]: { ...data } }
                    }
                })
                payload = Object.assign(data)
            }
        })

        return payload
    }
    return undefined
}

/**
 * @category Find object แล้วสร้างเป็น object ใหม่จาก keys
 * @Return {color:red,profile:{name:Max}}
 * @example
 * checkNestedValue(data,['color',profile.name])
 */
export function selectObject<T extends object, K extends NestedKeys<T>>(
    payload: T,
    items: K[] | string[]
): Record<string, any> {
    if (typeof payload != 'object' || payload == null) return {}
    const objArray: object[] = []
    items.forEach((keys) => {
        if (checkObject(payload, [keys]) === 1) {
            objArray.push(createObj(payload, keys)!)
        }
    })

    return mergeObject(objArray)
}

/**
 * @category Find object จากส่วนไหนของก็ได้ NestedData
 * @Return 1 | 0 | -1
 * @example
 * checkNestedValue(data,{
 *  colors: ['red', 'blue', 'green'],
 *  name:'Max'
 *  price:3500
 * })
 */
export function checkNestedValue<T>(
    content: T | T[],
    rules: Record<string, any>
): 1 | 0 | -1 {
    let conditions: boolean[] = []
    const keys = Object.keys(rules)
    JSON.stringify(content, (_, nestedValue) => {
        keys.forEach((key) => {
            if (
                (Array.isArray(rules[key]) &&
                    Array.isArray(nestedValue[key])) ||
                (rules[key] &&
                    typeof rules[key] == 'object' &&
                    nestedValue[key] &&
                    typeof nestedValue[key] == 'object')
            ) {
                const check =
                    toConvertData(nestedValue[key]) == toConvertData(rules[key])
                conditions.push(check)
            } else {
                conditions.push(nestedValue[key] == rules[key])
            }
        })
        return nestedValue
    })

    return conditions.filter((v) => v).length == keys.length ? 1 : 0
}
