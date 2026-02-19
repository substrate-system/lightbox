import { LightBox } from '../src/index.js'
import '../src/index.css'
import './index.css'

if (import.meta.env.DEV) {
    localStorage.setItem('DEBUG', 'lightbox,lightbox:*')
} else {
    localStorage.removeItem('DEBUG')
}

/**
 * FOUCE
 */
(async () => {
    await Promise.race([
        customElements.whenDefined(LightBox.TAG),
        new Promise<void>(resolve => {
            setTimeout(resolve, 2000)
        })
    ])

    document.documentElement.classList.remove('reduce-fouce')
})()
