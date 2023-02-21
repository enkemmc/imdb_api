**Why does this exist?**

IMDB doesnt provide a public api.  This project scrapes some imdb pages and stores the movie names and ratings in a database.  It then serves the database through one endpoint via a rest api.  It also has a very simple webclient that displays whats in the database and a simple filter of the movie names by substring.


**What are these subfolders?**

**client** - html page for viewing data in the sql db via the server

**server** - serves getAll function over http

**scraper** - scrapes imdb pages and puts the data into the server




the server and scraper depend on a mysql database being available on a docker network named imdb-scrape

Example
![alt text](/resources/screenshots/client_using_api.gif)



<!-- markdownlint-disable MD004 MD033 MD034 -->

<div align="center">
  
# Notification App
  
![ajour banner](./resources/Susge.png)
  
</div>
  
## Table of Contents

- [Introduction](#introduction)
- [Screenshots](#screenshots)
- [Features](#features)
- [Install](#install)
- [Example](#example)

## Introduction
Basically a crude wrapper around the excellent work by the good folks over at Fyne (https://github.com/fyne-io/fyne)
This module allows you to receive desktop notifications whenever events occur in your existing codebase by implementing the LinkProvider interface.

<div align="center">

[![Download Button](./resources/download-button.png)](https://github.com/enkemmc/notification_app/releases)

</div>

## Screenshots

<p align="center">
  <img width="410"
       alt="Showing UI"
       src="/resources/screenshots/client_using_api.gif">
</p>

## Features

- Lorem Ipsum
  - Dolor
  - Sit
- Lorem Ipsum

## Install

``
go get -u github.com/enkemmc/notification_app
``

