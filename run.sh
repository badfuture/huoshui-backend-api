#!/bin/bash

# pull latest images
docker-compose pull

# restart all services
docker-compose down && docker-compose up -d
