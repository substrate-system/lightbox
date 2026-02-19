import { test } from '@substrate-system/tapzero'
import { waitFor } from '@substrate-system/dom'
import '../src/index.js'

test('example test', async t => {
    document.body.innerHTML += `
        <light-box class="test">
        </light-box>
    `

    const el = await waitFor('light-box')

    t.ok(el, 'should find an element')
})
