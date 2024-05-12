import React, { useEffect } from 'react';
import './style.scss';
import Title from '../../../../hook/title/Title';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Button from '../../../../hook/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as ClassActions from '../../../../store/actions/ClassActions';
import Space from '../../../../hook/space/space';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import Pagination from '../../../../components/paging';

const StudentClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchPayload, setSearchPayload] = React.useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const { students = [], loading = false, studentPaging = null } = useSelector((state) => state.class);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    dispatch(ClassActions.getAllStudentInClassRequest({
      classroomCode: queryParams.get('classroomCode'),
      ...searchPayload,
    }));

    setSearchPayload({
      classroomCode: queryParams.get('classroomCode'),
      ...searchPayload,
    });
  }, []);

  const handlePageChange = (pageNumber) => {
    dispatch(ClassActions.getAllStudentInClassRequest({ ...searchPayload, pageIndex: pageNumber }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  return (
    <div className={'student-class-container'}>
      <Title text={'Kết quả học tập'} />

      <TableHeaderStudentClass data={{}} />

      <Space height={20} />

      <MDBTable bordered striped hover>
        <TableHeaderList />
        <TableBody students={students} />
      </MDBTable>

      <Button
        title={'Quay lại'}
        onClick={() => {
          navigate(-1);
        }}
        customStyle={{
          position: 'absolute',
          bottom: '20px',
          left: '20%',
          width: '140px',
        }}
      />

      {/* Paging */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        {
          studentPaging && (
            <Pagination
              totalPages={studentPaging?.totalPages}
              currentPage={studentPaging?.pageIndex + 1}
              onPageChange={handlePageChange}
            />
          )
        }
      </div>


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

const TableBody = ({ students }) => {
  return <MDBTableBody>
    {students && students.length > 0 && students.map((item, index) => (
      <tr key={index}>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{index + 1}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.studentCode}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.studentName}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.regularPointOne}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.regularPointTwo}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.midtermPointOne}</td>
        <td style={{
          lineHeight: '0px',
          textAlign: 'center',
        }}>{(item.midtermPointOne == null || item.regularPointOne == null || item.regularPointTwo == null) ? '' : item.mediumPoint}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{item.testPointOne}</td>
        <td style={{
          lineHeight: '0px',
          textAlign: 'center',
        }}>{(item.testPointOne == null) ? '' : item.accumulated_point}</td>
        <td style={{ lineHeight: '0px', textAlign: 'center' }}>{(item.testPointOne == null) ? '' : item.point}</td>
      </tr>
    ))}
  </MDBTableBody>;
};

const TableHeaderList = () => {
  return <MDBTableHead>
    <tr>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>STT</th>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>Mã sinh viên</th>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>Họ tên</th>
      <th colSpan={2} style={{ lineHeight: '0px', textAlign: 'center' }}>Điểm thường xuyên</th>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>Điểm giữa kì</th>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>TB KTTX</th>
      <th rowSpan={2} style={{ lineHeight: '26px', textAlign: 'center' }}>Điểm thi</th>
      <th colSpan={2} style={{ lineHeight: '0px', textAlign: 'center' }}>Điểm tích lũy</th>
    </tr>
    <tr>
      <th style={{ lineHeight: '0px', textAlign: 'center' }}>1</th>
      <th style={{ lineHeight: '0px', textAlign: 'center' }}>2</th>
      <th style={{ lineHeight: '0px', textAlign: 'center' }}>Điểm 4</th>
      <th style={{ lineHeight: '0px', textAlign: 'center' }}>Điểm 10</th>
    </tr>
  </MDBTableHead>;
};

const TableHeaderStudentClass = ({ data }) => {
  return <MDBTable bordered striped hover>
    <MDBTableBody>
      <tr style={{ lineHeight: '0px', textAlign: 'center' }}>
        <td>Môn</td>
        <td>Cơ sở dũ liệu</td>
      </tr>
      <tr style={{ lineHeight: '0px', textAlign: 'center' }}>
        <td>Hình thức tính điểm</td>
        <td>30% điểm TX + 30% điểm GK + 40% điểm thi</td>
      </tr>
      <tr style={{ lineHeight: '0px', textAlign: 'center' }}>
        <td>Mã lớp</td>
        <td>100000.3</td>
      </tr>
      <tr style={{ lineHeight: '0px', textAlign: 'center' }}>
        <td>Số tín chỉ</td>
        <td>3</td>
      </tr>
    </MDBTableBody>
  </MDBTable>;
};

export default StudentClass;