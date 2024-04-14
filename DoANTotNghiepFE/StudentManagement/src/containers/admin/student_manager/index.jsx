import React from 'react';
import Input from '../../../hook/input';
import './style.scss';
import Pulldown from '../../../hook/pulldown';
import Button from '../../../hook/button';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const courses = [
  {
    label: '2021',
    value: '2021',
  },
  {
    label: '2020',
    value: '2020',
  },
  {
    label: '2019',
    value: '2019',
  },
  {
    label: '2018',
    value: '2018',
  },
  {
    label: '2017',
    value: '2017',
  },
  {
    label: '2016',
    value: '2016',
  },
  {
    label: '2015',
    value: '2015',
  },
  {
    label: '2014',
    value: '2014',
  },
  {
    label: '2013',
    value: '2013',
  },
  {
    label: '2012',
    value: '2012',
  },
  {
    label: '2011',
    value: '2011',
  },
  {
    label: '2010',
    value: '2010',
  },
  {
    label: '2009',
    value: '2009',
  },
  {
    label: '2008',
    value: '2008',
  },
  {
    label: '2007',
    value: '2007',
  },
  {
    label: '2006',
    value: '2006',
  },
  {
    label: '2005',
    value: '2005',
  },
  {
    label: '2004',
    value: '2004',
  },
  {
    label: '2003',
    value: '2003',
  },
  {
    label: '2002',
    value: '2002',
  },
];

// fake data student
const students = [
  {
    id: '1',
    studentId: 'HD01',
    name: 'Nguyễn Văn A',
    course: '2021',
    class: 'CNTT1',
    average: 8.0,
  },
  {
    id: '2',
    studentId: 'HD02',
    name: 'Nguyễn Văn B',
    course: '2021',
    class: 'CNTT1',
    average: 8.0,
  },
  {
    id: '3',
    studentId: 'HD03',
    name: 'Nguyễn Văn C',
    course: '2021',
    class: 'CNTT1',
    average: 8.0,
  },
];

const StudentManager = () => {
  const [course, setCourse] = React.useState(null);

  return (
    <div className={'student-manager-page'}>
      <div className={'student-id-box'}>
        <Input value={''}
               onChange={(value) => console.log(value)}
               label="Mã sinh viên"
               isRequired={true}
               placeHolder="Nhập mã sinh viên"
               errorMessage="Mã sinh viên không được để trống"
               error={false}
               isDisable={false}
               customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
        />
      </div>

      <div className={'select-box-container'}>
        <div className={'select-container'}>
          <div className={'select-box'}>
            <p>Khóa:</p>
            <Pulldown items={courses}
                      label={'Chọn khóa'}
                      value={course}
                      ignores={[]}
                      setSelected={(value) => setCourse(value)}
                      isRequired={false}
                      error={false}
                      customStyle={{ width: '160px', backgroundColor: '#f5f5f5' }}
            />
          </div>
          <div className={'select-box'}>
            <p>Lớp:</p>
            <Pulldown items={courses}
                      label={'Chọn khóa'}
                      value={course}
                      ignores={[]}
                      setSelected={(value) => setCourse(value)}
                      isRequired={false}
                      error={false}
                      customStyle={{ width: '160px', backgroundColor: '#f5f5f5' }}
            />
          </div>
        </div>

        <div className={'input-container'}>
          <p>Điểm tích lũy:</p>

          <div className={'input-box'}>
            <p>Từ</p>
            <Input value={''}
                   onChange={(value) => console.log(value)}
                   label=""
                   isRequired={false}
                   placeHolder="Nhập điểm"
                   errorMessage="Điểm không được để trống"
                   error={false}
                   isDisable={false}
                   customStyle={{ width: '100px', backgroundColor: '#f5f5f5' }}
            />
          </div>

          <div className={'input-box'}>
            <p>Đến</p>
            <Input value={''}
                   onChange={(value) => console.log(value)}
                   label=""
                   isRequired={false}
                   placeHolder="Nhập điểm"
                   errorMessage="Điểm không được để trống"
                   error={false}
                   isDisable={false}
                   customStyle={{ width: '100px', backgroundColor: '#f5f5f5' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách sinh viên:</p>
        <Button title={'Thêm sinh viên'} onClick={() => console.log('search')} />
      </div>

      {/* Table student */}
      <div className={'table-container'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>MSV</th>
              <th>Họ tên</th>
              <th>Khoá</th>
              <th>Lớp</th>
              <th>TB điểm TL</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students && students.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.studentId}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.class}</td>
                <td>{item.average}</td>
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

export default StudentManager;