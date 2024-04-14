import React from 'react';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import './style.scss';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

// fake data
const subjects = [
  {
    subjectId: 'INT3301',
    subjectName: 'Lập trình web',
    numberOfCredits: 3,
    semester: 1,
  },
  {
    subjectId: 'INT3302',
    subjectName: 'Lập trình web',
    numberOfCredits: 3,
    semester: 2,
  },
  {
    subjectId: 'INT3303',
    subjectName: 'Lập trình web',
    numberOfCredits: 3,
    semester: 3,
  }
];

const SubjectManager = () => {



  return (
    <div className={'subject-manager-page'}>
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
        <Button title={'Thêm môn học'} onClick={() => console.log('search')} />
      </div>

      {/* Table student */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Mã môn</th>
              <th>Tên môn</th>
              <th>Số tín chỉ</th>
              <th>Học kì</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {subjects && subjects.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.subjectId}</td>
                <td>{item.subjectName}</td>
                <td>{item.numberOfCredits}</td>
                <td>{item.semester}</td>
                <td style={{ width: '120px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                    alignItems: 'center',
                    width: '120px',
                  }}>
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

export default SubjectManager;