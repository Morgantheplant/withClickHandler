import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TITLE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FETCHING_STATUSES,
  DESCRIPTION_MAX_LENGTH
} from "./constants";
import {
  changeEmail,
  changeTitle,
  changeDescription,
  sendData
} from "./actions";


class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.props.onChange(this.props.currentState);
  }
  render() {
    return <div>
      Enter {this.props.type}
      <input
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
      />
      <small>{`max ${this.props.maxLength}`}</small>
      {this.props.message}
    </div>;
  }
}

// const Email = props => (
//   <div>
//     Enter email
//     <input type="text" value={props.value} onChange={props.onChange} />
//     <small>{`max ${EMAIL_MAX_LENGTH}`}</small>
//     {props.message}
//   </div>
// );

const Title = props => (
  <div>
    Enter title
    <input type="text" value={props.value} onChange={props.onChange} />
    <small>{`max ${TITLE_MAX_LENGTH}`}</small>
    {props.message}
  </div>
);

const Description = props => (
  <div>
    Enter descrition
    <input type="text" value={props.value} onChange={props.onChange} />
    <small>{`max ${DESCRIPTION_MAX_LENGTH}`}</small>
    {props.message}
  </div>
);

const App = props => (
  <div>
    <h2>my validation</h2>
    <InputComponent
      type="email"
      value={props.value}
      onChange={props.changeEmail}
      currentState={props.savingState}
      message={props.validationMessages.emailMessage}
      maxLength={EMAIL_MAX_LENGTH}
    />
    <Title
      value={props.title}
      onChange={props.changeTitle}
      message={props.validationMessages.titleMessage}
    />
    <Description
      value={props.description}
      onChange={props.changeDescription}
      message={props.validationMessages.descriptionMessage}
    />
    <button onClick={()=>{props.sendData(props.savingState)}}>send data</button>
    {props.savingState === FETCHING_STATUSES.SAVING && (
      <strong> saving... </strong>
    )}
  </div>
);

const mapStateToProps = ({
  title,
  email,
  description,
  validationMessages,
  savingState
}) => {
  return {
    title,
    email,
    description,
    validationMessages,
    savingState
  };
};

const mapDispatchToProps = {
  changeEmail,
  changeTitle,
  sendData,
  changeDescription
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
