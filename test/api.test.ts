import { setup } from "@nuxt/test-utils-edge";
import { describe, expect, test } from "vitest"
import { Api } from "../composables/api";

describe('Test if Api is available', async () => {
    const api = new Api();
    await setup({    // test context options
    })
    test('test cidoc class', async () => {
        expect(api.cidocClass.cidocClassDetail("E21")).toBeTruthy
    })
    test('test entity', async () => {
        expect(api.entity.entityDetail(10700)).toBeTruthy();
    })
})
