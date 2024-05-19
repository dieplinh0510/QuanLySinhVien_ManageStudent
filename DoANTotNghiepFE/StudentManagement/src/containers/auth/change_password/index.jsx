import React, { useEffect } from 'react';
import './style.scss';
import { MDBModal, MDBModalDialog } from 'mdb-react-ui-kit';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from '../../../assets/images/forgot_password.jpg';
import Title from '../../../hook/title/Title';
import Space from '../../../hook/space/space';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import * as AuthActions from '../../../store/actions/AuthActions';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    navigatePathChangePassword = null,
    otp = null,
  } = useSelector((state) => state.auth);
  const [payload, setPayload] = React.useState({
    password: '',
    confirmPassword: '',
  });


  useEffect(() => {
    if (navigatePathChangePassword) {
      navigate(navigatePathChangePassword, { replace: true });
    }
  }, [navigatePathChangePassword]);


  const handleChangePassword = () => {
    if (!payload.password) {
      toast.info('Vui lòng nhập mật khẩu');
      return;
    }

    if (!payload.confirmPassword) {
      toast.info('Vui lòng nhập lại mật khẩu');
      return;
    }

    if (payload.password !== payload.confirmPassword) {
      toast.info('Mật khẩu không khớp');
      return;
    }

    dispatch(AuthActions.changePasswordOtpRequest({ ...payload, otp }));
  };

  return (
    <div className="change-password-container">

      <div className="left">
        <img src={img} alt={'forgot-password'} />
      </div>

      <div className="right">
        <div className={'form'}>
          <Title text={'Đổi mật khẩu'} />
          <Space height={'10px'} />
          <Input label={'Mật khẩu mới'}
                 type={'password'}
                 customStyle={{
                   marginBottom: '16px',
                   width: '100%',
                   padding: '10px',
                   backgroundColor: '#f5f5f5',
                 }}
                 onChange={(value) => {
                   setPayload({ ...payload, password: value });
                 }}
          />

          <Input label={'Nhập lại mật khẩu mới'}
                 type={'password'}
                 customStyle={{
                   marginBottom: '16px',
                   width: '100%',
                   padding: '10px',
                   backgroundColor: '#f5f5f5',
                 }}
                 onChange={(value) => {
                   setPayload({ ...payload, confirmPassword: value });
                 }}
                 onKeyPress={(e) => {
                   if (e.key === 'Enter') {
                     handleChangePassword();
                   }
                 }}
          />
          <Space height={'10px'} />
          <Button title={'Đổi mật khẩu'}
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

export default ChangePassword;