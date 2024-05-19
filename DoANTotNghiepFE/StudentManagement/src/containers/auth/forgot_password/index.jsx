import React, { useEffect } from 'react';
import './style.scss';
import img from '../../../assets/images/forgot_password.jpg';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import Title from '../../../hook/title/Title';
import Space from '../../../hook/space/space';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MDBModal, MDBModalDialog } from 'mdb-react-ui-kit';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import * as AuthActions from '../../../store/actions/AuthActions';

const ForgotPassword = () => {
  const [username, setUsername] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading = false,
    navigatePathForgotPassword = null,
  } = useSelector((state) => state.auth);

  const handleChangePassword = () => {
    if (!username) {
      toast.info('Vui lòng nhập tên đăng nhập');
      return;
    }

    dispatch(AuthActions.forgotPasswordRequest({ username }));
  };


  useEffect(() => {
    if (navigatePathForgotPassword) {
      navigate(navigatePathForgotPassword, { replace: true });
    }
  }, [navigatePathForgotPassword]);

  return (
    <div className={'forgot-password-container'}>
      <div className={'left'}>
        <img src={img} alt={'forgot-password'} />
      </div>
      <div className={'right'}>
        <div className={'form'}>
          <Title text={'Quên mật khẩu'} />
          <Space height={'10px'} />
          <Input label={'Tên đăng nhập'}
                 type={'text'}
                 customStyle={{
                   marginBottom: '16px',
                   width: '100%',
                   padding: '10px',
                   backgroundColor: '#f5f5f5',
                 }}
                 onChange={(value) => {
                   setUsername(value);
                 }}
                 onKeyPress={(e) => {
                   if (e.key === 'Enter') {
                     handleChangePassword();
                   }
                 }}
          />

          <Space height={'10px'} />

          <Button
            title={'Gửi yêu cầu'}
            onClick={() => {
              handleChangePassword();
            }}
          />

        </div>
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

export default ForgotPassword;