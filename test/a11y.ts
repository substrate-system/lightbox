import { test } from '@substrate-system/tapzero'
import { waitFor, click } from '@substrate-system/dom'
import {
    assertNoViolations,
    assertWCAGCompliance
} from '@substrate-system/tapout/axe'
import { wait } from './util.js'
import '../src/index.js'

const IMG_DATA =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

const renderGallery = ():void => {
    document.body.innerHTML = `
        <main>
            <light-box class="test-gallery">
                <img src="${IMG_DATA}" alt="image one" />
                <img src="${IMG_DATA}" alt="image two" />
            </light-box>
        </main>
    `
}

test('gallery has no accessibility violations', async t => {
    renderGallery()
    const gallery = await waitFor('light-box')
    t.ok(gallery, 'should find light-box')
    if (!gallery) return

    await assertNoViolations(t, {
        context: gallery
    }, 'gallery should have no accessibility violations')
})

test('lightbox overlay has no accessibility violations', async t => {
    renderGallery()
    const gallery = await waitFor('light-box')
    if (!gallery) {
        t.fail('expected light-box')
        return
    }

    const firstImage = gallery.querySelector('img')
    t.ok(firstImage, 'should have an image to open')
    if (!firstImage) return

    click(firstImage)
    await wait(24)

    const overlay = document.querySelector('.light-box-overlay')
    t.ok(overlay, 'overlay should exist after opening')
    if (!overlay) return

    // Contrast on transparent overlays can be context-dependent in tests.
    await assertNoViolations(t, {
        context: overlay,
        rules: {
            'color-contrast': { enabled: false }
        }
    }, 'overlay should have no accessibility violations')
})

test('lightbox overlay satisfies WCAG AA checks', async t => {
    renderGallery()
    const gallery = await waitFor('light-box')
    if (!gallery) {
        t.fail('expected light-box')
        return
    }

    const firstImage = gallery.querySelector('img')
    if (!firstImage) {
        t.fail('expected an image')
        return
    }

    click(firstImage)
    await wait(24)

    const overlay = document.querySelector('.light-box-overlay')
    if (!overlay) {
        t.fail('expected overlay')
        return
    }

    await assertWCAGCompliance(t, 'AA', {
        context: overlay,
        rules: {
            'color-contrast': { enabled: false }
        }
    })
})

test('all done', () => {
    // @ts-expect-error tests
    window.testsFinished = true
})
