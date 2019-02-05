---
title: Quickly Spin Up MySQL w/ Docker Compose
date: '2019-02-06'
open_graph: https://images.pexels.com/photos/15798/night-computer-hdd-hard-drive.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
---

I've often needed to quickly spin up a local instance of MySQL. [Docker Compose](https://docs.docker.com/compose/) this makes it stupid easy. 

## Getting Set Up

Inside a new directory, create a `data` directory and `docker-compose.yml` file, like this: 

```
new-directory
├── data
└── docker-compose.yml
```

Inside your `docker-compose.yml` file, include this:

```
version: '3'

services: 
  db:
    container_name: docker-local-mysql
    image: mysql:5.7.21
    volumes:
      - "./data:/var/lib/mysql"
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root

```

## Managing a Container

To start the container, run `docker-compose up`.

To stop & remove the container, run `docker-compose down`.

## Persisting Data

Whenever MySQL modifies any data within the container, it will persist locally in your `./data` directory, even after you stop and restart everything. 

## Running Commands Inside Container

To run any Bash commands inside the running container, use `docker-compose exec db bash`.

## Connecting w/ SequelPro or Similar Tool

Use the following values to connect to the running container.

**Host:** 127.0.0.1

**Username:** root

**Password:** root

**Port:** 3306
