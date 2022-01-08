import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ButtonComp({url, disabled, label, data}) {
  const naviagte = useNavigate();

  const handleClick = () => {
    if (data) {
      localStorage.setItem('audio', JSON.stringify(data))
    }
    if (url) {
      naviagte(url);
    }
  }

  return(
    <Button  onClick={handleClick} disabled={disabled}>
        {label}
    </Button>
  )
}