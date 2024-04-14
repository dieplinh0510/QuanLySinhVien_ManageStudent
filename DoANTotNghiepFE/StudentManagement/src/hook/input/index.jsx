import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';

const Input = ({ value, onChange, label, customStyle, isRequired, placeHolder, errorMessage, type, error, isDisable }) => {
  const [isFocus, setIsFocus] = useState(false);

  return <div>
    <MDBInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      label={isDisable ? '' : label + (isRequired && isFocus ? '\u00a0*' : '\u00a0\u00a0')}
      placeholder={placeHolder}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      type={type ? type : 'text'}
      disabled={isDisable}
      style={{
        borderColor: error ? 'red' : '',
        width: '100%',
        ...customStyle,
      }}
    />
    {error ? <div style={{ color: 'red', fontSize: '14px' }}>{'\u00a0\u00a0\u00a0'}{errorMessage}</div> : ''}
  </div>;
};

export default Input;