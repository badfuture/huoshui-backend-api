#!/bin/bash

#Bootstrap using process manager (PM2)
pm2 start pm2.config.js --env production
