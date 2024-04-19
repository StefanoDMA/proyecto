const express = require("express");
const cors = require("cors");
const app = express();
const port = 3008;
const { Sequelize, DataTypes } = require("sequelize");

app.use(cors());
// Express middleware for parsing JSON
app.use(express.json());

//Conexion a la DB

// Database connection

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "prueba",
});


const User = sequelize.define("User", {
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
});

const Appointment = sequelize.define("Appointment", {
  appointment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  appointment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  appointment_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  appointment_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// User.hasMany(Appointment, {
//   foreignKey: {
//     allowNull: false,
//   },
//   onDelete: 'CASCADE',
// });

Appointment.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'user',
  },
  onDelete: 'CASCADE',
});

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch(error => {
//     console.error("Unable to connect to the database:", error);
//   });



app.post("/user", (req, res) => {
  console.log("req.body");
  console.log(req);
  res.send(user);
});

app.post("/login", async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    // console.log("req.body");
    // console.log(req.body);
    const user = await User.findOne({
      where: {
        user_email: user_email,
        user_password: user_password,
      },
    });


    console.log("El usuario en respuesta es:");
    console.log(user);
    console.log("El ID es: " + user.user_id);

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user_email, user_name, user_last_name, user_password } = req.body;
    console.log("req.body");
    console.log(req.body);
    const user = await User.create({
      user_email,
      user_name,
      user_last_name,
      user_password,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//... (rest of the code remains the same)

app.post('/appointment', async (req, res) => {
  try {
    const { user, appointment_date, appointment_time, doctor, service } = req.body;
    const appointment = await Appointment.create({
      user,
      appointment_date,
      appointment_time,
      doctor,
      service,
    });
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/appointments/:appointment_id', async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      res.status(200).json(appointment);
    }
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/appointments/:appointment_id', async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const { appointment_date, appointment_time, appointment_description } = req.body;
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
    } else {
      await appointment.update({
        appointment_date,
        appointment_time,
        appointment_description,
      });
      res.status(204).json({ message: 'Appointment updated' });
    }
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/appointments/:appointment_id', async (req, res) => {
  try {
    const { appointment_id } = req.params;
    await Appointment.destroy({
      where: {
        appointment_id,
      },
    });
    res.status(204).json({ message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await User.model.destroy({
      where: {
        user_id,
      },
    });

    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_email, user_name, user_last_name, user_password } = req.body;
    await User.update(
      {
        user_email,
        user_name,
        user_last_name,
        user_password,
      },
      {
        where: {
          user_id,
        },
      }
    );

    res.status(204).json({ message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
