@echo off
SETLOCAL EnableDelayedExpansion

set periodArg=%1

if "%1"=="" (
  SET periodArg=15 
  )

echo Period is %periodArg%

:loop

echo !date! !time!

call node_modules\.bin\gulp run

timeout /t %periodArg% /nobreak > NUL

goto loop