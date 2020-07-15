<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).


# Rich Text

The Rich Text is a block that brings texts to your store and everything else that Markdown language is able to. It converts texts written in Markdown language and displays its content as HTML elements.

![image](https://user-images.githubusercontent.com/12139385/70084949-119b1f80-15ee-11ea-91dd-1277427c8aee.png)


For example, the text:
`[Help](https://help.vtex.com/en/faq/what-is-vtex-io).\n**Be Bold!**\n*This is italic*`

Is converted to:
```
<div>
      <p>
        <a href="https://help.vtex.com/en/faq/what-is-vtex-io">
         Help
        </a>
        <br />
        <span class="b">Be Bold!</span>
        <br />
        <span class="i">This is italic</span>
      </p>
      

    </div>
  </div>
```

Check the [documentation of Markdown Language](https://www.markdownguide.org/cheat-sheet/) to understand how to use it.

## Configuration


1. Import the rich text's app to your theme's dependencies in the `manifest.json`, for example:

```json
  "dependencies": {
    "vtex.rich-text": "0.x"
  }
```

2. Add `rich-text` block to your blocks files, in the place you want it to show up. For example:

```json
"rich-text": {
  "props": {
    "textAlignment": "CENTER",
    "textPosition": "CENTER",
    "text": "Visit our [help](https://help.vtex.com/en/faq/what-is-vtex-io) section.\n*Be Bold!*\n**This is italic**",
    "textColor": "c-on-emphasis",
    "font": "t-heading-5",
    "blockClass": "help-message"
  }
}
```

%PROPS=MemoizedRichText%

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization). 


| CSS Handle |
| --- |
| `container` |
| `heading` |
| `headingLevel1` |
| `headingLevel2` |
| `headingLevel3` |
| `headingLevel4` |
| `headingLevel5` |
| `headingLevel6` |
| `image` |
| `italic` |
| `link` |
| `list` |
| `listItem` |
| `listOrdered` |
| `paragraph` |
| `strong` |
| `table` |
| `tableBody` |
| `tableHead` |
| `tableTd` |
| `tableTh` |
| `tableTr` |
| `wrapper` |

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
