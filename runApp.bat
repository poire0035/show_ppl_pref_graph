@echo off
SET PORTNO=3000
cd show_ppl_pref_graph
yarn start
set url=http://localhost:%PORTNO%/
start chrome.exe %url%