#!/bin/bash
mkdir -p logs  # create the logs directory if it doesn't exist
timestamp=$(date +%Y%m%d%H%M%S)  # create a timestamp
docker-compose up -d 
docker-compose logs -f &> logs/docker_logs_$timestamp.log &
