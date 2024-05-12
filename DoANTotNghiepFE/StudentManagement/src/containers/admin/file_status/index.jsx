import React, { useEffect } from 'react';
import './style.scss';
import Title from '../../../hook/title/Title';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Button from '../../../hook/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/paging';
import * as UploadActions from '../../../store/actions/UploadActions';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const FileStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    fileStatus = [],
    paging = null,
  } = useSelector((state) => state.upload);

  const [searchPayload, setSearchPayload] = React.useState({
    pageIndex: 1,
    pageSize: 12,
  });

  useEffect(() => {
    dispatch(UploadActions.getFileStatusRequest(searchPayload));
  }, []);

  const handlePageChange = (pageNumber) => {
    dispatch(UploadActions.getFileStatusRequest({
      ...searchPayload,
      pageIndex: pageNumber,
    }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber })
  };

  const handleDownload = (item) => {
    if (item.status !== 1 && item.status !== 2) {
      return;
    }
    console.log(item)
    dispatch(UploadActions.downloadFileRequest({
      idFile: item.id,
      fileName: item.fileName
    }));
  }

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
                  <td>{((searchPayload.pageIndex - 1) * 10) + index + 1}</td>
                  <td>{item.fileName}</td>
                  <td>{item.createDatetime}</td>
                  <td style={{ width: '100px', margin: '4px 25px' }}>
                    {item.status === 1 ?
                      <p className={'success-message'}>Thành công</p> :
                      item.status === 2 ?
                        <p className={'error-message'}>Thất bại</p> :
                        <p className={'inprocess-message'}>Đang xử lý</p>
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
                        onClick={() => handleDownload(item)}
                        width={'100px'}
                        customStyle={{ padding: '6px 0' }}
                        disabled={item.status !== 1 && item.status !== 2}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }
          </MDBTableBody>
        </MDBTable>
      </div>

      {/* Paging */}
      <div style={{position: 'absolute', bottom: '20px', right: '20px'}}>
        {
          paging && (
            <Pagination
              totalPages={paging?.totalPages}
              currentPage={paging?.pageIndex + 1}
              onPageChange={handlePageChange}
            />
          )
        }
      </div>


      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true} >
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}>
            </LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>

    </div>
  );
};

export default FileStatus;