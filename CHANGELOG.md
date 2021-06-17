# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.14.1] - 2021-06-17

### Fixed
- Crowdin configuration file.

## [0.14.0] - 2021-05-05

### Added

- I18n It, Fr, Nl and Ko.

### Changed

- Changelog.
- Crowdin file.

## [0.13.0] - 2021-03-08

### Added

- I18n Ro and Jp.

### Fixed

- Crowdin configuration file.

## [0.12.0] - 2020-12-15
### Added
- Add support for custom classes override.

### Fixed
- Make optional props with default values.

## [0.11.2] - 2020-10-07
### Removed
- Remove description of `rich-text` schema to make it not available in the new CMS.

## [0.11.1] - 2020-09-29
### Changed
- Update tooling dependencies and format project.

## [0.11.0] - 2020-09-16
### Added
- Allow tag `sup`.

## [0.10.2] - 2020-08-20
### Changed
- Replace `insane` with `@vtex/insane`.
- Remove `ramda` calls.

## [0.10.1] - 2020-07-09
### Added
- `title` and `description` to `content` of the `rich-text` interface to make it show in the new CMS.

### Removed
- Unnecessary schema definition in `RichText`.

## [0.10.0] - 2020-05-19
### Added
- New CSS Handle `wrapper`.

## [0.9.1] - 2020-04-24

### Added
- Responsive value for `font` prop 

## [0.9.0] - 2020-04-02
### Added
- New CSS Handles `tableTr`, `tableTh`, and `tableTd`.

## [0.8.2] - 2019-12-03
## Changed
- Documentation structure and deleted main read me

## [0.8.1] - 2019-11-18
### Changed
- From `list--ordered` to `listOrdered` CSS Handle.

## [0.8.0] - 2019-11-18
### Added
- Support for ordered list.

## [0.7.9] - 2019-11-14
### Fixed
- Issue with wrong blockClass being applied.

## [0.7.8] - 2019-10-25
### Chore
- New release to trigger a rebuild enabling lazy evaluation of rich-text entrypoints

## [0.7.7] - 2019-10-08
### Changed
- Start using `vtex.css-handles`.

## [0.7.6] - 2019-10-04
### Fixed
- Fixed small typo in `messages/pt.json

## [0.7.5] - 2019-09-26
### Fixed
- Allow `tel` scheme when sanitizing HTML.

## [0.7.4] - 2019-08-29

## [0.7.3] - 2019-08-15
### Fixed
- Name of the typography token.

## [0.7.2] - 2019-06-27

### Fixed

- Avoid passing classes that are not typography tokens to the `font` prop.
- Avoid passing classes that are not color tokens to the `textColor` prop.

## [0.7.1] - 2019-06-07
### Changed
- Make headers convert to html `<hx>` classes and not span.
- Make list and items convert to ul and li.

## [0.7.0] - 2019-06-06

### Changed

- Main interface's native type from `text` to `richText`.

## [0.6.1] - 2019-06-06
### Fixed
- Fixed issue that causes syntax error on IE11, due to the use of ES6 features.

## [0.6.0] - 2019-06-06
### Added
- Support for lists.
- Support heading levels in css.

## [0.5.0] - 2019-06-03

### Added

- Support for table.
- Support for `target` attribute in `<a>` tags.

## [0.4.0] - 2019-05-27
### Added
- i18n content edition support through CMS.

## [0.3.0] - 2019-05-21
### Added
- Allow `iframe` HTML tag.

## [0.2.0] - 2019-04-30
### Added
- Added `htmlId` prop.

## [0.1.5] - 2019-04-25
### Changed
- Add scope to messages and add `isLayout` on appropriate schema props.

## [0.1.4] - 2019-04-22
### Added
- `blockClass` prop.

## [0.1.3] - 2019-04-11
### Fixed
- Fix properties strings in Storefront.

## [0.1.2] - 2019-04-11
### Fixed
- Display images properly, add paragraph class, add lh-copy class to texts.

## [0.1.1] - 2019-04-11
### Changed
- Use `insane` lib to sanitize HTML.

## [0.1.0] - 2019-04-04
### Added

- **Component** Create the VTEX Store Component _Rich Text_
