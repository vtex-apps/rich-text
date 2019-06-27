# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
