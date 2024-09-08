import React, { useState } from 'react'
import './index.scss'

const DropDown = (props) => {
  const { title, data, RenderComponent, onClick, ...rest} = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handleToggle}>
        { isOpen?
                 <i class="fa-solid fa-circle-chevron-down fa-lg icon"></i>:
                 <i class="fa-solid fa-circle-chevron-right fa-lg icon"></i>
        }
        {title}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {
            data.length === 0 && <div className='no-data'>No data</div>
          }
          {data.length>0 && data.map((item, index) => (
            <RenderComponent key={index} item={item} {...rest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown