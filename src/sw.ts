import { dcItemIsDuplicate } from 'adc-directive'
const items = [
    {
        id: 1,
        name: 'Max',
    },
    {
        id: 2,
        name: 'Jam',
    },
    {
        id: 3,
        name: 'Bar',
    },
]

const isCheck = dcItemIsDuplicate(items, (v) => v.name)

console.log('isCheck :>> ', isCheck)

console.log('xxxxx :>> ')
