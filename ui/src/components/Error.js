import React from 'react';


const Error = ({message}) => {
  return (
    <div style={{"padding":"15px", "fontSize":"20px",   "color":"red"}}>Error:{message}</div>
  )
}

export default Error