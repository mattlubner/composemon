#!/bin/bash
date
echo "sleeping for ${SLEEP_FOR} seconds..."
sleep ${SLEEP_FOR}
echo "waking up..."
for i in {1..10}; do echo "$i "; done
date
if [ $# -gt 0 ]; then
  echo "running requested command..."
  exec "${@}"
fi