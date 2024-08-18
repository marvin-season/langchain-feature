const DemoController = (app) => {
    if (!app) return

    app.get('/demo', (req, res) => {
        res.json({})
    })
}

export default DemoController