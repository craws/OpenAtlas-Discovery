import { Api } from "@/composables/api";

const baseUrl = process.env.NUXT_PUBLIC_API_BASE_URL;
console.log({ baseUrl });

export const client = new Api({ baseUrl });
