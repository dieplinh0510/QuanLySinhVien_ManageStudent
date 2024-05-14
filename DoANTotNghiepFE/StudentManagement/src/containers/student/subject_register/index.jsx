import React, { useEffect } from 'react';
import './style.scss';
import Input from '../../../hook/input';
import * as StudentActions from '../../../store/actions/StudentActions';
import Space from '../../../hook/space/space';
import Button from '../../../hook/button';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Pagination from '../../../components/paging';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const StudentSubjectRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    subjectRegisters = [],
    loading = false,
    pagingSubjectRegister = null,
  } = useSelector((state) => state.student);
  const [searchPayload, setSearchPayload] = React.useState({
    pageIndex: 1,
    pageSize: 10,
    subjectName: '',
  });

  useEffect(() => {
    dispatch(StudentActions.getAllSubjectToRegisterRequest(searchPayload));
  }, []);


  const handlePageChange = (pageNumber) => {
    dispatch(StudentActions.getAllSubjectToRegisterRequest({
      ...searchPayload,
      pageIndex: pageNumber,
    }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };


  const handleNavigateClass = (item) => {
    if (item.status === -1) {
      toast.info('Môn học chưa mở đăng ký');
      return;
    }
    navigate(`/student/classes?subjectCode=${item.subjectCode}`);
  };

  return (
    <div className={'subject-manager-page'}>
      <div className={'subject-input-box'}>
        <p>Tên môn: </p>
        <Input
          value={searchPayload.subjectName}
          onChange={(value) => setSearchPayload({ ...searchPayload, subjectName: value })}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              dispatch(StudentActions.getAllClassToRegisterRequest(searchPayload));
            }
          }}
          label=""
          isRequired={false}
          placeHolder="Nhập tên môn học"
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
          dispatch(StudentActions.getAllClassToRegisterRequest(searchPayload));
        }} customStyle={{ width: '120px' }} />
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách môn học:</p>
      </div>

      {/* Table teacher */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã môn</th>
              <th>Tên môn</th>
              <th>Số tín chỉ</th>
              <th>Học kì</th>
              <th>Trạng thái</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {subjectRegisters && subjectRegisters.length > 0 && subjectRegisters.map((item, index) => (
              <tr style={{ cursor: 'pointer' }} key={index} onClick={() => {
                handleNavigateClass(item);
              }}>
                <td>{index + 1}</td>
                <td>{item?.subjectCode}</td>
                <td style={{
                  textDecoration: item.status === -1 ? 'none' : 'underline',
                  color: item.status === -1 ? 'black' : 'blue',
                }}>{item.subjectName}</td>
                <td>{item.numberOfCredits}</td>
                <td>{item.idSemester}</td>
                <td>{item.status === -1 ? 'Chưa mở đăng ký' : 'Đã mở đăng ký'}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        {/* Paging */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          {
            pagingSubjectRegister && (
              <Pagination
                totalPages={pagingSubjectRegister?.totalPages}
                currentPage={pagingSubjectRegister?.pageIndex + 1}
                onPageChange={handlePageChange}
              />
            )
          }
        </div>
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

export default StudentSubjectRegister;