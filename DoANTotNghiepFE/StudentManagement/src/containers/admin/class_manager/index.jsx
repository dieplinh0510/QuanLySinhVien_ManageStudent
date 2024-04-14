import React from 'react';
import './style.scss';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const classes = [
  {
    classId: 'INT3301',
    subjectName: 'Lập trình web',
    quantity: 30,
    teacher: 'Nguyễn Văn A',
  },
  {
    classId: 'INT3302',
    subjectName: 'Lập trình web',
    quantity: 30,
    teacher: 'Nguyễn Văn B',
  },
  {
    classId: 'INT3303',
    subjectName: 'Lập trình web',
    quantity: 30,
    teacher: 'Nguyễn Văn C',
  },
];

const ClassManager = () => {
  return (
    <div className={'class-manager-page'}>
      <div className={'subject-input-box'}>
        <p>Mã môn: </p>
        <Input
          value={''}
          onChange={(value) => console.log(value)}
          label=""
          isRequired={false}
          placeHolder="Nhập mã môn"
          errorMessage=""
          error={false}
          isDisable={false}
          customStyle={{
            minWidth: '300px',
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách sinh viên:</p>
        <Button title={'Thêm lớp học'} onClick={() => console.log('search')} />
      </div>

      {/* Table student */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã lớp</th>
              <th>Tên môn</th>
              <th>Số lượng</th>
              <th>Giảng viên</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {classes && classes.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.classId}</td>
                <td>{item.subjectName}</td>
                <td>{item.quantity}</td>
                <td>{item.teacher}</td>
                <td style={{ width: '180px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                    alignItems: 'center',
                    width: '180px',
                  }}>
                    <Button title={'Thêm'}
                            onClick={() => console.log(item)}
                            width={'50px'}
                            customStyle={{ padding: '6px 0' }}
                    />
                    <Button title={'Sửa'}
                            onClick={() => console.log(item)}
                            width={'50px'}
                            customStyle={{ padding: '6px 0' }}
                    />
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
      </div>

    </div>
  );
};

export default ClassManager;