import React from 'react';
import './Loading.scss';

function Loading() {
  let warning = false;
  setTimeout(() => {
    warning = true;
  }, 5000);
  return (
    <div className='container'>
      <div className='box'>
        <img
          className='appointment__status-image'
          src='images/status.png'
          alt='Loading'
          style={{ width: '100px' }}
        />
        <p> Loading</p>
      </div>

      {warning && <p>Please Check Your Internet</p>}
    </div>
  );
}

export default Loading;
