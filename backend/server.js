const express = require("express");
const cors = require("cors");
const privateRouter = require("./src/routes");
const { connectionMySQL } = require("./connection/db");
const cron = require("node-cron");
const path = require("path");

// CSP protection
const helmet = require("helmet");
// CSRF protection
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const cleanUpSystem = require("./cron");
const { BE_PORT, FE_ENDPOINT } = require("./variables/global");

const app = express();

const allowedOrigins = [FE_ENDPOINT];

const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};
//connect sql
connectionMySQL();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
			frameAncestors: ["'self'", FE_ENDPOINT],
		},
	}),
);
app.use(cookieParser());
// app.use(csrf({ cookie: true }));

// app.get("/csrf-token", (req, res) => {
// 	res.json({ csrfToken: req.csrfToken() });
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
	res.send("Hello hacker lord to the 4user !!!");
});

privateRouter.forEach((route) => app.use(route));

cleanUpSystem.forEach((cronElement) => {
	cron.schedule("0 0 * * *", cronElement);
});

app.listen(BE_PORT, () => {
	console.log(`Server is running on ${BE_PORT}`);
});
