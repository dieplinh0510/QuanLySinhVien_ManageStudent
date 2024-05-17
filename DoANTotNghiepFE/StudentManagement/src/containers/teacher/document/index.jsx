import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UploadActions from '../../../store/actions/UploadActions';
import Title from '../../../hook/title/Title';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import Button from '../../../hook/button';
import Pagination from '../../../components/paging';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import { Api, AuthKeys } from '../../../constant';
import StorageService from '../../../utils/storage.service';

const Documents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    documents = [],
    pagingDocuments = null,
  } = useSelector((state) => state.upload);

  const [searchPayload, setSearchPayload] = React.useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let payload = { ...searchPayload, classroomCode: queryParams.get('classroomCode') };

    dispatch(UploadActions.getAllDocumentsRequest(payload));

    setSearchPayload(payload);
    // find role name
    setRoleName(JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName);
  }, []);

  const handlePageChange = (pageNumber) => {
    dispatch(
      UploadActions.getAllDocumentsRequest({
        ...searchPayload,
        pageIndex: pageNumber,
      }),
    );

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  const handleDownload = (item) => {
    console.log(item);
    if (!(item.status !== 1 || item.status !== 2)) {
      return;
    }
    console.log(item);
    dispatch(
      UploadActions.downloadDocumentRequest({
        idFile: item.id,
        fileName: item.fileName,
      }),
    );
  };

  const handleChooseFile = () => {
    // open file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      dispatch(
        UploadActions.uploadDocumentRequest({
          classroomCode: searchPayload.classroomCode,
          file: file,
          searchPayload,
        }),
      );
    };
  };

  return (
    <div className={'file-status-page'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '10px',
        }}
      >
        <Title text={'TÀI LIỆU  '} />
        {roleName === AuthKeys.ROLE_TEACHER ? (
          <Button title={'Upload tài liệu'} onClick={() => handleChooseFile()} />
        ) : (
          <span></span>
        )}
      </div>
      <div className={'file-status-box'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr style={{ textAlign: 'center' }}>
              <th
                style={{
                  width: '10%',
                  fontWeight: 'bold',
                }}
              >
                STT
              </th>
              <th
                style={{
                  width: '40%',
                  fontWeight: 'bold',
                }}
              >
                Tên tài liệu
              </th>
              <th
                style={{
                  width: '20%',
                  fontWeight: 'bold',
                }}
              >
                Ngày upload
              </th>
              <th
                style={{
                  width: '15%',
                  fontWeight: 'bold',
                }}
              >
                Xem tài liệu
              </th>
              <th style={{ width: '15%', fontWeight: 'bold' }}>Tải xuống</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {documents &&
              documents.length > 0 &&
              documents.map((item, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td
                    style={{
                      width: '10%',
                    }}
                  >
                    {(searchPayload.pageIndex - 1) * 10 + index + 1}
                  </td>
                  <td
                    style={{
                      width: '40%',
                      overflow: 'hidden',
                    }}
                  >
                    {item.keyResponse}
                  </td>
                  <td
                    style={{
                      width: '20%',
                    }}
                  >
                    {item.createDatetime}
                  </td>
                  <td style={{ width: '15%', margin: '4px 0' }}>
                    <Button
                      title={'Xem'}
                      onClick={() => {
                        window.open(Api.BASE_URL + item.filePath, '_blank');
                      }}
                      customStyle={{
                        width: '100px',
                        margin: '2px 0',
                      }}
                    />
                  </td>
                  <td
                    style={{
                      width: '15%',
                      textAlign: 'center',
                      margin: '4px 0',
                    }}
                  >
                    <div
                      style={{
                        height: '40px',
                      }}
                    >
                      <Button
                        title={'Download'}
                        onClick={() => handleDownload(item)}
                        width={'100px'}
                        customStyle={{ margin: '2px 0' }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
      </div>

      {/* Paging */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        {pagingDocuments && (
          <Pagination
            totalPages={pagingDocuments?.totalPages}
            currentPage={pagingDocuments?.pageIndex + 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true}>
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}></LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Documents;
