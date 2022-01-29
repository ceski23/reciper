<p align="center">
  <img src="https://github.com/ceski23/reciper/blob/master/public/logo192.png" />
</p>

# Reciper
Reciper is a web application designed to store recipes from multiple cooking sites in one place.

## Features
- Parsing and displaying recipes from **multiple sites** in standarized format
- Saving favourite recipes
- **Fuzzy search** based on recipe's name and tags
- Works **offline**
- Backup/restore recipes from cloud
- **Light** and **dark** mode
- Saving shopping lists to supported to-do apps
- Servings calculator
- Ingredients **units converter**

## Installation
1. Clone the repository
```
git clone git@github.com:ceski23/reciper.git
```
2. Inside project's directory install dependencies
```
npm install
```
3. Create `.env` file in project's root directory with following content:
```bash
REACT_APP_CORS_PROXY='URL_TO_CORS_PROXY'
REACT_APP_GOOGLE_CLIENT_ID='GOOGLE_API_CLIENT_ID'
```

## Usage
Run the development server.
```
npm run dev
```

Build application for use in production.
```
npm run build
```

Start server with production build
```
npm run start
```

## Supported sites
- [AniaStarmach.pl](https://aniastarmach.pl/)
- [Beszamel](https://beszamel.se.pl/)
- [Kwestia Smaku](https://www.kwestiasmaku.com/)

## Supported account providers
- Google

## Screenshots

<img width="300" src="https://github.com/ceski23/reciper/blob/master/public/screenshots/1.jpg" />
<img width="300" src="https://github.com/ceski23/reciper/blob/master/public/screenshots/2.jpg" />
<img width="300" src="https://github.com/ceski23/reciper/blob/master/public/screenshots/3.jpg" />
<img width="300" src="https://github.com/ceski23/reciper/blob/master/public/screenshots/4.jpg" />
<img width="300" src="https://github.com/ceski23/reciper/blob/master/public/screenshots/5.jpg" />