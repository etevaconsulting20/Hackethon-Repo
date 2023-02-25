import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const VisiblityWrapper = ({ children, setPasswordType }) => {
  const [passIcons, setPassIcons] = useState({ visibleIcon: false, visibleOffIcon: true, selectedIcon: 'VISIBLEOFF' })
  let newChild = { ...children }
  passIcons.selectedIcon === 'VISIBLEOFF' ? setPasswordType('password') : setPasswordType('text');
  return (
    <div style={{ width: 'fit-content', position: 'relative' }}>
      {passIcons.selectedIcon === "VISIBLE" &&
        <MdVisibility size={24}
          onClick={() => setPassIcons({ ...passIcons, selectedIcon: 'VISIBLEOFF' })}
          className="login-visible" color={'#455C6C'} />
      }
      {passIcons.selectedIcon === "VISIBLEOFF" &&
        <MdVisibilityOff size={24}
          onClick={() => setPassIcons({ ...passIcons, selectedIcon: 'VISIBLE' })}
          className="login-visible-off" color={'#455C6C'} />
      }
      {newChild}
    </div>
  )

}

export default VisiblityWrapper;