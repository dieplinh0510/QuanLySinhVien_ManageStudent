import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import Pulldown from '../../../hook/pulldown';
import Space from '../../../hook/space/space';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import * as TeacherActions from '../../../store/actions/TeacherActions';
import { useNavigate } from 'react-router-dom';

const statusList = [
  { value: 0, label: 'Chưa bắt đầu' },
  { value: 1, label: 'Đã bắt đầu' },
  { value: 2, label: 'Đã kết thúc' },
];
const statusListEdit = [
  { value: 1, label: 'Đã bắt đầu' },
  { value: 2, label: 'Đã kết thúc' },
];

const TeacherClass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myClasses = [], loading = false } = useSelector((state) => state.teacher);
  const [searchPayload, setSearchPayload] = React.useState({
    subjectName: '',
    status: { value: 1, label: 'Chưa bắt đầu' },
  });

  useEffect(() => {
    dispatch(TeacherActions.searchMyClassesRequest({}));
  }, []);

  const handleClickItem = (item) => {
    console.log('item', item);
    navigate(`/teacher/input-mark?classroomCode=${item.classroomCode}`);
    // if (item.status === 1 || item.status === 2) {
    //   navigate(`/teacher/input-mark?classroomCode=${item.classroomCode}`);
    // } else {
    //   toast.info("Lớp học chưa bắt đầu")
    // }
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
                setSearchPayload({ ...searchPayload, status: value });
              }}
              ignores={[]}
              customStyle={{ width: '200px' }}
            />
          </div>

          <Button
            title={'Tìm kiếm'}
            onClick={() => {

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
                    items={statusListEdit}
                    value={statusListEdit.filter(i => i.value === item.status)[0]}
                    setSelected={(value) => {
                      toast.info('Chưa code phần cập nhật trạng thái :)');
                    }}
                    ignores={[]}
                    customStyle={{ width: '200px' }}
                  />
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

      </div>
    </div>
  );
};

export default TeacherClass;