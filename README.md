# IMDB Movie Scraper

IMDB doesn't provide a public API. This project offers a solution by scraping selected IMDB pages and storing the movie names and ratings in a MySQL database. It then serves the database through a single REST API endpoint, and provides a simple web client that allows users to view and filter movies by name substring.

## Table of Contents

- [Introduction](#introduction)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

This project contains three subfolders:

- `client`: contains an HTML page for viewing data in the SQL database via the server
- `server`: serves the `getAll` function over HTTP
- `scraper`: scrapes IMDB pages and puts the data into the server

## Screenshots

![Showing UI](/resources/screenshots/client_using_api.gif)

## Installation

Before you can use this project, you'll need to install Docker on your machine. Once you've done that, follow these steps:

1. Clone this repository
2. Navigate to the root directory
3. Run `docker-compose up`

## Usage

After installing the project, you can view the client by navigating to `http://localhost:3000` in your web browser. From there, you can search for movie ratings that are now stored in your database!  You can scrape additional parts of IMDB by adding additional scraping functions to the scraper.

## Dependencies

This project depends on the following software:

- Docker

## License

This project is licensed under the MIT License.
