const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const Joi = require("joi");

app.use(cors());
app.use(express.json());

// Database connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "prueba",
});

// Entity classes
class Entity {
  constructor(name, fields) {
    this.name = name;
    this.model = sequelize.define(name, fields);
  }

  async sync() {
    await this.model.sync({ force: true });
    console.log(`Table for ${this.name} synchronized`);
  }

  hasMany(target, options) {
    this.model.hasMany(target.model, options);
  }

  belongsTo(source, options) {
    this.model.belongsTo(source.model, options);
  }
}

const userSchema = {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

const appointmentSchema = {
  appointment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  appointment_time: {
    type: DataTypes.TIME,
    allowNull: false,
    unique: false,
  },
  appointment_reason: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
};

const User = new Entity("User", userSchema);
const Appointment = new Entity("Appointment", appointmentSchema);

User.hasMany(Appointment, { as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "user_id" });

// Synchronize the database with the defined models
const syncronizeDB = async () => {
  await sequelize.sync();
  await User.sync();
  await Appointment.sync();
};

syncronizeDB();

// Route handlers
app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_last_name, user_password } = req.body;
    const user = await User.model.create({
      user_email,
      user_name,
      user_last_name,
      user_password: await bcrypt.hash(user_password,10),
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await User.model.findOne({
      where: {
        user_email,
      },
    });

    if (user && (await bcrypt.compare(user_password, user.user_password))) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/appointment", async (req, res) => {
  try {
    const { appointment_date, appointment_time, appointment_reason, user_id } = req.body;
    const appointment = await Appointment.model.create({
      appointment_date,
      appointment_time,
      appointment_reason,
      user_id,
    });

    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error handling middleware:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});