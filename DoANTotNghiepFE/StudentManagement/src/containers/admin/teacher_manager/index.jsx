import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import './style.scss';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as TeacherActions from '../../../store/actions/TeacherActions';
import Space from '../../../hook/space/space';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import { Pattern } from '../../../constant';
import Pagination from '../../../components/paging';
import * as UploadActions from '../../../store/actions/UploadActions';

const TeacherManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers = [], semesters = [], loading = false, paging = null } = useSelector((state) => state.teacher);
  const [searchPayload, setSearchPayload] = React.useState({
    teacherName: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const [showCreate, setShowCreate] = React.useState(false);
  const [payloadCreate, setPayloadCreate] = React.useState({
    teacherName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [showEdit, setShowEdit] = React.useState(false);
  const [payloadEdit, setPayloadEdit] = React.useState(null);


  useEffect(() => {
    dispatch(TeacherActions.getAllTeacherRequest(searchPayload));
  }, []);


  const handleCreateTeacher = () => {
    if (payloadCreate?.teacherName === '') {
      toast.error('Tên giảng viên không được để trống');
      return;
    }
    if (payloadCreate?.email === '') {
      toast.error('Email không được để trống');
      return;
    }
    // validate email
    if (!Pattern.EMAIL.test(payloadCreate?.email)) {
      toast.error('Email không đúng định dạng');
      return;
    }
    if (payloadCreate?.username === '') {
      toast.error('Tên đăng nhập không được để trống');
      return;
    }
    if (payloadCreate?.password === '') {
      toast.error('Mật khẩu không được để trống');
      return;
    }
    if (payloadCreate?.password !== payloadCreate?.confirmPassword) {
      toast.error('Mật khẩu không trùng khớp');
      return;
    }
    dispatch(TeacherActions.createTeacherRequest({...payloadCreate, searchPayload}));
    handleCancelCreate();
  };

  const handleCancelCreate = () => {
    setPayloadCreate({
      teacherCode: '',
      teacherName: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    });
    setShowCreate(false);
  };

  const handleEditTeacher = () => {
    if (payloadEdit?.teacherCode === '') {
      toast.error('Mã giảng viên không được để trống');
      return;
    }
    if (payloadEdit?.teacherName === '') {
      toast.error('Tên giảng viên không được để trống');
      return;
    }
    if (payloadEdit?.email === '') {
      toast.error('Email không được để trống');
      return;
    }
    // validate email
    if (!Pattern.EMAIL.test(payloadEdit?.email)) {
      toast.error('Email không đúng định dạng');
      return;
    }
    if (payloadEdit?.username === '') {
      toast.error('Tên đăng nhập không được để trống');
      return;
    }

    if (payloadEdit?.changePassword) {
      if (payloadEdit?.password === '') {
        toast.error('Mật khẩu không được để trống');
        return;
      }
      if (payloadEdit?.password !== payloadEdit?.confirmPassword) {
        toast.error('Mật khẩu không trùng khớp');
        return;
      }
    }

    dispatch(TeacherActions.updateTeacherRequest({...payloadEdit, searchPayload}));
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setPayloadEdit(null);
    setShowEdit(false);
  };


  const handlePageChange = (pageNumber) => {
    dispatch(TeacherActions.getAllTeacherRequest({
      ...searchPayload,
      pageIndex: pageNumber,
    }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber })
  };

  return (
    <div className={'subject-manager-page'}>
      <div className={'subject-input-box'}>
        <p>Tên giảng viên: </p>
        <Input
          value={searchPayload.teacherName}
          onChange={(value) => setSearchPayload({ ...searchPayload, teacherName: value })}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              dispatch(TeacherActions.getAllTeacherRequest(payloadCreate));
            }
          }}
          label=""
          isRequired={false}
          placeHolder="Nhập tên giảng viên"
          errorMessage=""
          error={false}
          isDisable={false}
          customStyle={{
            minWidth: '300px',
            backgroundColor: '#f5f5f5',
          }}
        />

        <Space width={20} />

        <Button title={'Tìm kiếm'} onClick={() => {
          dispatch(TeacherActions.getAllTeacherRequest(searchPayload));
        }} customStyle={{ width: '120px' }} />
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách giảng viên:</p>
        <Button title={'Thêm giảng viên'} onClick={() => setShowCreate(true)} />
      </div>

      {/* Table teacher */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã giảng viên</th>
              <th>Tên giảng viên</th>
              <th>Email</th>
              <th>Tên đăng nhập</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {teachers && teachers.length > 0 && teachers.map((item, index) => (
              <tr style={{ cursor: 'pointer' }} key={index}>
                <td>{index + 1}</td>
                <td>{item?.code}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.isActive ? 'Đang công tác' : 'Đã nghỉ công tác'}</td>
                <td style={{ width: '120px' }}>
                  <Button title={'Sửa'}
                          onClick={() => {
                            setPayloadEdit({...item, teacherName: item.name, teacherCode: item.code});
                            setShowEdit(true);
                          }}
                          width={'50px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Space height={2} />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        {/* Paging */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          {
            paging && (
              <Pagination
                totalPages={paging?.totalPages}
                currentPage={paging?.pageIndex + 1}
                onPageChange={handlePageChange}
              />
            )
          }
        </div>
      </div>


      {/* Modal show create */}
      <MDBModal open={showCreate} tabIndex="-1" onClose={() => setShowCreate(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm giảng viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowCreate(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>

                <Input value={payloadCreate?.teacherName}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, teacherName: value })}
                       label="Tên giảng viên"
                       isRequired={true}
                       placeHolder="Nhập họ tên giảng viên"
                       errorMessage="Tên giảng viên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.email}
                       type={'email'}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, email: value })}
                       label="Email"
                       isRequired={true}
                       placeHolder="Nhập email"
                       errorMessage="Email không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.username}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, username: value })}
                       label="Tên đăng nhập"
                       isRequired={true}
                       placeHolder="Nhập tên đăng nhập"
                       errorMessage="Tên đăng nhập không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.password}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, password: value })}
                       label="Mật khẩu"
                       isRequired={true}
                       placeHolder="Nhập mật khẩu"
                       errorMessage="Mật khẩu không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.confirmPassword}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, confirmPassword: value })}
                       label="Nhập lại mật khẩu"
                       isRequired={true}
                       placeHolder="Nhập lại mật khẩu"
                       errorMessage="Mật khẩu không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Thêm'}
                          onClick={() => handleCreateTeacher()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Huỷ'}
                          onClick={() => handleCancelCreate()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                </div>

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/* Modal show edit */}
      <MDBModal open={showEdit} tabIndex="-1" onClose={() => setShowEdit(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Sửa giảng viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEdit(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadEdit?.teacherCode}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, teacherCode: value })}
                       label="Mã giảng viên"
                       isRequired={true}
                       placeHolder="Nhập mã giảng viên"
                       errorMessage="Mã giảng viên không được để trống"
                       error={false}
                       isDisable={true}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.teacherName}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, teacherName: value })}
                       label="Tên giảng viên"
                       isRequired={true}
                       placeHolder="Nhập họ tên giảng viên"
                       errorMessage="Tên giảng viên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.email}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, email: value })}
                       label="Email"
                       isRequired={true}
                       placeHolder="Nhập email"
                       errorMessage="Email không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />
                <Space height={20} />

                <Input value={payloadEdit?.username}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, username: value })}
                       label="Tên đăng nhập"
                       isRequired={true}
                       placeHolder="Nhập tên đăng nhập"
                       errorMessage="Tên đăng nhập không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />
                <div>
                  Đang công tác <input type={'checkbox'} checked={payloadEdit?.isActive === true}
                                       onChange={(e) => setPayloadEdit({
                                         ...payloadEdit,
                                         isActive: e.target.checked,
                                       })} />
                </div>

                <Space height={20} />
                <div>
                  Sửa mật khẩu <input type={'checkbox'} checked={payloadEdit?.changePassword === true}
                                      onChange={(e) => setPayloadEdit({
                                        ...payloadEdit,
                                        changePassword: e.target.checked,
                                      })} />
                </div>

                {payloadEdit?.changePassword === true && (<><Space height={20} />
                  <Input value={payloadEdit?.password}
                         onChange={(value) => setPayloadEdit({ ...payloadEdit, password: value })}
                         label="Mật khẩu"
                         isRequired={true}
                         placeHolder="Nhập mật khẩu"
                         errorMessage="Mật khẩu không được để trống"
                         error={false}
                         isDisable={false}
                         customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                  />

                  <Space height={20} />

                  <Input value={payloadEdit?.confirmPassword}
                         onChange={(value) => setPayloadEdit({ ...payloadEdit, confirmPassword: value })}
                         label="Nhập lại mật khẩu"
                         isRequired={true}
                         placeHolder="Nhập lại mật khẩu"
                         errorMessage="Mật khẩu không được để trống"
                         error={false}
                         isDisable={false}
                         customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                  />
                </>)}

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Sửa'}
                          onClick={() => handleEditTeacher()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Huỷ'}
                          onClick={() => handleCancelEdit()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                </div>

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

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

export default TeacherManager;