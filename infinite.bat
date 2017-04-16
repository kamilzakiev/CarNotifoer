@echo off
SETLOCAL EnableDelayedExpansion

:loop

echo !date! !time!

call gulp run

timeout /t 10 /nobreak > NUL

goto loop