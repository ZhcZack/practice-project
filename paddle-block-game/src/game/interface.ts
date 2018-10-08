interface GameImages {
    [index: string]: HTMLImageElement
}

interface LoadImages {
    [index: string]: string
}

interface GameKeydowns {
    [index: string]: boolean
}

interface GameActions {
    [index: string]: () => void
}

interface ImageElement {
    x: number
    y: number
    image: HTMLImageElement
    width: number
    height: number
    editMode?: boolean
}

// event listener
interface GameEvent {
    [index: string]: {
        [index: string]: boolean
    }
}

interface GameListener {
    [index: string]: {
        [index: string]: () => void
    }
}

// scene
interface SceneEventMap {
    [index: string]: {
        [index: string]: () => void
    }
}

// level
type Level = Blocks[]
type Blocks = BlockPosition[]
type BlockPosition = number[]
