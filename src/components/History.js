import React from 'react';

function History({history,clickFromHistory}) {
  const historyData = history.map((data,index) => {
    return (
      <div className = "row" key={index} onClick={() => clickFromHistory(data.amount,data.duration)}>
        <div className = "col-6">{data.amount}</div>
        <div className = "col-6">{data.duration}</div>
      </div>
    )
  })
  return (
    <>
      <div className="sidenav">
        <div className = "row">
          <div className = "col-6"><b>Amount</b></div>
          <div className = "col-6"><b>Duration</b></div>
        </div>
        {historyData}
      </div>
    </>
  );
}

export default History;
