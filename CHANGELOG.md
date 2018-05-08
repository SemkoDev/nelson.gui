# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.3] - 2018-05-08

### Changes
- Fixes update interval and adds sync velocity stats

## [0.2.3] - 2018-04-12

### Changed
- Fixed data not loading in the first 5 seconds.

## [0.2.2] - 2018-02-04

### Changed
- Fixed api hostname and logging.

## [0.2.1] - 2018-02-04

### Changed
- Fixed api requests overflooding.

## [0.2.0] - 2018-02-04

### BREAKING CHANGE
- The url structure has changed. Please read the README!

### Added
- Support for Nelson 0.4.0
- Proxy to a Nelson server (you do not have to specify it in the URL any more)
- More information about the running IRI instance
- Stats about new/connected nodes

### Changed
- Improved README
- Hide IPs if the Nelson API is not password-protected