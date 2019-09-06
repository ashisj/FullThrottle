import React from 'react';

function Error({error}) {
  if(error){
    return (
      <div className="app-modal">
        <div className="app-modal-content">
          <div className="row h-100 m-auto">
            Some error occoured. Please reload again !!!
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Error;
