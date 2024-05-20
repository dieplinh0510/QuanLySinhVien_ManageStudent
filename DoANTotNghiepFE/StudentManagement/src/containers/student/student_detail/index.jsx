import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBFile,
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
import * as StudentActions from '../../../store/actions/StudentActions';
import * as AuthActions from '../../../store/actions/AuthActions';
import Button from '../../../hook/button';
import './style.scss';
import StudentDetailInfo from './info';
import Pagination from '../../../components/paging';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import StorageService from '../../../utils/storage.service';
import { Api, AuthKeys, Pattern } from '../../../constant';
import Space from '../../../hook/space/space';
import Input from '../../../hook/input';
import { toast } from 'react-toastify';

const StudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentMark = [], pagingForDetail = null, loading = false } = useSelector((state) => state.student);
  const { myInfo = {} } = useSelector((state) => state.auth);
  const [searchPayload, setSearchPayload] = React.useState({
    studentId: '',
    pageIndex: 1,
    pageSize: 10,
  });
  const [openChangeInfo, setOpenChangeInfo] = useState(false);
  const [payloadEdit, setPayloadEdit] = useState({});

  useEffect(() => {
    // dispatch(StudentActions.getStudentDetailByIdRequest(payload));
    dispatch(AuthActions.getUserInfoRequest());
  }, []);

  useEffect(() => {
    if (myInfo && myInfo.id) {
      setSearchPayload({ ...searchPayload, studentId: myInfo.id });
      dispatch(StudentActions.getStudentMarkByIdRequest({ ...searchPayload, studentId: myInfo.id }));
    }
  }, [myInfo]);


  const handlePageChange = (pageNumber) => {
    dispatch(StudentActions.getStudentMarkByIdRequest({ ...searchPayload, pageIndex: pageNumber }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  const handleOpenChangeInfo = () => {
    setOpenChangeInfo(true);
    setPayloadEdit(myInfo);
  };

  const handleChangeInfo = () => {
    if (payloadEdit?.studentName === '') {
      toast.info('Họ tên không được để trống');
      return;
    }

    if (payloadEdit?.email === '') {
      toast.info('Email không được để trống');
      return;
    }

    if (Pattern.EMAIL.test(payloadEdit?.email) === false) {
      toast.info('Email không đúng định dạng');
      return;
    }

    dispatch(AuthActions.updateMyInfoRequest({
      studentName: payloadEdit.studentName,
      email: payloadEdit.email,
      studentImage: payloadEdit?.file,
    }));

    handleCancelChangeInfo();
  };

  const handleCancelChangeInfo = () => {
    setOpenChangeInfo(false);
    setPayloadEdit({});
  };

  return (
    <div className="student-detail-container">
      <div className="info-container">
        <StudentDetailInfo studentDetail={myInfo} handleOpenChangeInfo={handleOpenChangeInfo} />
        <Button title={'Xem tích luỹ theo kì'}
                onClick={() => navigate(`/students/accumulated`)}
                style={{ width: '200px', height: '40px', fontSize: '16px' }}
        />
      </div>

      <MDBTable bordered striped hover>
        <TableHeaderStudentMark />
        <MDBTableBody>
          {studentMark && studentMark.length > 0 && studentMark.map((item, index) => (
            <tr key={index} style={{
              cursor: 'pointer',
            }}>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ textAlign: 'center', lineHeight: '12px' }}>{index + 1}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.subjectName}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.classroomCode}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.regularPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.regularPointTwo}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.midtermPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{(
                item?.studentInClassroomSubject?.regularPointOne
                && item?.studentInClassroomSubject?.regularPointTwo
                && item?.studentInClassroomSubject?.midtermPointOne) ? item?.mediumPoint : ''}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.testPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{(item?.studentInClassroomSubject?.testPointOne) ? item?.point : ''}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{(item?.studentInClassroomSubject?.testPointOne) ? item?.accumulated_point : ''}</td>

              {
                JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName === AuthKeys.ROLE_STUDENT &&

                <td onClick={() => navigate(`/student/documents?classroomCode=${item.classroomCode}`)}
                    style={{ lineHeight: '12px' }}>
                <span style={{
                  color: 'blue',
                  textDecoration: 'underline',
                }}>
                    Xem
                  </span>
                </td>
              }
            </tr>
          ))}

        </MDBTableBody>
      </MDBTable>

      {/* Paging */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        {
          pagingForDetail && (
            <Pagination
              totalPages={pagingForDetail?.totalPages}
              currentPage={pagingForDetail?.pageIndex + 1}
              onPageChange={handlePageChange}
            />
          )
        }
      </div>


      {/* Modal show change info student */}
      <MDBModal open={openChangeInfo} tabIndex="-1" onClose={() => handleCancelChangeInfo()}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Sửa thông tin</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => handleCancelChangeInfo()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Input value={payloadEdit?.studentName}
                     onChange={(value) => setPayloadEdit({ ...payloadEdit, studentName: value })}
                     label="Họ tên"
                     isRequired={true}
                     placeHolder="Nhập họ tên"
                     errorMessage="Họ tên không được để trống"
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

              {
                payloadEdit.previewImage === undefined && payloadEdit?.image && <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <img src={Api.BASE_URL + payloadEdit?.image} style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid gray',
                  }} alt={'preview'} />

                  <Space height={20} />
                </div>
              }

              {
                payloadEdit?.previewImage !== undefined && <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <img src={payloadEdit?.previewImage} style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid gray',
                  }} alt={'preview'} />

                  <Space height={20} />
                </div>
              }

              <MDBFile label="Tải tệp" id="customFile"
                       onChange={(e) => {
                         setPayloadEdit({
                           ...payloadEdit,
                           file: e.target.files[0],
                           previewImage: URL.createObjectURL(e.target.files[0]),
                         });
                       }
                       }
              />

              <Space height={20} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button title={'Sửa'}
                        onClick={() => handleChangeInfo()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
                <Button title={'Huỷ'}
                        onClick={() => handleCancelChangeInfo()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
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

const TableHeaderStudentMark = () => {
  return <MDBTableHead>
    <tr>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>STT</th>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>Tên môn</th>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>Mã lớp</th>
      <th colSpan={2} style={{ lineHeight: '0px', textAlign: 'center', fontWeight: 'bold' }}>Điểm thường xuyên</th>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>Điểm giữa kì</th>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>TB KTTX</th>
      <th rowSpan={2} style={{ lineHeight: '26px', fontWeight: 'bold' }}>Điểm thi</th>
      <th colSpan={2} style={{ lineHeight: '0px', textAlign: 'center', fontWeight: 'bold' }}>Điểm TL</th>

      {
        JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName === AuthKeys.ROLE_STUDENT &&
        <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center', fontWeight: 'bold' }}>Tài liệu</th>
      }
    </tr>
    <tr>
      <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>1</th>
      <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>2</th>
      <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>Điểm 4</th>
      <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>Điểm 10</th>
    </tr>


  </MDBTableHead>;
};

export default StudentDetail;