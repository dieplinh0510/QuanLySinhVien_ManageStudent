import React from 'react';
import './style.scss';
import banner from '../../assets/images/login_image.png';
import Input from '../../hook/input';
import Button from '../../hook/button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../store/actions/AuthActions';
import { Loader } from '../../components';

const Login = () => {
  const dispatch = useDispatch();
  const {loading= false, data =  {}, error = null} = useSelector((state) => state.auth);
  const [payload, setPayload] = React.useState({
    username: 'huannd0101',
    password: '123',
  });

  const handleLogin = () => {
    dispatch(AuthActions.loginRequest(payload))
  }

  return (
    <Loader active={loading} >
      <div className={'login-page'}>
        <div className={'left'}>
          <img src={banner} alt={'banner'} />
        </div>
        <div className={'right'}>
          <div className={'form'}>
            <Input label={'Username'}
                   type={'text'}
                   value={payload.username}
                   onChange={(value) => setPayload({...payload, username: value})}
                   customStyle={{
                      marginBottom: '30px',
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Password'}
                   type={'password'}
                   value={payload.password}
                   onChange={(value) => setPayload({...payload, password: value})}
                    customStyle={{
                        marginBottom: '30px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#f5f5f5',
                    }}
            />
            <div className={'login-btn'} >
              <Button title={'Đăng nhập'} onClick={handleLogin} />
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

export default Login;