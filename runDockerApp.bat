
@echo off
SET PORTNO=3000

rem dockerコンテナ停止
wsl sudo docker compose down
rem dockerfileビルド
wsl sudo docker compose build
rem dockerコンテナ起動
wsl sudo docker compose up -d
pause
set url=http://localhost:%PORTNO%/
start chrome.exe %url%

