import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './Sidebar.css';

export const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => props.getAll()}>Alle Artikel</li>
        <li onClick={() => props.filter("pulli")}>Pullis</li>
        <li onClick={() => props.filter("jean")}>Jeans</li>
      </ul>
    </div>
  );
};

export default Sidebar;
