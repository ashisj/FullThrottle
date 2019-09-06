import React from 'react';

function Result({result}) {
  if(Object.keys(result).length){
    return (
      <h5>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            Monthly Payment : {result.monthlyPayment.amount}
          </div>
          <div className="col-sm-12 col-md-6">
            Rate of Interest : {result.interestRate}
          </div>
        </div>
      </h5>
    );
  } else {
    return null;
  }
}

export default Result;
