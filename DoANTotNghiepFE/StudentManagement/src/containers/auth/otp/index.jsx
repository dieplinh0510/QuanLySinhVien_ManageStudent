import React, { useEffect } from 'react';
import './style.scss';
import Button from '../../../hook/button';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as AuthActions from '../../../store/actions/AuthActions';
import { MDBModal, MDBModalDialog } from 'mdb-react-ui-kit';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import Title from '../../../hook/title/Title';
import Space from '../../../hook/space/space';
import img from '../../../assets/images/forgot_password.jpg';

const OTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState(['', '', '', '']);
  const [timer, setTimer] = React.useState(60);
  const inputRefs = React.useRef([]);

  const {
    loading = false,
    navigatePath = null,
    infoForgotPassword = null,
  } = useSelector((state) => state.auth);


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.includes('')) {
      toast.error('Bạn chưa nhập đủ mã OTP');
      return;
    }

    dispatch(AuthActions.otpRequest({ otp: otp.join('') }));
  };

  useEffect(() => {
    if (navigatePath) {
      navigate(navigatePath, { replace: true });
    }
  }, [navigatePath]);

  // Create a countdown timer
  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const countdown = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer]);

  return (
    <div className="otp-container">
      <div className={'left'}>
        <img src={img} alt={'forgot-password'} />
      </div>

      <div className={'right'}>
        <Title text={'Nhập mã OTP'} />

        <Space height={'10px'} />

        {infoForgotPassword && <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#000',
          width: '50%',
          margin: '0 auto',
          marginBottom: '10px',
        }}>
          Xin chào <b>{infoForgotPassword.name}</b>. Thông tin OTP đã được gửi tới
          email <b>{infoForgotPassword.email}</b>. Vui lòng kiểm tra email và nhập mã OTP để tiếp tục.
        </p>}

        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#000',
          width: '50%',
          margin: '0 auto',
          marginBottom: '10px',
        }}>
          Mã OTP sẽ hết hạn sau <b>{timer}</b> giây.
        </p>


        <div className="input-field">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={index > 0 && otp[index - 1] === ''}
            />
          ))}
        </div>

        <Space height={'20px'} />

        <Button
          title={'Gửi'}
          onClick={() => {
            handleSubmit();
          }}
          disabled={timer === 0}
        />

        {
          timer === 0 && (
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#000',
              width: '50%',
              margin: '0 auto',
              marginBottom: '10px',
              marginTop: '10px',
            }}>
              Bạn chưa nhận được mã OTP? <a href="#" onClick={() => {
              dispatch(AuthActions.forgotPasswordRequest({ username: infoForgotPassword?.username }));
              setTimer(60)
            }}>Gửi lại</a>
            </p>
          )
        }
      </div>

      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true}>
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}>
            </LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default OTP;
