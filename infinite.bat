@echo off
SETLOCAL EnableDelayedExpansion

:loop

echo !date! !time!

call gulp run

timeout /t 60 /nobreak > NUL

goto loop