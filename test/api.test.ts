import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest"
import { Api } from "../composables/api";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { setup, fetch, createTestContext } from '@nuxt/test-utils-edge'
describe('Test if Api is available', async () => {
    await setup({});
    const result = {
        "results": [
            {
                "@context": "https://raw.githubusercontent.com/LinkedPasts/linked-places/master/linkedplaces-context-v1.1.jsonld",
                "type": "FeatureCollection",
                "features": [
                    {
                        "@id": "https://demo-dev.openatlas.eu/entity/20701",
                        "type": "Feature",
                        "crmClass": "crm:E21 Person",
                        "systemClass": "person",
                        "properties": {
                            "title": "(?) Ragato"
                        },
                        "descriptions": [
                            {
                                "value": "Villager from Mahalle (unreadable) in the village Gramos, mentioned in the register for nahie Chroupichta of 1568/69.\r\n"
                            }
                        ],
                        "when": {
                            "timespans": [
                                {
                                    "start": {
                                        "earliest": null,
                                        "latest": null,
                                        "comment": null
                                    },
                                    "end": {
                                        "earliest": null,
                                        "latest": null,
                                        "comment": null
                                    }
                                }
                            ]
                        },
                        "types": [
                            {
                                "identifier": "https://demo-dev.openatlas.eu/api/0.3/entity/25",
                                "label": "Male",
                                "descriptions": null,
                                "hierarchy": "Sex",
                                "value": null,
                                "unit": null
                            },
                            {
                                "identifier": "https://demo-dev.openatlas.eu/api/0.3/entity/8247",
                                "label": "Ethnonym of the Vlachs",
                                "descriptions": null,
                                "hierarchy": "Case Study",
                                "value": null,
                                "unit": null
                            }
                        ],
                        "relations": [
                            {
                                "label": "Ethnonym of the Vlachs",
                                "relationTo": "https://demo-dev.openatlas.eu/api/0.3/entity/8247",
                                "relationType": "crm:P2 has type",
                                "relationSystemClass": "type",
                                "relationDescription": null,
                                "type": null,
                                "when": {
                                    "timespans": [
                                        {
                                            "start": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            },
                                            "end": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "label": "Male",
                                "relationTo": "https://demo-dev.openatlas.eu/api/0.3/entity/25",
                                "relationType": "crm:P2 has type",
                                "relationSystemClass": "type",
                                "relationDescription": null,
                                "type": null,
                                "when": {
                                    "timespans": [
                                        {
                                            "start": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            },
                                            "end": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "label": "Register of nahie Chroupichta 1568/69 I.",
                                "relationTo": "https://demo-dev.openatlas.eu/api/0.3/entity/20026",
                                "relationType": "crm:P67i is referred to by",
                                "relationSystemClass": "source",
                                "relationDescription": null,
                                "type": null,
                                "when": {
                                    "timespans": [
                                        {
                                            "start": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            },
                                            "end": {
                                                "earliest": null,
                                                "latest": null,
                                                "comment": null
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        "names": null,
                        "links": null,
                        "depictions": null,
                        "geometry": {
                            "type": "GeometryCollection",
                            "geometries": []
                        }
                    }
                ]
            }
        ],
        "pagination": {
            "entities": 698,
            "entitiesPerPage": 1,
            "index": [
                {
                    "page": 1,
                    "startId": 20701
                },
            ],
            "totalPages": 698
        }
    }
    const api = new Api();
    const restHandlers = [
        rest.get('https://demo-dev.openatlas.eu/api/0.3/cidoc_class/E21', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(result))
        }),
    ]
    const server = setupServer(...restHandlers)
    // Start server before all tests
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

    //  Close server after all tests
    afterAll(() => server.close())

    // Reset handlers after each test `important for test isolation`
    afterEach(() => server.resetHandlers())

    test('test cidoc class', async () => {
        expect(api.cidocClass.cidocClassDetail("E21")).toBeTruthy
    })

})
