import React, { useEffect, useState } from 'react';
import Input from '../../../hook/input';
import Title from '../../../hook/title/Title';
import './style.scss';
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import Button from '../../../hook/button';
import Space from '../../../hook/space/space';
import { useDispatch, useSelector } from 'react-redux';
import * as PointInputActions from '../../../store/actions/PointInputActions';
import { useNavigate } from 'react-router-dom';
import { UploadType } from '../../../constant';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const InputMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students = [], loading = false, error, classrooms = [] } = useSelector((state) => state.pointInput);
  const [classroomCode, setClassroomCode] = React.useState('');
  const [openModalClassroomCode, setOpenModalClassroomCode] = useState(false);
  const [openModalEditPoint, setOpenModalEditPoint] = useState(false);
  const [openModalDeletePoint, setOpenModalDeletePoint] = useState(false);
  const [payload, setPayload] = useState(null);

  const handleImportFile = () => {
    navigate(`/admin/file-input?uploadType=${UploadType.POINT}`);
  };

  useEffect(() => {
    dispatch(PointInputActions.getAllClassroomRequest());
  }, []);

  const handleToggleModelClassroomCode = () => {
    setOpenModalClassroomCode(!openModalClassroomCode);
  };

  console.log(loading);

  return (
    // <Loader active={loading} >
    <div className={'input-mark-page'}>
      <Title text="NHẬP ĐIỂM THEO MÔN HỌC" />

      <div className={'form-box'}>
        <p className={'label'}>Mã lớp:</p>
        <Input
          value={classroomCode}
          onChange={(value) => setClassroomCode(value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              dispatch(PointInputActions.getStudentColumnRequest({ classroomCode }));
            }
          }}
          onBlur={() => dispatch(PointInputActions.getStudentColumnRequest({ classroomCode }))}
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

        <Space width={50} />

        <Button title={'Xem mã lớp'}
                onClick={() => handleToggleModelClassroomCode()} />
      </div>

      <p>Danh sách sinh viên trong lớp:</p>
      <MDBTable bordered striped hover>
        <TableHeaderListStudent />
        <MDBTableBody>
          {students && students.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.studentCode}</td>
              <td>{item.studentName}</td>
              <td>{item.regularPointOne}</td>
              <td>{item.regularPointTwo}</td>
              <td>{item.midtermPointOne}</td>
              <td>{(item.midtermPointOne == null || item.regularPointOne || item.regularPointTwo) ? '' : item.mediumPoint}</td>
              <td>{item.testPointOne}</td>
              <td>{(item.testPointOne == null) ? '' : item.accumulated_point}</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', alignItems: 'center' }}>
                  <Button title={'Sửa'}
                          onClick={() => {
                            console.log(item);
                            setOpenModalEditPoint(true);
                            setPayload(item);
                          }}
                          width={'50px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Space width={10} />
                  <Button title={'Xoá'}
                          onClick={() => {
                            console.log(item);
                            setOpenModalDeletePoint(true);
                            setPayload(item);
                          }}
                          width={'50px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                </div>
              </td>
            </tr>
          ))}

        </MDBTableBody>
      </MDBTable>

      <Space height={20} />
      <Button title={'Thêm dữ liệu từ file'} onClick={handleImportFile} />

      {/* Modal show classroom */}
      <MDBModal
        open={openModalClassroomCode} tabIndex="-1" autoFocus={false} centered
        onClose={() => setOpenModalClassroomCode(false)}>
        <MDBModalDialog scrollable size="fullscreen-xxl-down"
                        style={{ height: '100vh', right: 0, position: 'fixed', top: '-3%', bottom: 0 }}>
          <MDBModalContent>
            <MDBModalBody>

              <MDBTable bordered striped hover>
                <MDBTableHead>
                  <tr>
                    <th>Mã lớp</th>
                    <th>Tên môn học</th>
                    <th>Giảng viên</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ overflowY: 'auto' }}>
                  {classrooms && classrooms.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setClassroomCode(item.classroomCode);
                        dispatch(PointInputActions.getStudentColumnRequest({ classroomCode: item.classroomCode }));
                      }}
                    >
                      <td style={{ lineHeight: '0' }}>{item.classroomCode}</td>
                      <td style={{ lineHeight: '0' }}>{item.subjectName}</td>
                      <td style={{ lineHeight: '0' }}>{item.teacher}</td>
                    </tr>
                  ))}
                </MDBTableBody>

              </MDBTable>


            </MDBModalBody>
            <MDBModalFooter>
              <Button title={'Đóng'} onClick={handleToggleModelClassroomCode} />
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal edit point */}
      <MDBModal
        open={openModalEditPoint} tabIndex="-1" autoFocus={false} centered
        onClose={() => setOpenModalEditPoint(false)}>
        <MDBModalDialog scrollable size="fullscreen-xxl-down">
          <MDBModalContent>
            <MDBModalHeader>
              <p>Sửa điểm sinh viên</p>
            </MDBModalHeader>
            <MDBModalBody>
              <p style={{ textAlign: 'center' }}>{payload?.studentName} - {payload?.studentCode}</p>
              <Input
                value={payload?.regularPointOne}
                onChange={(value) => setPayload({ ...payload, regularPointOne: value })}
                label="Điểm thường xuyên 1"
                isRequired={true}
                placeHolder="Nhập điểm thường xuyên 1"
                errorMessage=""
                error={false}
                isDisable={false}
                customStyle={{
                  minWidth: '300px',
                }}
              />
              <Space height={16} />
              <Input
                value={payload?.regularPointTwo}
                onChange={(value) => setPayload({ ...payload, regularPointTwo: value })}
                label="Điểm thường xuyên 2"
                isRequired={true}
                placeHolder="Nhập điểm thường xuyên 2"
                errorMessage=""
                error={false}
                isDisable={false}
                customStyle={{
                  minWidth: '300px',
                }}
              />
              <Space height={16} />
              <Input
                value={payload?.midtermPointOne}
                onChange={(value) => setPayload({ ...payload, midtermPointOne: value })}
                label="Điểm giữa kì"
                isRequired={true}
                placeHolder="Nhập điểm giữa kì"
                errorMessage=""
                error={false}
                isDisable={false}
                customStyle={{
                  minWidth: '300px',
                }}
              />
              <Space height={16} />
              <Input
                value={payload?.testPointOne}
                onChange={(value) => setPayload({ ...payload, testPointOne: value })}
                label="Điểm thi"
                isRequired={true}
                placeHolder="Nhập điểm thi"
                errorMessage=""
                error={false}
                isDisable={false}
                customStyle={{
                  minWidth: '300px',
                }}
              />
              <Space height={16} />
              <div style={{ display: 'flex' }}>
                <Button title={'Lưu'}
                        onClick={() => {
                          dispatch(PointInputActions.editPointRequest({
                            ...payload,
                            classroomCode,
                          }));
                          setOpenModalEditPoint(false);
                          setPayload(null);
                        }}
                />
                <Space width={16} />
                <Button title={'Đóng'} onClick={() => {
                  setOpenModalEditPoint(false);
                  setPayload(null);
                }} />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* Modal delete point */}
      <MDBModal
        open={openModalDeletePoint} tabIndex="-1" autoFocus={false} centered
        onClose={() => setOpenModalDeletePoint(false)}>
        <MDBModalDialog scrollable size="fullscreen-xxl-down">
          <MDBModalContent>
            <MDBModalHeader>
              <p>Xác nhận xoá sinh viên trong lớp học này</p>
            </MDBModalHeader>
            <MDBModalBody>
              <p style={{ textAlign: 'center' }}>{payload?.studentName} - {payload?.studentCode}</p>
              <p>Bạn có chắc chắn muốn xoá sinh viên trong lớp học này không?</p>
              <div style={{ display: 'flex' }}>
                <Button title={'Xoá'}
                        onClick={() => {
                          dispatch(PointInputActions.deletePointRequest({
                            studentClassId: payload.id,
                            classroomCode,
                          }));
                          setOpenModalDeletePoint(false);
                          setPayload(null);
                        }}
                />
                <Space width={16} />
                <Button title={'Đóng'} onClick={() => {
                  setOpenModalDeletePoint(false);
                  setPayload(null);
                }} />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true} >
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}>
            </LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>

    </div>
    // </Loader>
  );
};

const TableHeaderListStudent = () => {
  return <MDBTableHead>
    <tr>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>STT</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>Mã sinh viên</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>Họ tên</th>
      <th colSpan={2} style={{ lineHeight: '0px' }}>Điểm thường xuyên</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>Điểm giữa kì</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>TB KTTX</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>Điểm thi</th>
      <th rowSpan={2} style={{ lineHeight: '26px' }}>Điểm TL</th>
      <th rowSpan={2} style={{ width: '100px' }}></th>
    </tr>
    <tr>
      <th style={{ lineHeight: '0px' }}>1</th>
      <th style={{ lineHeight: '0px' }}>2</th>
    </tr>
  </MDBTableHead>;
};

export default InputMark;