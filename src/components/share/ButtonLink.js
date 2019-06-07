import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonLink = (props) => {
  return <Button button component="a" {...props} />;
};

export default ButtonLink;