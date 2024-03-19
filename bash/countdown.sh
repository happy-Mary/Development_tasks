#!/bin/bash
# Program that counts down to zero from a given argument

# in console: ./countdown.sh arg1 arg2 arg3
# echo $* # will show arg1 arg2 arg3
# echo $2 will show arg 2

echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then
# for implementation
: '
  for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
  done
'
# while implementation
I=$1
  while [[ $I -ge 0 ]]
  do
    echo $I
    (( I-- ))
    sleep 1
  done
else
  echo Include a positive integer as the first argument.
fi