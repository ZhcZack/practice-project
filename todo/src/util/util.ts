export const get = (sel: string) => document.querySelector(sel) as HTMLElement
export const getAll = (sel: string) => document.querySelectorAll(sel) as NodeListOf<HTMLElement>
export const log = console.log.bind(console)