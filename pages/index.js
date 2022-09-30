import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from 'next/router'
import { useEffect } from "react";
export default function App() {
  const router = useRouter()
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only words")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]\d{8,9}$/, "Incorrect phone Number")
      .required("Required"),
    dob: Yup.string().required("Required")
  });

  useEffect(() => {
      if(typeof window !== 'undefined'){
       if(window.location.href !== '/datePage'){
        localStorage.removeItem('values')
       }
      }
  }, [])
  
  return (
    <Box className="App container" style={{textAlign: 'center'}}>
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            dob: "",
            gender:""
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            localStorage.setItem('values',JSON.stringify(values))
            router.push({pathname:'/datePage'})
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Field
                label="Name"
                style={{ margin: "2px" }}
                component={CustomTextField}
                name="name"
                type="text"
              />
              <br />
              <Field
                label="Email"
                style={{ margin: "2px" }}
                component={CustomTextField}
                name="email"
                type="email"
              />
              <br />
              <Box style={{ margin: "10px" }}>
                <Field
                  label="Gender"
                  name="gender"
                  value={["male", "female"]}
                  onChange={(e)=>setFieldValue('gender',e.target.value)}
                  component={CustomSelect}
                />
              </Box>
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="DOB"
                  type="text"
                  value={values.dob || null}
                  name="dob"
                  onChange={(newValue) => setFieldValue("dob", newValue.$d)}
                  renderInput={(params) => (
                    <TextField type="text" variant="outlined" {...params} helperText={ touched['dob'] && errors['dob'] && errors['dob']} />
                  )}
                />
              </LocalizationProvider>
              <br />
              <br />
              <Field
                label="Phone Number"
                style={{ margin: "2px" }}
                component={CustomTextField}
                name="phoneNumber"
              />
              <br />
              <Button
                style={{ margin: "2px" }}
                variant="outlined"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Box>
  );
}

const CustomTextField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  type,
  ...props
}) => (
  <div>
    <TextField
      label={label}
      variant="outlined"
      type={type}
      {...field}
      {...props}
      helperText={
        touched[field.name] && errors[field.name] && errors[field.name]
      }
    />
  </div>
);

const CustomSelect = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  name,
  type,
  value,
  onChange,
  ...props
}) => (
  <FormControl style={{ width: "30ch" }}>
    <InputLabel>{label}</InputLabel>
    <Select onChange={onChange} label={label} name={name} variant="outlined">
      {value.map((element, index) => (
        <MenuItem key={index} value={element}>
          {element}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>
      {touched[field.name] && errors[field.name] && errors[field.name]}
    </FormHelperText>
  </FormControl>
);
