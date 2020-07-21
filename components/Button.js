import { useState } from 'react';

const Button = () => {
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setComplete(!complete);
  };
  return <button onClick={handleComplete}>{complete ? 'O' : 'X'}</button>;
};

export default Button;
