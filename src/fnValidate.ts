/*------------------------------Title---------------------------------*/
//   function จะ return {
//     type: 200 |  404  | 500
//     message: string
//  } เสมอ ใช้ในกรณีที่มีการตรวจสอบเข้มข้น และยังเอาไปใช้กับ dcMode()
/*-------------x----------------Title-----------------x---------------*/

import * as check from './fnCheck'
import { NestedKeys } from './type'

type TypeValidate = {
    status: 200 | 404 | 500
    message: string
}

/**
 * @category ตรวจ key ใน payload เมื่อไม่พบ โปรแกรมจะหยุดการทำงาน throw new Error
 * @param payload  Object ที่ทำการตรวจสอบ
 * @param keys Array ที่ระบุ keyที่ต้องการตรวจสอบ
 * @param msgError  คำหรือ title ที่จะแสดง msgError
 * @example
 *
 * return dcValidatePayload(payload, ['id', 'distributor.id'], 'NameTitle')
 */
export function dcValidatePayload<T extends object, K extends NestedKeys<T>>(
    payload: T,
    keys: K[] | string[],
    msgError: string = ''
): TypeValidate {
    keys = keys.map((rule) => rule.replace('.length', ''))

    if (typeof payload != 'object' || !Array.isArray(keys)) {
        return {
            status: 500,
            message: 'Error Data is Invalid!!',
        }
    }
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (check.dcCheckObject(payload, [key]) !== 1) {
            return {
                status: 404,
                message: `!!${msgError} (${key as string} is undefined)`,
            }
        }
    }

    return {
        status: 200,
        message: '',
    }
}
