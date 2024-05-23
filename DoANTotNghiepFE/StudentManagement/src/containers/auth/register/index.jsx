import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import * as AuthActions from '../../../store/actions/AuthActions';
import { Loader } from '../../../components';
import banner from '../../../assets/images/login_image.png';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import Pulldown from '../../../hook/pulldown';
import * as CourseActions from '../../../store/actions/CourseActions';
import * as ClassActions from '../../../store/actions/ClassActions';
import Space from '../../../hook/space/space';
import Title from '../../../hook/title/Title';
import { MDBFile } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, data = {}, error = null, navigatePathRegister = null } = useSelector((state) => state.auth);
  const [payload, setPayload] = React.useState({
    username: '',
    studentName: '',
    email: '',
    password: '',
    confirmPassword: '',
    idCourse: 0,
    idClass: 0,
    studentImage: '',
  });

  const [lstCourse, setLstCourse] = React.useState([]);
  const [course, setCourse] = React.useState(null);
  const [clazz, setClass] = React.useState(null);
  const [lstClass, setLstClass] = React.useState([]);
  const { courses = [] } = useSelector((state) => state.course);
  const { classes = [] } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(CourseActions.getListCourseRequest({}));
  }, []);

  useEffect(() => {
    if (courses) {
      let arr = courses.map((item) => {
        return { label: item.nameCourse, value: item.id };
      });
      setLstCourse(arr);
    }
  }, [courses]);

  // Get list class by course
  useEffect(() => {
    if (course) {
      dispatch(ClassActions.getListClassByCourseRequest({ courseId: course.value }));
      setClass(null);
    }
  }, [course]);

  useEffect(() => {
    if (classes) {
      setLstClass([...classes.map((item) => {
        return { label: item.nameClass, value: item.id };
      })]);
    }
  }, [classes]);

  const handleRegister = () => {
    if (payload.password !== payload.confirmPassword) {
      toast.error('Mật khẩu không trùng khớp');
      return;
    }

    if (payload.username === ''
      || payload.studentName === ''
      || payload.email === ''
      || payload.password === ''
      || payload.confirmPassword === ''
      || payload.idCourse === 0
      || payload.idClass === 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (payload.studentImage === '') {
      toast.error('Vui lòng chọn hình ảnh');
      return;
    }

    dispatch(AuthActions.registerRequest(payload));
  };

  useEffect(() => {
    if (navigatePathRegister) {
      window.location.href = navigatePathRegister;
    }
  }, [navigatePathRegister]);

  return (
    <Loader active={loading}>
      <div className={'login-page'}>
        <div className={'left'}>
          <img src={banner} alt={'banner'} />
        </div>
        <div className={'right'}>
          <div className={'form'}>
            <div style={{ textAlign: 'center' }}>
              <Title text={'Đăng ký'} />
              <Space height={'10px'} />
            </div>
            <Input label={'Tên đăng nhập'}
                   type={'text'}
                   value={payload.username}
                   onChange={(value) => setPayload({ ...payload, username: value })}
                   customStyle={{
                     marginBottom: '16px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Họ tên'}
                   type={'text'}
                   value={payload.studentName}
                   onChange={(value) => setPayload({ ...payload, studentName: value })}
                   customStyle={{
                     marginBottom: '16px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Mật khẩu'}
                   type={'password'}
                   value={payload.password}
                   onChange={(value) => setPayload({ ...payload, password: value })}
                   customStyle={{
                     marginBottom: '16px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Nhập lại mật khẩu'}
                   type={'password'}
                   value={payload.confirmPassword}
                   onChange={(value) => setPayload({ ...payload, confirmPassword: value })}
                   customStyle={{
                     marginBottom: '16px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <Input label={'Email'}
                   type={'email'}
                   value={payload.email}
                   onChange={(value) => setPayload({ ...payload, email: value })}
                   customStyle={{
                     marginBottom: '16px',
                     width: '100%',
                     padding: '10px',
                     backgroundColor: '#f5f5f5',
                   }}
            />
            <div className={'select-box'}>
              <Pulldown items={lstCourse}
                        label={'Chọn khóa'}
                        value={course}
                        ignores={[]}
                        setSelected={(value) => {
                          setCourse(value);
                          setPayload({ ...payload, idCourse: value.value });
                        }}
                        isRequired={false}
                        error={false}
                        customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />
            </div>
            <Space height={'16px'} />
            <div className={'select-box'}>
              <Pulldown items={lstClass}
                        label={'Chọn lớp'}
                        value={clazz}
                        ignores={[]}
                        setSelected={(value) => {
                          setClass(value);
                          setPayload({ ...payload, idClass: value.value });
                        }}
                        isRequired={false}
                        error={false}
                        customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />
            </div>

            <Space height={'8px'} />
            <MDBFile label="Hình ảnh" id="customFile"
                     onChange={(e) => setPayload({ ...payload, studentImage: e.target.files[0] })} />
            <Space height={'16px'} />

            <div className={'login-btn'}>
              <Button title={'Đăng ký'} onClick={handleRegister} />
            </div>
            <div className={'other-link'}>
              <Link to={'/forgot-password'}>Quên mật khẩu?</Link>
              <Link to={'/login'}>Đăng nhập</Link>
            </div>
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Register;