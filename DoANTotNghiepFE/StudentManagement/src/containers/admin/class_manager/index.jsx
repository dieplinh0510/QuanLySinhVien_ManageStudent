import React, { useEffect, useState } from 'react';
import './style.scss';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as ClassActions from '../../../store/actions/ClassActions';
import * as SubjectActions from '../../../store/actions/SubjectActions';
import * as StudentActions from '../../../store/actions/StudentActions';
import Space from '../../../hook/space/space';
import Pulldown from '../../../hook/pulldown';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

let statusList = [
  { value: -1, label: 'Chưa mở đăng ký' },
  { value: 0, label: 'Chưa bắt đầu' },
  { value: 1, label: 'Đã bắt đầu' },
  { value: 2, label: 'Đã kết thúc' },
];

const ClassManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subject = null, semesters = [], loading = false } = useSelector((state) => state.subject);
  const { classes = [], teachers = [] } = useSelector((state) => state.class);
  const { studentDetail = [] } = useSelector((state) => state.student);
  const [subjectId, setSubjectId] = useState(null);

  const [searchPayload, setSearchPayload] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const [payloadCreate, setPayloadCreate] = React.useState(null);
  const [showCreateStudent, setShowCreateStudent] = React.useState(false);
  const [payloadCreateStudent, setPayloadCreateStudent] = React.useState(null);
  const [showEdit, setShowEdit] = React.useState(false);
  const [payloadEdit, setPayloadEdit] = React.useState(null);
  const [statusListEdit, setStatusListEdit] = React.useState(statusList);


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('subjectId');
    setSubjectId(id);

    dispatch(ClassActions.getListTeacherRequest());
    dispatch(SubjectActions.getListSemesterRequest());
  }, []);

  useEffect(() => {
    if (subjectId === null) {
      return;
    }

    dispatch(ClassActions.getListClassInSubjectRequest({ subjectId }));
    dispatch(SubjectActions.getSubjectDetailByIdRequest({ id: subjectId }));


  }, [subjectId]);

  const handleOpenCreate = () => {
    setShowCreate(true);
    setPayloadCreate({
      subjectId: subjectId,
      teacher: '',
      classroomCode: '',
      subjectName: subject?.subjectName,
      quantityStudent: '',
      idUser: '',
    });
  };

  const handleCreateClassroom = () => {
    // validate
    if (payloadCreate?.classroomCode === '') {
      toast.error('Mã lớp không được để trống');
      return;
    }
    if (payloadCreate?.quantityStudent === '') {
      toast.error('Số lượng học sinh không được để trống');
      return;
    }
    if (payloadCreate?.idUser === '') {
      toast.error('Giảng viên không được để trống');
      return;
    }

    dispatch(ClassActions.createClassInSubjectRequest({
      ...payloadCreate,
      idUser: payloadCreate.idUser.value,
    }));
    setShowCreate(false);
  };

  const handleCancelCreate = () => {
    setShowCreate(false);
  };

  const findTeacher = (id) => {
    return teachers.find(item => item.value === id);
  };

  const handleOpenEdit = (item) => {
    setShowEdit(true);
    setPayloadEdit({
      id: item.idClassroom,
      subjectId: subjectId,
      teacher: item.teacher,
      classroomCode: item.classroomCode,
      subjectName: item.subjectName,
      quantityStudent: item.quantityStudent,
      idUser: findTeacher(item.idUser),
      status: item.status,
    });
    if (item.status === -1) {
      setStatusListEdit(statusList.filter(item => item.value === -1 || item.value === 0));
    }
    if (item.status === 0) {
      setStatusListEdit(statusList.filter(item => item.value === 0 || item.value === 1));
    }
    if (item.status === 1) {
      setStatusListEdit(statusList.filter(item => item.value === 1 || item.value === 2));
    }
    if (item.status === 2) {
      setStatusListEdit(statusList.filter(item => item.value === 2));
    }
  };

  //let statusList = [
  //   { value: -1, label: 'Chưa mở đăng ký' },
  //   { value: 0, label: 'Chưa bắt đầu' },
  //   { value: 1, label: 'Đã bắt đầu' },
  //   { value: 2, label: 'Đã kết thúc' },
  // ];

  const handleEditClassroom = () => {
    // validate
    if (payloadEdit?.classroomCode === '') {
      toast.error('Mã lớp không được để trống');
      return;
    }
    if (payloadEdit?.quantityStudent === '') {
      toast.error('Số lượng học sinh không được để trống');
      return;
    }
    if (payloadEdit?.idUser === '') {
      toast.error('Giảng viên không được để trống');
      return;
    }

    dispatch(ClassActions.editClassInSubjectRequest({
      ...payloadEdit,
      idUser: payloadEdit.idUser.value,
    }));
    setShowEdit(false);
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
  };

  const handleOpenCreateStudent = (item) => {
    setShowCreateStudent(true);
    setPayloadCreateStudent({
      classroomId: item.idClassroom,
      subjectId: subjectId,
    });
  };

  const handleCreateStudent = () => {
    let payload = {
      studentId: payloadCreateStudent?.studentId,
      classroomId: payloadCreateStudent?.classroomId,
      subjectId: payloadCreateStudent?.subjectId,
    };

    if (!payload.studentId || payload.studentId === '') {
      toast.error('Bạn cần nhập mã sinh viên');
      return;
    }

    setShowCreateStudent(false);
    setPayloadCreateStudent(null);
    dispatch(ClassActions.addStudentToClassRequest({ ...payload, subjectId: +payload.subjectId }));
  };

  useEffect(() => {
    if (studentDetail != null) {
      setPayloadCreateStudent({ ...payloadCreateStudent, ...studentDetail });
    }
  }, [studentDetail]);

  return (
    <div className={'class-manager-page'}>
      <div className={'subject-input-box'}>
        <p>Mã lớp: </p>
        <Input
          value={searchPayload}
          onChange={(value) => setSearchPayload(value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (searchPayload === '') {
                dispatch(ClassActions.getListClassInSubjectRequest({ subjectId }));
              } else {
                dispatch(ClassActions.searchClassesBySubjectRequest({
                  subjectId: subjectId,
                  classroomCode: searchPayload,
                }));
              }
            }
          }}
          onBlur={() => {
            if (searchPayload === '') {
              dispatch(ClassActions.getListClassInSubjectRequest({ subjectId }));
            } else {
              dispatch(ClassActions.searchClassesBySubjectRequest({
                subjectId: subjectId,
                classroomCode: searchPayload,
              }));
            }
          }}
          label=""
          isRequired={false}
          placeHolder="Nhập mã lớp"
          errorMessage=""
          error={false}
          isDisable={false}
          customStyle={{
            minWidth: '300px',
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách lớp học:</p>
        <Button title={'Thêm lớp học'} onClick={() => handleOpenCreate()} />
      </div>

      {/* Table student */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã lớp</th>
              <th>Tên môn</th>
              <th>Số lượng</th>
              <th>Giảng viên</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {classes && classes.length > 0 && classes.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.classroomCode}</td>
                <td>{item.subjectName}</td>
                <td>{item.quantityStudent}</td>
                <td>{item.teacher}</td>
                <td>{item.status === -1 ? 'Chưa mở đăng ký' : item.status === 0 ? 'Chưa bắt đầu' : item.status === 1 ? 'Đã bắt đầu' : 'Đã kết thúc'}</td>
                <td style={{ width: '280px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                    alignItems: 'center',
                    width: '280px',
                  }}>
                    <Button title={'Thêm sinh viên'}
                            onClick={() => handleOpenCreateStudent(item)}
                            width={'150px'}
                            customStyle={{ padding: '6px 0' }}
                            disabled={item.status !== 0}
                    />
                    <Button title={'Sửa'}
                            onClick={() => handleOpenEdit(item)}
                            width={'50px'}
                            customStyle={{ padding: '6px 0' }}
                    />
                    {/*<Button title={'Xoá'}*/}
                    {/*        onClick={() => console.log(item)}*/}
                    {/*        width={'50px'}*/}
                    {/*        customStyle={{ padding: '6px 0' }}*/}
                    {/*/>*/}
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>

      {/* Modal show create */}
      <MDBModal open={showCreate} tabIndex="-1" onClose={() => setShowCreate(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm lớp học</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowCreate(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadCreate?.classroomCode}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, classroomCode: value })}
                       label="Mã lớp học"
                       isRequired={true}
                       placeHolder="Nhập mã lớp học"
                       errorMessage="Mã lớp học không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.subjectName}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, subjectName: value })}
                       label="Tên môn học"
                       isRequired={true}
                       placeHolder="Nhập tên môn học"
                       errorMessage="Tên môn học không được để trống"
                       error={false}
                       isDisable={true}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate?.quantityStudent}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, quantityStudent: value })}
                       label="Số lượng học sinh"
                       isRequired={true}
                       placeHolder="Nhập số lượng học sinh"
                       errorMessage="Số lượng học sinh không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Giảng viên</span>
                <Pulldown items={teachers}
                          label={'Không được để trống'}
                          value={payloadCreate?.idUser}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadCreate({ ...payloadCreate, idUser: value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Thêm'}
                          onClick={() => handleCreateClassroom()}
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
              <MDBModalTitle>Sửa lớp học</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEdit(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadEdit?.classroomCode}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, classroomCode: value })}
                       label="Mã lớp học"
                       isRequired={true}
                       placeHolder="Nhập mã lớp học"
                       errorMessage="Mã lớp học không được để trống"
                       error={false}
                       isDisable={payloadEdit?.status !== -1}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.subjectName}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, subjectName: value })}
                       label="Tên môn học"
                       isRequired={true}
                       placeHolder="Nhập tên môn học"
                       errorMessage="Tên môn học không được để trống"
                       error={false}
                       isDisable={payloadEdit?.status !== -1}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.quantityStudent}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, quantityStudent: value })}
                       label="Số lượng học sinh"
                       isRequired={true}
                       placeHolder="Nhập số lượng học sinh"
                       errorMessage="Số lượng học sinh không được để trống"
                       error={false}
                       isDisable={payloadEdit?.status !== -1}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Giảng viên</span>
                <Pulldown items={teachers}
                          label={'Không được để trống'}
                          value={payloadEdit?.idUser}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadEdit({ ...payloadEdit, idUser: value });
                          }}
                          isRequired={false}
                          error={false}
                          isDisable={payloadEdit?.status !== -1}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Trạng thái</span>
                <Pulldown items={statusListEdit}
                          label={'Không được để trống'}
                          value={statusListEdit.find(item => item.value === payloadEdit?.status)}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadEdit({ ...payloadEdit, status: value.value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Sửa'}
                          onClick={() => handleEditClassroom()}
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


      {/* Modal show create student */}
      <MDBModal open={showCreateStudent} tabIndex="-1" onClose={() => setShowCreateStudent(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm sinh viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowCreateStudent(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadCreateStudent?.studentCode ? payloadCreateStudent?.studentCode : ''}
                       onChange={(value) => setPayloadCreateStudent({ ...payloadCreateStudent, studentCode: value })}
                       label="Mã sinh viên"
                       isRequired={true}
                       onKeyPress={
                         (e) => {
                           if (e.key === 'Enter') {
                             if (payloadCreateStudent?.studentCode === '') {
                               toast.error('Mã sinh viên không được để trống');
                               return;
                             }

                             dispatch(StudentActions.getStudentDetailByStudentCodeRequest({ studentCode: payloadCreateStudent?.studentCode }));
                           }
                         }
                       }
                       onBlur={() => {
                         if (payloadCreateStudent?.studentCode === '') {
                           toast.error('Mã sinh viên không được để trống');
                           return;
                         }

                         dispatch(StudentActions.getStudentDetailByStudentCodeRequest({ studentCode: payloadCreateStudent?.studentCode }));
                       }}
                       placeHolder="Nhập mã sinh viên"
                       errorMessage="Mã sinh viên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreateStudent?.studentName ? payloadCreateStudent?.studentName : ''}
                       onChange={(value) => setPayloadCreateStudent({ ...payloadCreateStudent, studentName: value })}
                       label="Họ tên sinh viên"
                       isRequired={true}
                       placeHolder="Nhập họ tên"
                       errorMessage="Họ tên sinh viên không được để trống"
                       error={false}
                       isDisable={true}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreateStudent?.courseName ? payloadCreateStudent?.courseName : ''}
                       label="Khoá học"
                       isRequired={true}
                       error={false}
                       isDisable={true}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreateStudent?.classroomName ? payloadCreateStudent?.classroomName : ''}
                       label="Lớp học"
                       isRequired={true}
                       error={false}
                       isDisable={true}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/*<Button title={'Dữ liệu từ file'}*/}
                  {/*        onClick={() => navigate(`/teacher/file-input?uploadType=${UploadType.STUDENT}`)}*/}
                  {/*        width={'200px'}*/}
                  {/*        customStyle={{ padding: '6px 0' }}*/}
                  {/*/>*/}
                  <Button title={'Lưu'}
                          onClick={() => handleCreateStudent()}
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

export default ClassManager;