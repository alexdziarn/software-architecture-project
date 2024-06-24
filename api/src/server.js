const { app } = require("./app")

const port = 3000
app.listen(port, hostname="0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`)
})