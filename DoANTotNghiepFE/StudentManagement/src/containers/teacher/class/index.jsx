import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Pulldown from '../../../hook/pulldown';
import Space from '../../../hook/space/space';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import * as TeacherActions from '../../../store/actions/TeacherActions';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import Pagination from '../../../components/paging';

const statusList = [
  { value: 0, label: 'Đã mở đăng ký' },
  { value: 1, label: 'Đã bắt đầu' },
  { value: 2, label: 'Đã kết thúc' },
];
const statusListEdit = [
  { value: -1, label: 'Chưa mở đăng ký' },
  { value: 0, label: 'Đã mở đăng ký' },
  { value: 1, label: 'Đã bắt đầu' },
  { value: 2, label: 'Đã kết thúc' },
];

const TeacherClass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myClasses = [], loading = false, pagingMyClass = null } = useSelector((state) => state.teacher);
  const [searchPayload, setSearchPayload] = React.useState({
    subjectName: '',
    status: { value: null, label: 'Tất cả' },
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    dispatch(TeacherActions.searchMyClassesRequest({
      searchPayload,
    }));
  };

  const handleClickItem = (item) => {
    if (item.status === 1 || item.status === 2) {
      navigate(`/teacher/input-mark?classroomCode=${item.classroomCode}&status=${item.status}`);
    } else {
      toast.info('Lớp học chưa bắt đầu');
    }
  };

  return (
    <div>
      <div className={'student-class-container'}>
        <div className={'student-class-header'}>
          <div className={'student-class-item'}>
            <span>Tên môn: </span>
            <Space width={10} />
            <Input
              placeholder={'Nhập tên môn'}
              value={searchPayload.subjectName}
              label={''}
              onChange={(value) => {
                setSearchPayload({ ...searchPayload, subjectName: value });
              }}
              customStyle={{ width: '260px' }}
            />
          </div>

          <div className={'student-class-item'}>
            <span>Trạng thái: </span>
            <Space width={10} />
            <Pulldown
              items={statusList}
              value={searchPayload.status}
              setSelected={(value) => {
                let payload = { ...searchPayload, status: value };
                setSearchPayload(payload);

                dispatch(TeacherActions.searchMyClassesRequest({
                  searchPayload: payload,
                }));
              }}
              ignores={[]}
              customStyle={{ width: '200px' }}
            />
          </div>

          <Button
            title={'Tìm kiếm'}
            onClick={() => {
              handleSearch();
            }}
            customStyle={{ width: '100px' }}
          />
        </div>

        <p>Danh sách lớp học:</p>

        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã lớp</th>
              <th>Tên môn</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Tài liệu</th>
              <th>Thống kê</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {myClasses && myClasses.length > 0 && myClasses.map((item, index) => (
              <tr style={{ cursor: 'pointer' }} key={index}>
                <td
                  style={{ lineHeight: 0 }}
                  onClick={() => {
                    handleClickItem(item);
                  }}>{index + 1}</td>
                <td
                  style={{ lineHeight: 0 }}
                  onClick={() => {
                    handleClickItem(item);
                  }}>{item?.classroomCode}</td>
                <td
                  style={{ lineHeight: 0 }}
                  onClick={() => {
                    handleClickItem(item);
                  }}>{item.subjectName}</td>
                <td
                  style={{ lineHeight: 0 }}
                  onClick={() => {
                    handleClickItem(item);
                  }}>{item.quantityStudent}</td>
                <td style={{ lineHeight: 0, padding: '4px 0', margin: '4px 0' }}>
                  <Pulldown
                    items={[{ value: 2, label: 'Đã kết thúc' }]}
                    value={statusListEdit.filter(i => i.value === item.status)[0]}
                    setSelected={(value) => {
                      dispatch(TeacherActions.updateClassRequest({
                        ...item,
                        status: value.value,
                        searchPayload: {
                          ...searchPayload,
                          status: null,
                        },
                      }));
                    }}
                    ignores={[]}
                    customStyle={{ width: '160px' }}
                    isDisable={item.status !== 1}
                    // isDisable={item.status === 0 || item.status === 2}
                  />

                </td>
                <td style={{
                  lineHeight: 0,
                  padding: '4px 0',
                  margin: '4px 0',
                }}>
                  <Button
                    title={'Xem tài liệu'}
                    onClick={() => {
                      navigate(`/teacher/documents?classroomCode=${item.classroomCode}`);
                    }}
                    customStyle={{ width: '120px', height: '40px' }}
                    disabled={!(item.status === 1 || item.status === 2)}
                  />
                </td>
                <td style={{
                  lineHeight: 0,
                  padding: '4px 0',
                  margin: '4px 0',
                }}>
                  <Button
                    title={'Xem thống kê'}
                    onClick={() => {
                      navigate(`/teacher/dashboard?classroomCode=${item.classroomCode}`);
                    }}
                    customStyle={{ width: '140px', height: '40px' }}
                    disabled={!(item.status === 1 || item.status === 2)}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

      </div>

      {/* Paging */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        {pagingMyClass && (
          <Pagination
            totalPages={pagingMyClass?.totalPages}
            currentPage={pagingMyClass?.pageIndex + 1}
            onPageChange={pagingMyClass}
          />
        )}
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

export default TeacherClass;
