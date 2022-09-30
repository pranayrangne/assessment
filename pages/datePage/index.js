import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Box, Container, Button } from "@material-ui/core";
export default function index({ props }) {
  const [stateDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [countDays, setCountDays] = React.useState(0);
  const [result,setResult] = React.useState(null)
  function countSundays(d0, d1) {
    var weekendDays = 0;
    for (let i = d0; i <= d1; i.setDate(i.getDate()+1)) {
            if(i.getDay() === 0){
                weekendDays++;
            } 
    }
      setCountDays(weekendDays)
      setResult(JSON.parse(localStorage.getItem('values')))

  }
  const handleSubmit = () => {
    let d0 = new Date(stateDate);
    let d1 = new Date(endDate);
    if(stateDate !== null && endDate !== null){
        countSundays(d0, d1);
    }else{
        alert('Please add Start Date & End Date')
    }
  };
 const date = new Date(result?.dob)
  return (
    <>
      <Container>
        <h4>Calculate Sundays</h4>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              type="text"
              value={stateDate || null}
              name="dob"
              onChange={(newValue) => setStartDate(newValue.$d)}
              renderInput={(params) => (
                <TextField type="text" variant="outlined" {...params} />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              type="text"
              value={endDate || null}
              name="dob"
              onChange={(newValue) => setEndDate(newValue.$d)}
              renderInput={(params) => (
                <TextField type="text" variant="outlined" {...params} />
              )}
            />
          </LocalizationProvider>
        </Box>
        <br />
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Submit
        </Button>
        <br/>
        <br/>
        {result !== null ? <Box>
            Name:{result?.name} <br/>
            email:{result?.email}<br/>
            phone Number:{result?.phoneNumber}<br/>
            Gender:{result?.gender}
            DOB: {date?.getDate()}-{date?.getMonth()}-{date?.getFullYear()}
            <br/>
            Calculate Sundays : {countDays}
        </Box>:<></>}
      </Container>
    </>
  );
}
