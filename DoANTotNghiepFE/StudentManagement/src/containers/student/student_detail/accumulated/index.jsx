import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as StudentActions from '../../../../store/actions/StudentActions';
import StudentDetailInfo from '../info';
import Space from '../../../../hook/space/space';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import LineChartData from './LineChartData';

const StudentAccumulated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accumulatedPoint = [] } = useSelector((state) => state.student);
  const { myInfo = {} } = useSelector((state) => state.auth);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    dispatch(StudentActions.getStudentDetailByIdRequest());
  }, []);

  useEffect(() => {
    if (myInfo !== null) {
      dispatch(StudentActions.getStudentAccumulatePointRequest({ studentCode: myInfo.studentCode }));
    }
  }, [myInfo]);

  return (
    <div className={'student-accumulate-container'}>
      <StudentDetailInfo studentDetail={myInfo} />

      <Space height={'20px'} />

      <p>Danh sách điểm tích luỹ theo kỳ: </p>
      <Space height={'10px'} />

      <div className={'student-accumulate-content'}>
        <div className={'accumulate-table'}>
          <MDBTable bordered striped hover>
            <MDBTableHead>
              <tr>
                <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>Học kỳ</th>
                <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>Tổng tín chỉ theo kỳ</th>
                <th style={{ lineHeight: '0px', fontWeight: 'bold' }}>TB chung học kỳ</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {accumulatedPoint && accumulatedPoint.length > 0 && accumulatedPoint.map((item, index) => (
                <tr key={index}>
                  <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item?.idSemester}</td>
                  <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item?.sumCredit}</td>
                  <td style={{
                    lineHeight: '0px',
                    textAlign: 'center',
                  }}>{item?.accumulatedPoint === 'NaN' ? '' : item?.accumulatedPoint}</td>
                </tr>
              ))}

            </MDBTableBody>
          </MDBTable>
        </div>

        <div className={'accumulate-chart'}>
          <LineChartData data={accumulatedPoint} />
        </div>
      </div>

    </div>
  );
};

export default StudentAccumulated;