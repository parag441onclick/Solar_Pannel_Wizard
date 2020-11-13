import React from "react";
import { Card } from "react-bootstrap";
import questions from "../../../../api/questions";

class PropertySurvey extends React.Component {
  componentDidMount() {
    questions.get("/q1").then((resp) => {});
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <form>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='exampleRadios'
                id='exampleRadios1'
                value='option1'
                defaultChecked={false}
              />
              <label className='form-check-label' for='exampleRadios1'>
                Default radio
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='exampleRadios'
                id='exampleRadios2'
                value='option2'
                defaultChecked={false}
              />
              <label className='form-check-label' for='exampleRadios2'>
                Second default radio
              </label>
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default PropertySurvey;
