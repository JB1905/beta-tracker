# Beta Tracker

## About

Beta Tacker checks if new Apple betas are available. It will send you message when detect new release.

### Alternatives

- [official Apple Releases Newsfeed](https://developer.apple.com/news/releases/)
- [official Apple RSS](feed://developer.apple.com/news/releases/rss/releases.rss/)

## Setup

##### 1. Clone repo

```sh
git clone https://github.com/JB1905/beta-tracker.git
```

##### 2. Go to directory

```sh
cd /path/to/beta-tracker
```

##### 3. Install dependencies

```sh
yarn

# Or use npm
npm i
```

##### 4. Set environment variables

- Edit `.env.example` file
- Rename `.env.example` to `.env`

##### 5. Run

```sh
yarn start

# Or use npm
npm start
```

## Build with

- [Puppeteer](https://pptr.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Nexmo (Vonage) API](https://developer.nexmo.com/)

## License

This project is licensed under the MIT License © 2019-present Jakub Biesiada
