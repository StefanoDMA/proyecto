import React, { useState } from "react";
import "./appointment.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Autocomplete, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const doctorOptions = [
  "Dr. Omar Alfaro",
  "Dra. Alejandra Ramos",
  "Dra. Fabiana Aguilar",
  "Dr. Antonio Porras"
];

const serviceOptions = [
  "Examen de vista",
  "Consulta para cirugia",
  "Consulta general",
  "Otro"
];

const initialAppointmentData = {
  appointment_date: null,
  appointment_time: null,
  doctor: doctorOptions[0],
  service: serviceOptions[0]
};

function handleInputChange(appointmentData, e) {
  return {...appointmentData, [e.target.name]: e.target.value };
}

function AppointmentForm() {
  const [appointmentData, setAppointmentData] = useState(initialAppointmentData);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // const user = localStorage.getItem("user");
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post("http://localhost:3008/appointment", {
        appointment_date: appointmentData.appointment_date,
        appointment_time: appointmentData.appointment_time,
        doctor: appointmentData.doctor,
        service: appointmentData.service,
        user: user.user_id
      });
      console.log(response.data);
      localStorage.setItem("appointment", JSON.stringify(response.data.appointment));
      navigate("/");
      setAppointmentData(initialAppointmentData);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Autocomplete
        id="doctor-selector"
        options={doctorOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Seleccion de doctores" />}
        value={appointmentData.doctor}
        onChange={(event, newValue) => setAppointmentData(handleInputChange(appointmentData, { target: { name: "doctor", value: newValue } }))}
      />
      <br />
      <Autocomplete
        id="service-selector"
        options={serviceOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Seleccion de servicios" />}
        value={appointmentData.service}
        onChange={(event, newValue) => setAppointmentData(handleInputChange(appointmentData, { target: { name: "service", value: newValue } }))}
      />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          
          value={appointmentData.appointment_date}
          onChange={(newValue) => setAppointmentData(handleInputChange(appointmentData, { target: { name: "appointment_date", value: newValue } }))}
        />
        <br></br>
        <TimePicker
          value={appointmentData.appointment_time}
          onChange={(newValue) => setAppointmentData(handleInputChange(appointmentData, { target: { name: "appointment_time", value: newValue } }))}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit">
        Agendar
      </Button>
    </form>
  );
}

export default function Appointment() {
  return (
    <div className="appointment">
      <h1>Agendar Cita</h1>
      <AppointmentForm />
    </div>
  );
}