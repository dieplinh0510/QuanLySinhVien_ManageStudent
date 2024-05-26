import React, { useEffect, useState } from 'react';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UploadActions from '../../../store/actions/UploadActions';
import StorageService from '../../../utils/storage.service';
import { Api, AuthKeys } from '../../../constant';
import Title from '../../../hook/title/Title';
import Button from '../../../hook/button';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import rightArrowIcon from '../../../assets/icon/right-arrow-icon.png';
import Pagination from '../../../components/paging';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const ClassDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    studentDocuments = [],
    pagingStudentDocuments = null,
  } = useSelector((state) => state.upload);

  const [searchPayload, setSearchPayload] = React.useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let payload = { ...searchPayload, documentId: queryParams.get('documentId') };

    dispatch(UploadActions.getAllDocumentsByDocumentIdRequest(payload));

    setSearchPayload(payload);
    // find role name
    setRoleName(JSON.parse(StorageService.get(AuthKeys.CURRENT_USER)).roleName);
  }, []);

  const handleDownload = (item) => {
    console.log(item)
    dispatch(
      UploadActions.downloadAssignmentRequest({
        userDocumentId: item.userDocumentId,
        fileName: item.filename
      }),
    );
  }

  const handlePageChange = (pageNumber) => {
    dispatch(
      UploadActions.getAllDocumentsByDocumentIdRequest({
        ...searchPayload,
        pageIndex: pageNumber,
      }),
    );

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
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
      </div>
      <div className={'file-status-box'}>
        <MDBTable striped hover>
          <MDBTableHead>
            <tr style={{ textAlign: 'center' }}>
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                STT
              </th>
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                Mã sinh viên
              </th>
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                Họ tên
              </th>
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                Bài làm
              </th>
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                Ngày nộp
              </th>
              <th style={{ fontWeight: 'bold' }}>Trạng thái</th>
              <th style={{ fontWeight: 'bold' }}>Tải xuống</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {studentDocuments &&
              studentDocuments.length > 0 &&
              studentDocuments.map((item, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td>
                    {(searchPayload.pageIndex - 1) * 10 + index + 1}
                  </td>
                  <td
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    {item.studentCode}
                  </td>
                  <td
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    {item.studentName}
                  </td>
                  <td
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    {item.filename}
                  </td>
                  <td>
                    {item.submitDate}
                  </td>
                  <td style={{ width: '15%', margin: '4px 0' }}>
                    {item.status === false ? <span>Nộp muộn</span> : <span> </span>}
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
                        title={'Tải xuống'}
                        onClick={() => handleDownload(item)}
                        width={'120px'}
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
        {pagingStudentDocuments && (
          <Pagination
            totalPages={pagingStudentDocuments?.totalPages}
            currentPage={pagingStudentDocuments?.pageIndex + 1}
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

export default ClassDocument;
