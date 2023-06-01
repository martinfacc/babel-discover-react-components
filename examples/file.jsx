import React from "react";

const NoArrowFunctionComponent = () => "Hello World";

const NoArrowFunctionComponent2 = () => {
  const someVariable = "Hello World";
  return someVariable;
};

const ArrowFunctionComponent = () => <div>Hello World</div>;

const ArrowFunctionComponentWithReturn = () => {
  return <div>Hello World</div>;
};

const ArrowFunctionComponentWithProps = (props) => {
  const { name } = props;
  return <div>{name}</div>;
};

const ArrowFunctionComponentWithProps2 = ({ name }) => {
  return <div>{name}</div>;
};

const ArrowFunctionComponent2 = ({ name }) => {
  return <ArrowFunctionComponentWithProps name={name} />;
};

const NotArrowFunctionComponent = () => {
  const someVariable = "Hello World";
  return someVariable;
};

function FunctionComponent() {
  return <div>Hello World</div>;
}

function FunctionComponent2() {
  const someVariable = "Hello World";
  return <div>{someVariable}</div>;
}

function FunctionComponent3(props) {
  const { name } = props;
  return <div>{name}</div>;
}

function FunctionComponent4(props) {
  const { name } = props;
  return <FunctionComponent3 name={name} />;
}

function NotAComponent2() {
  const someVariable = "Hello World";
  return someVariable;
}

function NotAComponent() {
  return "Hello World";
}

class ClassComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

class ClassComponent2 extends React.Component {
  render() {
    const someVariable = "Hello World";
    return <div>{someVariable}</div>;
  }
}

class ClassComponent3 extends React.Component {
  render() {
    const { name } = this.props;
    return <div>{name}</div>;
  }
}

class ClassComponent4 extends React.Component {
  render() {
    const { name } = this.props;
    return <ClassComponent3 name={name} />;
  }
}

class NotAClassComponent {
  render() {
    return "Hello World";
  }
}

class NotAClassComponent2 {
  render() {
    const someVariable = "Hello World";
    return someVariable;
  }
}
