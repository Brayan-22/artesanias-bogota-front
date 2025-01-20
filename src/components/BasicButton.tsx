import React from 'react'
import { Button } from 'react-bootstrap';

type BasicButtonProps = {
    text: String;
    color: String;
};

const BasicButton: React.FC<BasicButtonProps> = ({text, color}) => {
  return (
    <Button  size='sm'  variant='danger'>
      {text}
    </Button>
  )
}

export default BasicButton