import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import Title from '../../../hook/title/Title';
import './style.scss';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Button from '../../../hook/button';
import Space from '../../../hook/space/space';
import { useDispatch, useSelector } from 'react-redux';
import * as StudentActions from '../../../store/actions/StudentActions';

const InputMark = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.student);
  const [studentId, setStudentId] = React.useState('HD01');

  useEffect(() => {
    dispatch(StudentActions.getAllStudentRequest());
  }, [dispatch]);

  const handleImportFile = () => {
    console.log('Import file');
  }

  return (
    <div className={'input-mark-page'}>
      <Title text="NHẬP ĐIỂM THEO MÔN HỌC" />

      <div className={'form-box'}>
        <p className={'label'}>Mã lớp:</p>
        <Input
          value={studentId}
          onChange={(value) => setStudentId(value)}
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
      </div>

      <p>Danh sách sinh viên trong lớp:</p>
      <MDBTable bordered striped hover>
        <TableHeaderListStudent />
        <MDBTableBody>
          {students && students.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.class}</td>
              <td>{item.subject}</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
              <td>8</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>9</td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5px', alignItems: 'center' }}>
                  <Button title={'Sửa'}
                          onClick={() => console.log(item)}
                          width={'50px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Space width={10} />
                  <Button title={'Xoá'}
                          onClick={() => console.log(item)}
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

    </div>
  );
};

const TableHeaderListStudent = () => {
  return <MDBTableHead>
    <tr>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>STT</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>Tên môn</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>Tên lớp</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>Mã lớp</th>
      <th colSpan={3} style={{ lineHeight: '30px' }}>Điểm thường xuyên</th>
      <th colSpan={2} style={{ lineHeight: '30px' }}>Điểm giữa kì</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>TB KTTX</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>Điểm thi</th>
      <th rowSpan={2} style={{ lineHeight: '56px' }}>Điểm TL</th>
      <th rowSpan={2} style={{ width: '100px' }}></th>
    </tr>
    <tr>
      <th style={{ lineHeight: '30px' }}>1</th>
      <th style={{ lineHeight: '30px' }}>2</th>
      <th style={{ lineHeight: '30px' }}>3</th>
      <th style={{ lineHeight: '30px' }}>1</th>
      <th style={{ lineHeight: '30px' }}>2</th>
    </tr>
  </MDBTableHead>
}

export default InputMark;