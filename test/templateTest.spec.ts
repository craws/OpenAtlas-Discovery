import { describe, test } from 'vitest'
import { setup } from '@nuxt/test-utils-edge'
import { increment } from '../composables/counter'
import { expect } from 'vitest'

describe('My test', async () => {
    await setup({    // test context options
    })
    test('my test', () => {    // ...
        expect(increment(1)).toBe(2)
    })
})
