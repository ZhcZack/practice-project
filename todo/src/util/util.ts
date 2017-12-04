const get = (sel: string) => document.querySelector(sel) as HTMLElement
const getAll = (sel: string) => document.querySelectorAll(sel) as NodeListOf<HTMLElement>
const log = console.log.bind(console)