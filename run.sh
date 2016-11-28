#!/bin/bash
LOG_DIR="logs"

#log directory setup
if [ ! -d "$LOG_DIR" ]; then
  mkdir $LOG_DIR
else
  rm -rf $LOG_DIR
fi

#Bootstrap using forever daemon
forever -l ${LOG_DIR}/forever.log start -o ${LOG_DIR}/out.log -e ${LOG_DIR}/err.log app.js
