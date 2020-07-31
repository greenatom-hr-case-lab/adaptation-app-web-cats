import React from 'react';
import { Redirect } from 'react-router';

const NotHR = () => {
  return (
    // <Redirect to="/plan/list" />
    <div className = "align-content center">
      <h1>Недостаточно прав, котик :(</h1>
      <img src="https://pbs.twimg.com/media/C4Q5dlbWEAALTby?format=jpg"/>
    </div>
  );
};

export default NotHR;