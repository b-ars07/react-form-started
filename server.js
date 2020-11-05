const express = require('express')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(
    fileUpload({
      createParentPath: true
    })
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))

app.post('/', async (req, res) => {
  try {
    if (req.files && req.files.files) {
      //console.log(JSON.stringify(req.files))
      [req.files.files].flat().map(file => {
        file.mv('./uploads/' + file.name)
      })
    }

    fs.mkdir(path.join(__dirname, 'uploads'), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    })

    fs.writeFile("./uploads/data.json", JSON.stringify(req.body), "utf8", () => {
      res.send({
        status: true,
        message: "Data is uploaded"
      })
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).send(e.message)
  }
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`))