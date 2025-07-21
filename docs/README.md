<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
> 📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Rich Text

The Rich Text block converts texts written in Markdown to HTML and displays them in your storefront.

![image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-rich-text-0.png)

For example, the text

```txt
[Help](https://developers.vtex.com/vtex-developer-docs/docs/welcome).\n**Be Bold!**\n*This is italic*
```

would be rendered as

```html
<div>
     <p>
        <a href="https://developers.vtex.com/">Help</a><br />
        <span class="b">Be Bold!</span><br />
        <span class="i">This is italic</span>
     </p>
</div>
```

Learn more in [Markdown documentation](https://www.markdownguide.org/cheat-sheet/).

## Configuration

1. Add the `rich-text` app to your theme’s dependencies in the `manifest.json` file:

```json
  "dependencies": {
    "vtex.rich-text": "0.x"
  }
```

2. Add the `rich-text` block to your block files in the desired template position. For example:

```json
"rich-text": {
  "props": {
    "textAlignment": "CENTER",
    "textPosition": "CENTER",
    "text": "Visit our [help](https://developers.vtex.com/) section.\n**Be Bold!**\n*This is italic*",
    "textColor": "c-on-emphasis",
    "font": "t-heading-5",
    "blockClass": "help-message"
  }
}
```
## Props

| Prop name       | Type                | Description                                                                                                  |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `blockClass`    | `string`            | Unique class name appended to block classes. Default: ''                                               |
| `font`          | `string`            | Tachyon token used as a font. Default: `t-body`. |
| `htmlId`     | `String` | HTML ID of the element.                                          |
| `textColor`     | `string`            | Tachyon token used as text color. Default: `c-on-base`.                                                |
| `text`          | `string`            | Text written in Markdown language to display.                                                           |
| `textAlignment` | `TextAlignmentEnum` | Text alignment inside the component. Default: `"LEFT"`.                                                      |
| `textPosition`  | `TextPostionEnum`   | Text position in relation to the component. Default: `"LEFT"`.                                               |

* **`TextAlignmentEnum` possible values**

| Enum name | Enum value | Description                           |
| --------- | ---------- | ------------------------------------- |
| Left      | 'LEFT'     | Aligns text to the left.   |
| Center    | 'CENTER'   | Aligns text to the center. |
| Right     | 'RIGHT'    | Aligns text to the right.  |

* **`TextPostionEnum` possible values**

| Enum name | Enum value | Description                           |
| --------- | ---------- | ------------------------------------- |
| Left      | 'LEFT'     | Positions the content at the left of the component.   |
| Center    | 'CENTER'   | Positions the content at the horizontal center of the component. |
| Right     | 'RIGHT'    | Positions the content at the right of the component. |


## Customization

To apply CSS customizations to this and other blocks, please follow the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handle      |
| --------------- |
| `container`     |
| `heading`       |
| `headingLevel1` |
| `headingLevel2` |
| `headingLevel3` |
| `headingLevel4` |
| `headingLevel5` |
| `headingLevel6` |
| `image`         |
| `italic`        |
| `link`          |
| `list`          |
| `listItem`      |
| `listOrdered`   |
| `paragraph`     |
| `strong`        |
| `table`         |
| `tableBody`     |
| `tableHead`     |
| `tableTd`       |
| `tableTh`       |
| `tableTr`       |
| `wrapper`       |

<!-- DOCS-IGNORE:start -->
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
<!-- DOCS-IGNORE:end -->
