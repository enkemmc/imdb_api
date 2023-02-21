## Table of Contents

- [Introduction](#introduction)
- [Screenshots](#screenshots)
- [Install](#install)

## Introduction
IMDB doesnt provide a public api.  This project scrapes some imdb pages and stores the movie names and ratings in a database.  It then serves the database through one endpoint via a rest api.  It also has a very simple webclient that displays whats in the database and a simple filter of the movie names by substring.


**What are these subfolders?**

**client** - html page for viewing data in the sql db via the server

**server** - serves getAll function over http

**scraper** - scrapes imdb pages and puts the data into the server


the server and scraper depend on a mysql database being available on a docker network named imdb-scrape

## Screenshots

<p align="center">
  <img width="410"
       alt="Showing UI"
       src="/resources/screenshots/client_using_api.gif">
</p>

## Install

1. Install MySQL
2. Install Docker
3. Clone this repository
4. Run the .sh script in the /server and /client folders
5. Run the .sh script in the /scraper folder.  You can schedule this to run at an interval using a program like crontab.
6. View the client at http://localhost:3000 to search for movie ratings that are now stored in your database!  


