const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const User = require("./models/user");

const app = express();

// const corsOptions = {
//   origin: 'http://allowed-origin.com', // là domain của Front-end. Nó chỉ định rằng các request từ domain này được phép truy cập vào tài nguyên của server back-end
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Để cho phép gửi cookie qua cross-origin từ FE đến BE và ngược lại
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MONGODB_URI =
  "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/review-lab";

const store = MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    key: "userId",
    secret: "123546",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60,
      httpOnly: false,
    },
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => console.log("lỗi tại app.js : ", err));
});

// const logger = (req, res, next) => {
//   console.log("test a middleware");
//   next();
// };

// app.use(logger);

// app.use((req, res, next) => { // middleware có thể can thiệp và tạo ra lỗi
//   const err = new Error("Something went wrong!");
//   next(err);
// });

const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, "images");
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(multer({ storage: fileStore }).single("image"));

app.use(adminRoute);

app.use(authRoute);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
    // const server = app.listen(5000);
    // const io = require("./socket.io").init(server);
    // io.on("connect", (socket) => {
    //   console.log("Client connected");
    //   console.log(socket);
    // });
  })
  .catch((err) => {
    console.log(err);
  });
