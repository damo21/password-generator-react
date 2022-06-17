import './App.css';
import { Slider, Container, Box } from '@mui/material';
import { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function App() {

  const [sliderValue, setSliderValue] = useState(5)
  const [generatedPass, setGeneratedPass] = useState('')
  const [checkBoxState, setCheckBoxState] = useState({
    Spec: false,
    num: false,
    up: false
  })

  const sliderValueHandler = (event, newValue) => {
    if (typeof newValue === 'number') {
      setSliderValue(parseInt(newValue))
    }
  }

  const checkboxHandler = (event) => {
    setCheckBoxState({ ...checkBoxState, [event.target.name]: event.target.checked })
  }

  const generatePassword = () => {
    const upperArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const lowerArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const specialCharArray = ['!', '£', '$', '%', '^', '&', '*', '-', '_', '+', '=', '#', ':', ';', '~', '[', ']', '{', '}', '.', '`', '\\', '/']
    let tempArray = []
    const passLen = sliderValue;
    let genPass = '';
    while (genPass.length <= passLen) {

      if (checkBoxState.Spec === true) { tempArray.push(specialCharArray[Math.floor(Math.random() * specialCharArray.length)]);} 
      if (checkBoxState.num === true) { tempArray.push(numberArray[Math.floor(Math.random() * numberArray.length)]);}
      if (checkBoxState.up === true) { tempArray.push(upperArray[Math.floor(Math.random() * upperArray.length)]);}
      tempArray.push(lowerArray[Math.floor(Math.random() * lowerArray.length)]);
      let firstCharacter = tempArray[Math.floor(Math.random() * tempArray.length)];
      tempArray = []
      genPass += firstCharacter
    }
    setGeneratedPass(genPass)
  }


  return (
    <div className="App">
      <Container
        maxWidth="sm"
        style={{ position: "relative", top: "15vh", backgroundColor: '#003459', borderRadius: '5px', border: "2px solid #007EA7" }}
      >
        <Box textAlign={'center'}>
          <h1>Password Generator</h1>
          <span className='sharedText'>Password Length: {sliderValue} characters</span>
          <Slider
            defaultValue={5}
            min={5}
            max={25}
            aria-label="Always visible"
            valueLabelDisplay="auto"
            style={{ color: "white" }}
            value={sliderValue}
            onChange={sliderValueHandler}
          />
          <span
            className='sharedText'>
            Select Prefered Options:
            <div><small><i>(If no options are selected only lowercase character password will generate)</i></small></div>
          </span>
          <FormGroup row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FormControlLabel
              style={{ color: "white" }}
              control={
                <Checkbox
                  checked={checkBoxState.Spec}
                  onChange={checkboxHandler}
                  style={{ color: "white" }}
                  name="Spec">
                </Checkbox>}
              label="Special Characters"
            />
            <FormControlLabel
              style={{ color: "white" }}
              control={
                <Checkbox
                  checked={checkBoxState.num}
                  onChange={checkboxHandler}
                  style={{ color: "white" }}
                  name="num">

                </Checkbox>}
              label="Numbers"
            />
            <FormControlLabel
              style={{ color: "white" }}
              control={
                <Checkbox
                  checked={checkBoxState.up}
                  onChange={checkboxHandler}
                  style={{ color: "white" }}
                  name="up">
                </Checkbox>}
              label="Uppercase Characters"
            />

          </FormGroup>
          <Button
            style={{ border: '2px solid white', color: 'white', alignItems: 'center', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}
            onClick={generatePassword}
          >GENERATE</Button>
          <br />
          <span className='sharedText'>Generated Password: </span>
          <br />
          <span className='sharedText'><strong>{generatedPass}</strong></span>
        </Box>
      </Container>
    </div>
  );
}

export default App;
