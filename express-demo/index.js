const Joi = require("joi");

const logger = require("./logger");
const authenticator = require("./authenticator");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { valid } = require("joi");
const { acceptsLanguage } = require("express/lib/request");
const app = express();

// process.env.NODE_ENV; // returns the current environment. Value can be undefined, development, testing, staging, production
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// app.get("env"); // under the hood it uses process.env.NODE_ENV to determine environment. Only difference is if it's not set, will return development by default
// console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value for html forms
app.use(express.static("public")); // all static assets (css, images, etc) go into folder specified
app.use(helmet()); // sets http headers (for cors etc)

if (app.get("env") === "development") {
  app.use(morgan("tiny")); // upon http request, logs request info in terminal  - argument 'tiny' refers to the info in the log
  console.log("morgan enabled");
}

app.use(logger);
app.use(authenticator);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);

  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

function lookUpCourse(id) {
  return courses.find((c) => c.id === parseInt(id));
}
