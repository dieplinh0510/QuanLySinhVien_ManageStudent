import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import React from 'react';

const Dropdown = ({ items, value, setSelected, ignores, label, customStyle, error }) => {
  return <div style={{ ...customStyle }}>
    <CDropdown style={{ display: 'block', border: error ? '1px solid red' : '1px solid #F5F5F5' }}>
      <CDropdownToggle href="#" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        textAlign: 'left',
        background: '#F5F5F5',
        color: 'black',
        border: '1px solid #F5F5F5',
      }}>{value ? value.value : label}</CDropdownToggle>
      <CDropdownMenu style={{ width: '100%', border: '1px solid #F5F5F5', height: '200px', overflowX: 'auto' }}>
        {items
          .filter(item => ignores.filter(i => i.value !== item.value).length === 0) //!ignores.includes(item)
          .map((item, index) => {
            return <CDropdownItem style={{ width: '100%' }} onClick={
              () => {
                setSelected(item);
              }
            } key={index} href="#">{item.label}</CDropdownItem>;
          })}
      </CDropdownMenu>
    </CDropdown>
  </div>;
};

export default Dropdown;