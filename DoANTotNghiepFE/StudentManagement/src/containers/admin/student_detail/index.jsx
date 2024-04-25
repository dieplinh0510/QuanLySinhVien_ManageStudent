import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import * as StudentActions from '../../../store/actions/StudentActions';
import Button from '../../../hook/button';
import './style.scss';
import StudentDetailInfo from './info';

const StudentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentDetail = null, studentMark = [] } = useSelector((state) => state.student);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setStudentId(queryParams.get('studentId'));
    dispatch(StudentActions.getStudentDetailByIdRequest({ studentId: queryParams.get('studentId') }));
    dispatch(StudentActions.getStudentMarkByIdRequest({ studentId: queryParams.get('studentId') }));
  }, []);

  return (
    <div className='student-detail-container'>
      <div className='info-container'>
        <StudentDetailInfo studentDetail={studentDetail} />
        <Button title={'Xem tích luỹ theo kì'}
                onClick={() => navigate(`/admin/students/accumulated?studentId=${studentId}`)}
                style={{ width: '200px', height: '40px', fontSize: '16px'}}
        />
      </div>

      <MDBTable bordered striped hover>
        <TableHeaderStudentMark />
        <MDBTableBody>
          {studentMark && studentMark.length > 0 && studentMark.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign: 'center'}}>{index + 1}</td>
              <td>{item?.subjectName}</td>
              <td>{item?.classroomCode}</td>
              <td>{item?.studentInClassroomSubject?.regularPointOne}</td>
              <td>{item?.studentInClassroomSubject?.regularPointTwo}</td>
              <td>{item?.studentInClassroomSubject?.midtermPointOne}</td>
              <td>{item?.mediumPoint}</td>
              <td>{item?.studentInClassroomSubject?.testPointOne}</td>
              <td>{item?.point}</td>
              <td>{item?.accumulated_point}</td>
            </tr>
          ))}

        </MDBTableBody>
      </MDBTable>
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