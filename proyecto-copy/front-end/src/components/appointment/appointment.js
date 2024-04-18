import React, { useState } from "react";
import "./appointment.css";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const options = ['Dr. Omar Alfaro', 'Dra. Alejandra Ramos', 'Dra. Fabiana Aguilar', 'Dr. Antonio Porras'];

function ControllableStates() {
    const [value, setValue] = React.useState(options[0]);

    return (
        <div>
            <center>
                <br />
                <Autocomplete


                    id="controllable-states-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Seleccion de doctores" />}
                />

            </center></div>
    );
}



function Label({ componentName, valueType, isProOnly }) {
    const content = (
        <span>
            <strong>{componentName}</strong>
        </span>
    );



    return content;
}

function CommonlyUsedComponents() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh'}}>
            <div >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                            'DatePicker',
                            'TimePicker',
                        ]}
                    >
                        <DemoItem label={<Label componentName="Seleccione la fecha" valueType="date" />}>
                            <DatePicker />
                        </DemoItem>
                        <DemoItem label={<Label componentName="Seleccione la hora" valueType="time" />}>
                            <TimePicker />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </div>
    );
}

const options1 = ['Examen de vista', 'Consulta para cirugia', 'Consulta general', 'Otro'];

function ControllableStates1() {
    const [value, setValue] = React.useState(options1[0]);

    return (
        <div>
            <center>
                <br />
                <Autocomplete


                    id="controllable-states-demo"
                    options={options1}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Seleccion de servicios" />}
                />

            </center></div>
    );
}


    export default function Appointment() {
  return (
    <div className="appointment">
        <h1>Agendar Cita</h1>
        <ControllableStates />
        <CommonlyUsedComponents />
        <ControllableStates1 />
    </div>
    );
}
