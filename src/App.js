import {Button, Container, Row, Col} from 'react-bootstrap';
import trailData from "./assets/trail-data.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import TrailItem from './components/TrailItem'

function App() {
  return (
    <div>
      <h1> Hiking Trails</h1>
     <Container>
       <Row>
         <Col sm={4}> 
         <input type='checkbox' name='filter1' id='Beginner' value='Beginner'/>
         <label for="Hello"> Beginner</label>
         <br></br>
         <input type='checkbox' name='filter1' id='Bike-friendly' value='Bike-friendly'/>
         <label for="World"> Bike-friendly</label>
         </Col>
         <Col sm={8}>
           <div className='TrailItemsContainer'>
         {trailData.map((item, index) => (
        <div className="TrailItem">
        <TrailItem item={item} index={index} key={index}/>
        </div>
      ))}
      </div>
         </Col>
       </Row>
     </Container>
    </div>
  );
}

export default App;
