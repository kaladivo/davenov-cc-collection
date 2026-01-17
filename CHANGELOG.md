# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Clarified `/davenov:cc:update` description to explicitly state it updates the davenov-cc package
- Moved update command to dedicated "Updating" section in README (separate from regular commands)

## [1.0.7] - 2026-01-17

### Changed

- Revamped installer output with friendlier, more casual messaging ("Davenov CC Collection")
- Smart overwrite detection: only prompts for confirmation when files would actually be overwritten
- Fresh installs now skip confirmation prompt entirely
- Unified code by reusing `getItemsToOverwrite()` for both install and uninstall

## [1.0.6] - 2026-01-17

### Added

- CHANGELOG.md following Keep a Changelog format
- Changelog management instructions in CLAUDE.md

## [1.0.5] - 2026-01-17

### Changed

- Consolidated `install.js` into `bin/cli.js` for simpler package structure

### Removed

- Removed redundant `install.js` file

## [1.0.4] - 2026-01-17

### Added

- `--uninstall` flag to remove davenov-cc customizations via `npx davenov-cc --uninstall`
- Uninstall only removes files from this package, preserving other customizations

## [1.0.3] - 2026-01-17

### Fixed

- Fixed npm trusted publishing by using Node.js 24 (npm v11.5.1+ required for OIDC)

## [1.0.2] - 2026-01-17

### Added

- GitHub Actions workflow for automated npm publishing via OIDC trusted publishing
- Automatic provenance generation for published packages

## [1.0.1] - 2026-01-17

### Added

- NPM publishing step to post-change workflow in CLAUDE.md

### Changed

- Simplified README to focus on end users

## [1.0.0] - 2026-01-17

### Added

- Initial npm package support via `npx davenov-cc`
- Update command (`/davenov:cc:update`) for easy self-updating
- `--auto-override` flag for non-interactive installation
- Commands: `davenov:cc:interview`, `davenov:cc:rule`, `davenov:cc:update`
- Skills: `davenov:cc:expert-convex-nextjs`, `davenov:cc:expert-evolu-nextjs`, `davenov:cc:expert-nextjs-16`, `davenov:cc:expert-build-nostr`

[Unreleased]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.7...HEAD
[1.0.7]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/kaladivo/davenov-cc-collection/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kaladivo/davenov-cc-collection/releases/tag/v1.0.0
