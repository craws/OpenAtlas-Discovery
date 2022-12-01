import { describe, expect, test } from "vitest"
import {useSafeRead, useFormatDateTime} from "../composables/utils"
describe('useSafeReadTest', async () => {
    const object = {
        name: 'Andreas',
        '@id': 1,
        properties:{
            alias: 'Andi',
            'some_property': 'something' 
        }
    }
    
    test("should return correct values", () => {
        expect(useSafeRead(object,'name')).toBe('Andreas');
        expect(useSafeRead(object,'@id')).toBe(1);
        expect(useSafeRead(object,'properties["some_property"]')).toBe('something');
        expect(useSafeRead(object,"properties['some_property']")).toBe('something');
        expect(useSafeRead(object,'properties.alias')).toBe('Andi');
    });

    test("should return undefined on invalid key", () => {
        expect(useSafeRead(object,'invalidKey')).toBeUndefined()
        expect(useSafeRead(object,'invalidKey.alias')).toBeUndefined()
        expect(useSafeRead(object,'properties.invalidKey')).toBeUndefined()
    });

})

describe('useFormatDateTime test', async () => {

    
    test("should return correct values", () => {
        expect(useFormatDateTime('1900-03-01T00:00:00')).toBe('1900-03-01');
        expect(useFormatDateTime('1900-03-01')).toBe('1900-03-01');

    });



})