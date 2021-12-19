## The Challenge

This project is a challenge build based on [this requirements](README_original.md).

## The Project

The project consists of a Calendar where we can add, edit and remove reminders.

## Development Setup

To make it easear we are using docker and docker-compose to setup the development environment. If you don't have it installed you can take a look at the links bellow:

 - <https://www.docker.com/>
 - <https://docs.docker.com/compose>

### Preparing Database

If you are running the app for the first time you will need to execute the command bellow to prepare the database.


```
docker-compose run web rails db:prepare

```
This might take a while sinse it will also build the docker image on the first execution.

### Running the app

After have docker and docker-compose installed you can simple execute the command bellow inside the project folder.

```
docker-compose up
```
or
```
docker-compose up -d
```
If you want it to be detached from your terminal.

