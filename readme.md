<---Notes for connecting with DB--->
use 'mongodb://127.0.0.1/' for the base url
and mongoose
.connect(MONGO_URI, { family: 4 }) as the promise to connect
Change port to :
let PORT = process.env.PORT || 3000
