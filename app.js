const express = require("express");
var bcrypt = require("bcryptjs");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const User = require("./models/schema/UserSchema");
const Customers = require("./models/schema/Customer_Schema");
const cors = require("cors");
const messageValidate = require("./models/Validator/SignUpValidator");
const loginValidator = require("./models/Validator/loginValidator");
const AdminRouter = require("./routes/admin.js");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;


connectDb();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(AdminRouter);

// app.use(ErrorHandler);

// app.use('/', admin);

// User API

app.post("/login", async (req, res) => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({ error: error.details[0].message });
  }

  const password = req.body.password;
  const email = req.body.email;

  let userData = await User.findOne({ email: email });

  if (!userData) {
    res.send("wrong email");
  }
  const isCorrectUser = await bcrypt.compare(password, userData.password);

  if (isCorrectUser) {
    res.json({ data: userData, message: "login success", status: 1 });
  } else {
    res.json({ message: "wrong password", status: 0 });
  }
});



app.post("/signup", async (req, res) => {
  try {
    const { error } = messageValidate.validate(req.body);
    if (!error) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      });

      let result = await user.save();
      console.log(result);
      res.send(result);
      // const data = await add(req)
      // res.status(data.status).json(data)
    } else {
      res.status(400).json({ error: error.details[0].message });
    }
  } catch (error) {
    res.send(" something went wrong ");
  }
});


function generateRandomInvoiceNumber(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let invoiceNumber = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    invoiceNumber += characters.charAt(randomIndex);
  }

  return invoiceNumber;
}

app.get('/get-invoice-number', (req, res) => {
  const randomInvoiceNumber = generateRandomInvoiceNumber(10); // Change the length as needed
  res.json({ invoiceNumber: randomInvoiceNumber });
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
