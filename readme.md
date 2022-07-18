<---Notes for connecting with DB--->
use 'mongodb://127.0.0.1/' for the base url

 mongoose
.connect(MONGO_URI, { family: 4 }) as the promise to connect

Change port to :
let PORT = process.env.PORT || 3000

make sure start script exist

<--- Notes for EJS and HBS --->
HBS command: npx ironlauncher@latest new-app
EJS command: npx ironlauncher-ejs@latest new-app

<---------------For restarting mongodb community ------------------>
Try this if you tried to restart your service, but it still doesn't work

stop your service
brew services stop mongodb-community
restart your macOS
start your service again
brew services start mongodb-community
