const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const database = require("./models/schemas");
const userRoute = require("./views/routes/User");
const passwordRoute = require("./views/routes/Password");
const employeeRoute = require("./views/routes/Employee");
const courseRoute = require("./views/routes/Course");
const emailRoute = require("./views/routes/Email");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { Course } = require("./models/schemas");
const path = require("path");
const { validateToken } = require("./controllers/middlewares/auth");

require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    key(req, file, callback) {
      callback(null, uuidv4() + path.extname(file.originalname));
    },
  }),
});

app.post("/file/:id", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const id = req.params.id;
  const fileUrl = req.file.location;
  console.log(id);

  try {
    const updatedUrl = await Course.update(
      { fileUrl: fileUrl }, 
      { where: { id: id } }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar o fileUrl do curso." });
  }
});

app.use(express.json());
app.use(cors());

app.use("/auth", userRoute);
app.use("/api/password-reset", passwordRoute);
app.use("/employee", employeeRoute);
app.use("/course", courseRoute);
app.use("/", emailRoute);
app.use(validateToken);

database.sequelize.sync().then(() => {
  app.listen(3005, () => {
    console.log("Servidor está rodando na porta 3005");
  });
});
