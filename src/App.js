import React, { useEffect, useState } from 'react';
import { Navbar, Container, Alert, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

function App() {
  const [problemNumber, setproblemNumber] = useState(0);
  const problems = [[[2, 5], [4, 7], [6, 9], [8, 11]], [[2, 5], [4, 8], [6, 11], [8, 14]], [[2, 1], [5, 3], [8, 4], [11, 7]], [[4, 1], [5, 2], [7, 4], [8, 7]]];
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    console.log(problemNumber);
  }, [problemNumber]);

  const handleSubmit = () => {
    const userAnswer = [parseInt(answer1), parseInt(answer2)];

    const d1 = problems[problemNumber][1][0] - problems[problemNumber][0][0];
    const d2 = problems[problemNumber][1][1] - problems[problemNumber][0][1];
    const d3 = problems[problemNumber][2][1] - problems[problemNumber][1][1];
    const d4 = problems[problemNumber][3][1] - problems[problemNumber][2][1];
    const d = d4 - d2;
    const nextinc = d3 + d;
    const expectedAnswer = [problems[problemNumber][3][0] + d1, problems[problemNumber][3][1] + nextinc];
    const isCorrect = userAnswer[0] === expectedAnswer[0] && userAnswer[1] === expectedAnswer[1];

    setAlertVariant(isCorrect ? 'success' : 'danger');
    setAlertMessage(isCorrect ? 'Correct!' : `Wrong! Correct answer is : (${expectedAnswer[0]}, ${expectedAnswer[1]})`);
    setShowAlert(true);
  };

  const handleNextProblem = () => {
    let number = problemNumber;
    number++;
    setAnswer1('');
    setAnswer2('');
    setShowAlert(false);
    setproblemNumber(number);
    console.log(problemNumber)
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{marginLeft:'20px'}}>Logo</Navbar.Brand>
      </Navbar>
      <div className="bg-grey">
        <Container>
          <p className="mt-4 mb-4" style={{ backgroundColor: "white", padding: "10px", borderRadius: '5px' }}> Mental Maths - Level 1</p>
          <div style={{ textAlign:"center" }}>
            <h1>{problems[problemNumber].map((problem, index) => {
              return `(${problem[0]},${problem[1]})`
            })}(<input type="text" style={{ width: "60px", border: "none" }} value={answer1} onChange={(e) => setAnswer1(e.target.value)} />,<input type="text" style={{ width: "60px", border: "none" }} value={answer2} onChange={(e) => setAnswer2(e.target.value)} />)</h1>
            <div style={{margin:"50px"}}>
              <Button variant="dark" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
          {showAlert && <Alert style={{ backgroundColor: alertVariant === 'danger' ? "red" : "green", color: 'white', position: 'relative' }} className="mt-4">{alertVariant === 'danger' ? <CloseIcon/> : <DoneIcon/>}{alertMessage}{showAlert && problemNumber < 3 && <Button style={{ right: "0", position: "absolute", top: '50%', transform: "translateY(-50%)", marginRight: '20px' }} variant="light" onClick={handleNextProblem}>Next</Button>}</Alert>}
        </Container>
      </div>
    </div>
  );
}

export default App;
