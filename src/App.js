import React, { useEffect, useState } from 'react';
import { Navbar, Container, Alert, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import './App.css'

function App() {
  const [expectedAnswer, setexpectedAnswer] = useState([]);
  const [problem, setproblem] = useState([]);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    handleNextProblem();
  }, []);

  const handleSubmit = () => {
    const userAnswer = [parseInt(answer1), parseInt(answer2)];
  
    const isCorrect = userAnswer[0] === expectedAnswer[0] && userAnswer[1] === expectedAnswer[1];

    setAlertVariant(isCorrect ? 'success' : 'danger');
    setAlertMessage(isCorrect ? 'Correct!' : `Wrong! Correct answer is : (${expectedAnswer[0]}, ${expectedAnswer[1]})`);
    setShowAlert(true);
  };

  const handleNextProblem = () => {
    const a1 = Math.floor(Math.random() * 20);
    const a2 = Math.floor(Math.random() * 20);
    const d1 = Math.floor(Math.random() * 20);
    const d2 = Math.floor(Math.random() * 20);
    const d3 = Math.floor(Math.random() * 20);
    let pre1 = a1, pre2 = a2;
    let newproblem = [];
    newproblem.push([a1, a2]);
    for (let i = 0; i < 3; i++) {
      let cur1, cur2;
      if (i % 2 === 0) {
        cur1 = pre1 + d1;
        cur2 = pre2 + d2;
      }
      else {
        cur1 = pre1 + d1;
        cur2 = pre2 + d3;
      }
      newproblem.push([cur1, cur2]);
      pre1 = cur1;
      pre2 = cur2;
    }
    setexpectedAnswer([pre1 + d1, pre2 + d3]);
    setproblem(newproblem);
    setAnswer1('');
    setAnswer2('');
    setShowAlert(false);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{marginLeft:'20px'}}>Logo</Navbar.Brand>
      </Navbar>
      <div className="bg-grey">
        <Container>
          <p className="heading mt-4 mb-4"> Mental Maths - Level 1</p>
          <div style={{ textAlign:"center" }}>
            <h1>{problem.map((p, index) => {
              return `(${p[0]},${p[1]})`
            })}(<input className='AnswerInput' type="text" value={answer1} onChange={(e) => setAnswer1(e.target.value)} />,<input className='AnswerInput' type="text" value={answer2} onChange={(e) => setAnswer2(e.target.value)} />)</h1>
            <div style={{margin:"50px"}}>
              <Button variant="dark" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
          {showAlert && <Alert style={{ backgroundColor: alertVariant === 'danger' ? "red" : "green", color: 'white', position: 'relative' }} className="mt-4">{alertVariant === 'danger' ? <CloseIcon/> : <DoneIcon/>}{alertMessage}{showAlert && <Button className='nextButton' variant="light" onClick={handleNextProblem}>Next</Button>}</Alert>}
        </Container>
      </div>
    </div>
  );
}

export default App;
