# Backend Maspos

## Official Documentation

Documentation Platform [NodeJs](https://nodejs.org/en/).

Documentation NodeJs Framework [Express](https://expressjs.com/).

Documentation SQL Database Module [Knex](https://knexjs.org/).

Documentation ORM Database Module [Objection.js](https://vincit.github.io/objection.js/guide/installation.html).

## Requirement

#### Install Knex and Knex Command Line Tool

Install `knex` **globally** on your local computer.

> npm install knex -g

This will allow us to use `knex` as a command line tool that helps you create and manage your knex files.

#### Nodemon Global for Development

> npm install nodemon --global

#### Multer for File Upload Handle

Just dont forget to create folder named "uploads". Also inside the folder "uploads", create a folder named "rooms", "cars", "cars booking", "drivers" & "users".

## Installation

#### Execute in your terminal

> npm install

> cp .env.example .env

#### !! Setup your database on .env file !!

Migrate database

> knex migrate:latest

Run Application

> nodemon start

open http://localhost:8080 to make sure it's work

## Features

#### Swagger API Documentations

This project comes with documentation using [Swagger](https://swagger.io/). go here http://localhost:8080/docs to see it

#### Prettier

Run Prettier to tidy up your code

> npm run prettier

#### Enjoy coding

### Created with ❤️
