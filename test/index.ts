import { test } from '@substrate-system/tapzero'
import { waitFor, click } from '@substrate-system/dom'
import { wait } from './util.js'
import '../src/index.js'

const IMG_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

test('register custom element', async t => {
    document.body.innerHTML = '<light-box class="test"></light-box>'
    const el = await waitFor('light-box')
    t.ok(el, 'should find custom element')
})

test('open and close overlay', async t => {
    document.body.innerHTML = `
        <light-box class="test-gallery">
            <img src="${IMG_DATA}" alt="image one" />
            <img src="${IMG_DATA}" alt="image two" />
        </light-box>
    `

    const el = await waitFor('light-box')
    t.ok(el, 'should find light-box before interaction')
    if (!el) return

    const firstImage = el.querySelector('img')!

    t.ok(firstImage, 'should have an image to click')

    click(firstImage)
    await wait(20)

    const overlay = document.querySelector('.light-box-overlay')

    t.ok(overlay, 'should create overlay')
    t.ok(overlay?.classList.contains('is-visible'), 'should show overlay')

    const prevLabel = overlay?.querySelector(
        '[data-light-box-prev] .visually-hidden'
    )
    const nextLabel = overlay?.querySelector(
        '[data-light-box-next] .visually-hidden'
    )

    t.equal(
        prevLabel?.textContent?.trim(),
        'Previous image',
        'should include hidden label text for previous control'
    )
    t.equal(
        nextLabel?.textContent?.trim(),
        'Next image',
        'should include hidden label text for next control'
    )

    document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true
    }))

    await wait(320)

    t.ok(!overlay?.classList.contains('is-visible'),
        'should hide overlay after pressing Escape')
})

test('close overlay on backdrop click', async t => {
    document.body.innerHTML = `
        <light-box class="test-gallery">
            <img src="${IMG_DATA}" alt="image one" />
            <img src="${IMG_DATA}" alt="image two" />
        </light-box>
    `

    const el = await waitFor('light-box')
    t.ok(el, 'should find light-box before interaction')
    if (!el) return

    const firstImage = el.querySelector('img')
    t.ok(firstImage, 'should have an image to click')

    firstImage?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wait(20)

    const overlay = document.querySelector('.light-box-overlay')
    const backdrop = document.querySelector('[data-light-box-backdrop]')

    t.ok(overlay?.classList.contains('is-visible'),
        'should show overlay before backdrop click')
    t.ok(backdrop, 'should render backdrop')

    backdrop?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await wait(320)

    t.ok(!overlay?.classList.contains('is-visible'),
        'should hide overlay after backdrop click')
})

test('all done', () => {
    // @ts-expect-error tests
    window.testsFinished = true
})
