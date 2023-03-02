import setupApp from './src/app.js'

(async () => {
    try {
        const app = await setupApp()
        const port = 3000

        const server = app.listen(port, () =>
            console.info(`app running on port ${port}`)
        )

        const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"]
        exitSignals.map(sig =>
            process.on(sig, () =>
                server.close(err => {
                    if (err) {
                        console.error(err)
                        process.exit(1)
                    }
                    app.database.connection.close(function () {
                        console.info("Database connection closed!")
                        process.exit(0)
                    })
                })
            )
        )
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()