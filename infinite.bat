@echo off
SETLOCAL EnableDelayedExpansion

:loop

echo !date! !time!

call node_modules\.bin\gulp run

timeout /t 10 /nobreak > NUL

goto loop