import React from 'react';
import './style.scss';
import Title from '../../../hook/title/Title';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Button from '../../../hook/button';

const fileStatus = [
  {
    id: 1,
    fileName: 'File 1',
    uploadDate: '2021-09-01',
    status: 1,
  },
  {
    id: 2,
    fileName: 'File 2',
    uploadDate: '2021-09-02',
    status: 2,
  },
  {
    id: 3,
    fileName: 'File 3',
    uploadDate: '2021-09-03',
    status: 3,
  },
  {
    id: 4,
    fileName: 'File 4',
    uploadDate: '2021-09-04',
    status: 2,
  },
  {
    id: 5,
    fileName: 'File 5',
    uploadDate: '2021-09-05',
    status: 1,
  },
];

const FileStatus = () => {
  return (
    <div className={'file-status-page'}>
      <Title text={'TRẠNG THÁI CÁC FILE ĐÃ UPLOAD'} />

      <div className={'file-status-box'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr>
              <th>STT</th>
              <th>Tên file</th>
              <th>Ngày upload</th>
              <th>Trạng thái</th>
              <th style={{ width: '100px' }}>Hành động</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              fileStatus && fileStatus.length > 0 && fileStatus.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.fileName}</td>
                  <td>{item.uploadDate}</td>
                  <td style={{ width: '100px', margin: '4px 25px' }}>
                    {item.status === 1 ?
                      <p className={'success-message'}>Thành công</p> :
                      item.status === 2 ?
                        <p className={'error-message'}>Thất bại</p> :
                        <p className={'inprocess-message'}>Đang upload</p>
                    }
                  </td>
                  <td>
                    <div style={{
                      width: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '40px',
                    }}>
                      <Button
                        title={'Download'}
                        onClick={() => console.log(item)}
                        width={'100px'}
                        customStyle={{ padding: '6px 0' }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </MDBTableBody>
        </MDBTable>
      </div>

    </div>
  );
};

export default FileStatus;