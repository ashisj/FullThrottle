import React from 'react';

function Loader({loading}) {
  if(loading){
    return (
      <div className="app-modal">
        <div className="app-modal-content">
          <div className="row h-100">
            <div className="spinner-grow m-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div> 
    );
  } else {
    return null;
  }
}

export default Loader;
