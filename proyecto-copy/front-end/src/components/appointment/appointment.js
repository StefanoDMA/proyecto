import React, { useState } from "react";
import "./appointment.css";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



const options = ['Dr. Omar Alfaro', 'Dra. Alejandra Ramos','Dra. Fabiana Aguilar', 'Dr. Antonio Porras' ];

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
     
    );
}

    
 
 
export default function Appointment() {
  return (
    <div className="appointment">
      <h1>Agendar Cita</h1>
      <ControllableStates/>
      <CommonlyUsedComponents/>
    </div>
  );
}