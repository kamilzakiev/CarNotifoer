@echo off
SETLOCAL EnableDelayedExpansion

set periodArg=%1
set closeArg=%2

if "%1"=="" (
  SET periodArg=15 
  )

echo Period is %periodArg%

:loop

echo !date! !time!

call node_modules\.bin\gulp run


if "%closeArg%"=="close" (
    set min=%TIME:~3,2%
    
    if "%min%"=="58" goto end
    if "%min%"=="59" goto end
  )

timeout /t %periodArg% /nobreak > NUL

goto loop

:end