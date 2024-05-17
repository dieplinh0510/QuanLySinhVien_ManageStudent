import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import * as StudentActions from '../../../store/actions/StudentActions';
import Button from '../../../hook/button';
import './style.scss';
import StudentDetailInfo from './info';
import Pagination from '../../../components/paging';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import StorageService from '../../../utils/storage.service';
import { AuthKeys } from '../../../constant';

const StudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentDetail = null, studentMark = [], pagingForDetail = null, loading=false } = useSelector((state) => state.student);
  const [searchPayload, setSearchPayload] = React.useState({
    studentId: '',
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let payload = { ...searchPayload, studentId: queryParams.get('studentId') };
    setSearchPayload(payload);
    dispatch(StudentActions.getStudentDetailByIdRequest(payload));
    dispatch(StudentActions.getStudentMarkByIdRequest(payload));
  }, []);

  const handlePageChange = (pageNumber) => {
    dispatch(StudentActions.getStudentMarkByIdRequest({ ...searchPayload, pageIndex: pageNumber }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  return (
    <div className="student-detail-container">
      <div className="info-container">
        <StudentDetailInfo studentDetail={studentDetail} />
        <Button title={'Xem tích luỹ theo kì'}
                onClick={() => navigate(`/students/accumulated?studentId=${searchPayload.studentId}`)}
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
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ textAlign: 'center', lineHeight: '12px' }}>{index + 1}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.subjectName}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.classroomCode}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.regularPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.regularPointTwo}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.midtermPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}
                  style={{ lineHeight: '12px' }}>{(
                item?.studentInClassroomSubject?.regularPointOne
                && item?.studentInClassroomSubject?.regularPointTwo
                && item?.studentInClassroomSubject?.midtermPointOne) ? item?.mediumPoint : ''}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{item?.studentInClassroomSubject?.testPointOne}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{(item?.studentInClassroomSubject?.testPointOne) ? item?.point : ''}</td>
              <td onClick={() => navigate(`/students/class?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>{(item?.studentInClassroomSubject?.testPointOne) ? item?.accumulated_point : ''}</td>
              
              {
                JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName === AuthKeys.ROLE_STUDENT && 
              
              <td onClick={() => navigate(`/student/documents?classroomCode=${item.classroomCode}`)}  style={{ lineHeight: '12px' }}>
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


      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true} >
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
        JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName === AuthKeys.ROLE_STUDENT && <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center', fontWeight: 'bold' }}>Tài liệu</th> 
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