import {Button, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h1> Hiking Trails</h1>
     <Container>
       <Row>
         <Col sm={4}> 
         <input type='radio' name='filter2' id='Hello' value='Hello'/>
         <label for="Hello">Hello</label>
         <br></br>
         <input type='radio' name='filter1' id='World' value='World'/>
         <label for="World">World</label>
         </Col>
         <Col sm={8}> 2 of 2</Col>
       </Row>
     </Container>
    </div>
  );
}

export default App;
