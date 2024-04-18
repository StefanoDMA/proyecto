import React, { useState } from "react";
import "./appointment.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const options = [
  "Dr. Omar Alfaro",
  "Dra. Alejandra Ramos",
  "Dra. Fabiana Aguilar",
  "Dr. Antonio Porras",
];

function ControllableStates() {
  const [selectedDoctor, setSelectedDoctor] = useState(options[0]);
    
    
  
  return (
    <div>
      <Autocomplete
        id="controllable-states-demo"
        options={options}
value={selectedDoctor}
        onChange={(event, newValue) => {
          setSelectedDoctor(newValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Seleccion de doctores" />
        )}
      />
    </div>
  );
}

function Label({ componentName, valueType, isProOnly }) {
  return (
    <span>
      <strong>{componentName}</strong> {valueType}
      {isProOnly && <sup style={{ color: "red" }}>*</sup>}
    </span>
  );
}

function CommonlyUsedComponents() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleButtonClick = () => {
    if (options && selectedDate && selectedTime) {
      console.log(`Selected doctor: ${options}`);
      console.log(`Selected date: ${selectedDate.format("YYYY-MM-DD")}`);
      console.log(`Selected time: ${selectedTime.format("HH:mm")}`);
    } else {
      alert("Please select a doctor, date, and time.");
    }
  };

  const navigate = useNavigate();
    const handleSumbit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3008/appointment", {
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          user_id: JSON.parse(localStorage.getItem("user")).user_id,
        });
        console.log(response.data);
        // Reset input fields after successful registration
  
        localStorage.setItem("appointment", JSON.stringify(response.data.appointment));
        navigate("/");
        setSelectedDate("");
        setSelectedTime("");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "TimePicker"]}>
        <DemoItem label={<Label componentName="Seleccione la fecha" valueType="date" />}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </DemoItem>
        <DemoItem label={<Label componentName="Seleccione la hora" valueType="time" />}>
          <TimePicker
            value={selectedTime}
            onChange={(newValue) => {
              setSelectedTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </DemoItem>
      </DemoContainer>
      <button onClick={handleSumbit}>Submit</button>
    </LocalizationProvider>
  );
}

export default function Appointment() {
  return (
    <div className="appointment">
      <h1>Agendar Cita</h1>
      <ControllableStates />
      <CommonlyUsedComponents />
    </div>
  );
}