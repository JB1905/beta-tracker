# Beta Tracker

## About

Beta Tacker checks if new Apple betas are available. When it detects a new version, it will send you a message (SMS).

### Alternatives

- [official Apple Releases news feed](https://developer.apple.com/news/releases/)
- [official Apple RSS](feed://developer.apple.com/news/releases/rss/releases.rss/)

## Prerequisites

- Node.js
- npm/Yarn
- Nexmo (Vonage) account with API keys

## Setup

##### 1. Clone repo

```sh
$ git clone https://github.com/JB1905/beta-tracker.git
```

##### 2. Go to directory

```sh
$ cd /path/to/beta-tracker
```

##### 3. Set environment variables

- Copy `.env.example` file to `.env`
- Set environment variables in `.env`

##### 4. Install dependencies

```sh
$ yarn

# Or use npm
$ npm i
```

##### 5. Run

```sh
$ yarn start

# Or use npm
$ npm start
```

## Build with

- [Puppeteer](https://pptr.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nexmo (Vonage) API](https://developer.nexmo.com/)

## License

This project is licensed under the MIT License © 2019-present Jakub Biesiada
