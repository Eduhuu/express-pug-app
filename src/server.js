const { app } = require("./app/app")

const PORT = app.get("port")

app.listen(PORT, () => {
    console.log(`---- Server running at port ${PORT} ----`)
})