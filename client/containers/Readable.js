import React from 'react';

import Header from 'Components/header/Header';
import Posts from './Posts';

const Readable = props => (
  <div className="container is-fluid">
    <Header {...props} />
    <Posts {...props} />
  </div>
);

export default Readable;
