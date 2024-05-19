import React, { useEffect } from 'react';
import './style.scss';
import banner from '../../../assets/images/login_image.png';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../../store/actions/AuthActions';
import { Loader } from '../../../components';
import storageService from '../../../utils/storage.service';
import { AuthKeys } from '../../../constant';
import { toast } from 'react-toastify';

const ChangePasswordFirstLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, data = {}, error = null, navigatePath = null } = useSelector((state) => state.auth);
  const [payload, setPayload] = React.useState({
    teacherName: 'admin',
    password: '',
    confirmPassword: '',
  });

  const handleChangePassword = () => {
    if (payload.password !== payload.confirmPassword) {
      toast.error('Mật khẩu không khớp');
      return;
    }
    dispatch(AuthActions.changePasswordRequest(payload));
  };

  useEffect(() => {
    setPayload(
      {
        ...payload,
        teacherName: storageService.getObject(AuthKeys.CURRENT_USER)?.teacherName,
      },
    );
  }, []);

  useEffect(() => {
    if (navigatePath && navigatePath !== '/change-password') {
      navigate(navigatePath, { replace: true });
    }
  }, [navigatePath]);

  return (
    <Loader active={loading}>
      <div className={'login-page'}>
        <div className={'left'}>
          <img src={banner} alt={'banner'} />
        </div>
        <div className={'right'}>
          <div className={'form'}>
            <p>Chào mừng <b>{payload.teacherName}</b>, bạn cần thay đổi mật khẩu cho lần đầu tiên đăng nhập!</p>
            <Input label={'Mật khẩu'}
                   type={'password'}
                   value={payload.password}
                   onChange={(value) => setPayload({ ...payload, password: value })}
                   customStyle={{
                     marginBottom: '30px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Xác nhận mật khẩu'}
                   type={'password'}
                   value={payload.confirmPassword}
                   onChange={(value) => setPayload({ ...payload, confirmPassword: value })}
                   customStyle={{
                     marginBottom: '30px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <div className={'login-btn'}>
              <p style={{ color: 'red' }}>{error}</p>
              <Button title={'Thay đổi mật khẩu'} onClick={handleChangePassword} />
            </div>
            <div className={'other-link'}>
              <Link to={'/forgot-password'}>Quên mật khẩu?</Link>
              <Link to={'/register'}>Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default ChangePasswordFirstLogin;
