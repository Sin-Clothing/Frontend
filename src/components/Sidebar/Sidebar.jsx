import React, { useState } from 'react';

import './Sidebar.css';

export const Sidebar = (props) => {
  // const [sidebar, setSidebar] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(-1);

  const { categories } = props;

  // const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sidebar">
      <ul>
        {categories.map((cat) => (
          <li key={`sidebar-item-${cat.categoryId}`}>
            <button type="button" onClick={() => { setCurrentCategory(cat.categoryId); props.filter(cat.categoryId); } }>{currentCategory === cat.categoryId ? '> ' : ''}{cat.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
