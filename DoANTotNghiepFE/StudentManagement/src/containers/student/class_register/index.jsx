import React, { useEffect } from 'react';
import './style.scss';
import Input from '../../../hook/input';
import * as StudentActions from '../../../store/actions/StudentActions';
import Space from '../../../hook/space/space';
import Button from '../../../hook/button';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Pagination from '../../../components/paging';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as ClassActions from '../../../store/actions/ClassActions';
import * as SubjectActions from '../../../store/actions/SubjectActions';
import { toast } from 'react-toastify';

const StudentClassRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classRegisters = [], loading = false, pagingClassRegister = null } = useSelector((state) => state.student);
  const [searchPayload, setSearchPayload] = React.useState({
    subjectCode: '',
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const subjectCode = queryParams.get('subjectCode');
    setSearchPayload({ ...searchPayload, subjectCode: subjectCode });

    dispatch(StudentActions.getAllClassToRegisterRequest({ ...searchPayload, subjectCode: subjectCode }));
  }, []);


  const handlePageChange = (pageNumber) => {
    dispatch(StudentActions.getAllClassToRegisterRequest({
      ...searchPayload,
      pageIndex: pageNumber,
    }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  return (
    <div className={'subject-manager-page'}>
      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách lớp học:</p>
      </div>

      {/* Table teacher */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Số tín chỉ</th>
              <th>Mã lớp học</th>
              <th>Số lượng</th>
              <th>Giảng viên</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {classRegisters && classRegisters.length > 0 && classRegisters.map((item, index) => (
              <tr style={{ cursor: 'pointer' }} key={index}>
                <td>{index + 1}</td>
                <td>{item?.subjectCode}</td>
                <td>{item.subjectName}</td>
                <td>{item.numberOfCredits}</td>
                <td>{item.classroomCode}</td>
                <td>{`${item.quantityStudentNow}/${item.quantityStudent}`}</td>
                <td>{item.teacher}</td>
                <td>
                  <Button title={'Đăng ký'} onClick={() => {
                    toast.info("Chưa code phần đăng ký :)")
                  }} customStyle={{
                    width: '100px',
                    color: 'white',
                    fontSize: '14px',
                    padding: '5px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  />
                  <Space height={'6px'} />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        {/* Paging */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          {
            pagingClassRegister && (
              <Pagination
                totalPages={pagingClassRegister?.totalPages}
                currentPage={pagingClassRegister?.pageIndex + 1}
                onPageChange={handlePageChange}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default StudentClassRegister;