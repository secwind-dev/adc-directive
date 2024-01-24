export function dcDelay(next: () => void, millisecond: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(next())
        }, millisecond)
    })
}

/*------------------------------Modal & Element---------------------------------*/
/**
 * @category เป็นการ trigger body ให้เกิด overflow hidden
 * @example
 *
 * dcModal(true)
 */
export function dcModal(is_active: boolean = false): void {
    if (typeof window !== 'undefined') {
        const body: HTMLElement = document.body
        if (is_active) {
            body.style.overflow = 'hidden'
            // body?.classList.add('open-modal')
        } else {
            body.style.overflow = 'auto'
            // body?.classList.remove('open-modal')
        }
    }
}

// export function dcLoader(
//     is_active: boolean,
//     title: string = 'รอสักครู่...'
// ): void {
//     const loader = new swLoader(title)
//     if (is_active) {
//         loader.render()
//     } else {
//         loader.stop()
//     }
// }

// export function dcOverlay(_text?: string, _time?: number): void {
//     const text = _text || 'บันทึกสำเร็จ'
//     const time = _time || 1
//     const start = () => {
//         if (typeof window !== 'undefined') {
//             const elRoot: Element | null = document.querySelector(
//                 '#use_overlay_by_secwind'
//             )

//             elRoot?.classList.add('active')
//             let title = elRoot?.querySelector('.overlay-text') as
//                 | HTMLSpanElement
//                 | undefined
//             if (title) {
//                 title.innerHTML = text
//             }
//             setTimeout(() => {
//                 stop()
//             }, time * 1000)
//         }
//     }
//     const stop = () => {
//         if (typeof window !== 'undefined') {
//             const elRoot: Element | null = document.querySelector(
//                 '#use_overlay_by_secwind'
//             )
//             elRoot?.classList.remove('active')
//         }
//     }
//     start()
// }
/*-------------x----------------Modal & Element-----------------x---------------*/
