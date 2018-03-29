interface Route {
    [url: string]: () => void
}

class Router {
    private currentUrl = ''
    private routes: Route = {}

    constructor() {
        this.init()
    }

    private init() {
        this.bindLink()
        window.addEventListener('popstate', e => {
            this.updateView(window.location.pathname)
        })
        window.addEventListener('load', e => {
            this.updateView('/')
        })
    }

    private updateView(url: string) {
        this.currentUrl = url
        if (this.routes[this.currentUrl]) {
            this.routes[this.currentUrl]()
        }
    }

    private bindLink() {
        const allLink = document.querySelectorAll('a[data-href]')
        for (let i = 0; i < allLink.length; i++) {
            const current = allLink[i]
            current.addEventListener('click', e => {
                e.preventDefault()
                const url = current.getAttribute('data-href')
                history.pushState({}, '', url)
                url && this.updateView(url)
            })
        }
    }

    route(path: string, callback: () => void) {
        this.routes[path] = callback
    }
}

const router = new Router()

router.route('/', () => {
    document.getElementById('content')!.innerHTML = 'Home'
})
router.route('/about', () => {
    document.getElementById('content')!.innerHTML = 'About'
})
router.route('/topic', () => {
    document.getElementById('content')!.innerHTML = 'Topic'
})