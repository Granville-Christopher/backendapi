require("dotenv").config();
const session = require("express-session");
const express = require("express");
const db = require("./db/database");
const MongoStore = require("connect-mongo");
const cryptoRoutes = require("./route/basicroute/cryptoroute");
const giftCardRoutes = require("./route/basicroute/giftcardroute");
const registerRoute = require("./route/adminroute/register");
const loginRoute = require("./route/adminroute/login");
const cryptoRoute = require("./route/adminroute/cryptouploadroute");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://beastphilantropy-production.up.railway.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

db();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/crypto", cryptoRoutes);
app.use("/api/giftcard", giftCardRoutes);
app.use("/secure/admin", registerRoute);
app.use("/secure/admin", loginRoute);
app.use("/secure/admin", cryptoRoute);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
