import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
<footer className="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://www.linkedin.com/in/ihsan-cetinn/">İhsan Çetin</a></p>
  
  
	<p> <a href="https://github.com/ihsancetinn/"><FaGithub />  GitHub</a></p>
</footer>

    </>
  )
}

export default React.memo(Footer);

