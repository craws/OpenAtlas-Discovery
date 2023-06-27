## Discovery Configuration

The `discoveryConfig` file is a JSON file used to set the base options for the OpenAtlas Discovery website. It contains configuration settings that affect the behavior and appearance of the website.

### Configuration Options

The following configuration options are available in the `discoveryConfig` file:

#### `defaultLocale`

- Type: `string`
- Default value: _(none)_

The `defaultLocale` option specifies the default locale to be used on the Discovery website. This determines the language the `defaultLocale` value should be a valid language code or a combination of language and country code (e.g., "en-US" for English in the United States) and needs to be one of the available lnaguages.

#### `dateTimeFormat` (optional)

- Type: `string`
- Default value: _(none)_

The `dateTimeFormat` option allows you to specify a custom format for displaying dates and times on the Discovery website. This format should follow the syntax and placeholders defined by the formatting conventions of the chosen locale.

#### `defaultFilters` (optional)

- Type: `number[]`
- Default value: _(none)_

The `defaultFilters` option is a list of filters represented as numbers. It acts as a whitelist to allow only entities belonging to a certain type. These filters are applied in the Overview and Search sections of the website but are not applied in the detailed view. By specifying the desired filters in this list, you can control the types of entities that are displayed to users during their interactions with the website.

#### `APIbase` (optional)

- Type: `string`
- Default value: _(none)_

The `APIbase` option specifies the base URL for the Discovery website's API. If provided, it defines the root URL that will be used for making API requests. This allows you to customize the API endpoint according to your specific needs. If not provided, the default API URL defined by the website will be used.

#### `imageDomains` (optional)

- Type: `string[]`
- Default value: _(none)_

The `imageDomains` option is a list of allowed image domains. It specifies the domains from which images can be optimized via nuxt-img on the Discovery website.

### Usage

Here's an example of how the `discoveryConfig` file can be used:

```json
{
  "defaultLocale": "en",
  "dateTimeFormat": "yyyy-MM-dd HH:mm:ss",
"defaultFilters": [1, 2, 3],
"APIbase": "https://demo-dev.openatlas.eu",
"imageDomains": ["openatlas.eu"]

}
```

In the above example, the `defaultLocale` is set to "en", indicating that English language should be used. The `dateTimeFormat` is specified as "yyyy-MM-dd HH:mm:ss", which represents the desired format for displaying dates and times, in this case: **2022-07-15 21:30:45**. Additionally, the `defaultFilters` array includes the numbers 1, 2, and 3, allowing only entities of those types to be displayed in the Overview and Search sections.

Please note that the `dateTimeFormat` and `defaultFilters` options are optional, and their omission will result in the default behavior defined by the website.
