# lunch-mailer
automates the arduous task of clicking a bookmark to see todays lunch 

## setup
- sign up for send grid and get api key
- create `.env` file with `SG_API_KEY`, `SG_SENDER`, and `SG_RECIPIENT`
Then running the script will send an email to `SG_RECIPIENT` from `SG_SENDER` containing the lunch of the day from Lilla Bommen Konferenscenter

## how to automate with windows Task Scheduler
- create `.bat` file with
```
node main.js
```
- create `.vbs` file with
```
Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "<Path to bat file>" & Chr(34), 0
Set WshShell = Nothing
```
- create task in Task Scheduler to run the `.vbs` file at the desired time and interval 

#### note
- the purpose of the `.vbs` file is to run the `.bat` file without opening a terminal visible to the user
