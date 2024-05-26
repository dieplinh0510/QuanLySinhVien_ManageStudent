import React, { useEffect, useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as UploadActions from '../../../store/actions/UploadActions';
import Title from '../../../hook/title/Title';
import {
  MDBBtn,
  MDBFile,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import Button from '../../../hook/button';
import Pagination from '../../../components/paging';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import { Api, AuthKeys } from '../../../constant';
import StorageService from '../../../utils/storage.service';
import rightArrowIcon from '../../../assets/icon/right-arrow-icon.png';
import Input from '../../../hook/input';
import Space from '../../../hook/space/space';
import Pulldown from '../../../hook/pulldown';

const documentTypes = [
  { value: 0, label: 'Bài tập' },
  { value: 1, label: 'Tài liệu' },
];

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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadPayload, setUploadPayload] = useState({
    type: 0,
    title: '',
    expiredDate: '',
    file: null,
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatePayload, setUpdatePayload] = useState();


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
    dispatch(
      UploadActions.downloadDocumentRequest({
        documentId: item.documentId,
        fileName: item.path.split('/')[1],
      }),
    );
  };

  const handleChooseFile = () => {
    setShowUploadModal(true);
  };

  const handleClickArrowIcon = (item) => {
    let urlTeacher = `/teacher/class-document?documentId=${item.documentId}`;
    navigate(urlTeacher);
  };

  const handleCancelUpload = () => {
    setShowUploadModal(false);
    setUploadPayload({
      type: 0,
      title: '',
      expiredDate: '',
      file: null,
    });
  };

  const handleCancelUpdate = () => {
    setShowUpdateModal(false);
    setUpdatePayload(null);
  };

  const handleUploadDocument = () => {
    dispatch(UploadActions.uploadDocumentRequest({
      ...uploadPayload,
      expiredDate: uploadPayload.expiredDate + ' 00:00:00',
      classroomCode: searchPayload.classroomCode,
      searchPayload,
    }));
    setShowUploadModal(false);

  };

  const handleUpdateDocument = () => {

    dispatch(UploadActions.updateDocumentRequest({
      ...updatePayload,
      expiredDate: updatePayload.expiredDate + ' 00:00:00',
      classroomCode: searchPayload.classroomCode,
      searchPayload,
    }));

    setShowUpdateModal(false);
  };

  const handleChooseHomeworks = (item) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      dispatch(
        UploadActions.submitHomeworkRequest({
          documentId: item.documentId,
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
                Tên tài liệu
              </th>
              {
                roleName === AuthKeys.ROLE_TEACHER && <th
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  Số lượng SV đã hoàn thành
                </th>
              }
              <th
                style={{
                  fontWeight: 'bold',
                }}
              >
                Ngày hết hạn
              </th>
              {
                roleName === AuthKeys.ROLE_TEACHER && <th
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                </th>
              }
              {roleName === AuthKeys.ROLE_TEACHER && <th
                style={{
                  width: '10%',
                  fontWeight: 'bold',
                }}
              >
                Xem tài liệu
              </th>}

              <th style={{ width: '10%', fontWeight: 'bold' }}>Tải xuống</th>
              <th style={{
                width: '10%',
                fontWeight: 'bold',
              }}>{roleName === AuthKeys.ROLE_STUDENT ? 'Nộp bài' : 'Cập nhập'} </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {documents &&
              documents.length > 0 &&
              documents.map((item, index) => (
                <tr key={index} style={{ textAlign: 'center' }}>
                  <td>
                    {(searchPayload.pageIndex - 1) * 10 + index + 1}
                  </td>
                  <td
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    {item.title}
                  </td>
                  {
                    roleName === AuthKeys.ROLE_TEACHER && <td>
                      {item.nowStudent} / {item.sumStudent}
                    </td>
                  }
                  <td>
                    {item.expiredDate}
                  </td>
                  {
                    roleName === AuthKeys.ROLE_TEACHER && <td>
                      {
                        item.type === 0 &&
                        <img src={rightArrowIcon} alt="status" style={{ cursor: 'pointer', width: '20px' }}
                             onClick={() => handleClickArrowIcon(item)} />
                      }
                    </td>
                  }

                  {roleName === AuthKeys.ROLE_TEACHER && <td style={{ margin: '4px 0' }}>
                    <Button
                      title={'Xem'}
                      onClick={() => {
                        window.open(Api.BASE_URL + item.path, '_blank');
                      }}
                      customStyle={{
                        width: '80px',
                        margin: '2px 0',
                      }}
                    />
                  </td>}

                  <td
                    style={{
                      textAlign: 'center',
                      margin: '4px 0',
                    }}
                  >
                    <div
                      style={{
                        height: '40px',
                        margin: '0px 4px',
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
                  <td
                    style={{
                      textAlign: 'center',
                      margin: '4px 0',
                    }}
                  >
                    <div
                      style={{
                        height: '40px',
                        margin: '0px 4px',
                      }}
                    >
                      {roleName === AuthKeys.ROLE_TEACHER ? <Button
                        title={'Cập nhập'}
                        onClick={() => {
                          setShowUpdateModal(true);
                          setUpdatePayload({
                            ...item,
                            expiredDate: item.expiredDate.split('T')[0],
                          });
                        }}
                        width={'100px'}
                        customStyle={{ margin: '2px 0' }}
                      /> : <Button
                        title={'Nộp bài'}
                        onClick={() => {
                          handleChooseHomeworks(item);
                        }}
                        width={'100px'}
                        customStyle={{ margin: '2px 0' }}
                        disabled={item.type !== 0}
                      />}
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

      {/*Model upload*/}
      <MDBModal open={showUploadModal} tabIndex="-1" onClose={() => handleCancelUpload()}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Upload tài liệu</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => handleCancelUpload()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Input value={uploadPayload?.title}
                     onChange={(value) => setUploadPayload({ ...uploadPayload, title: value })}
                     label="Tiêu đề"
                     isRequired={true}
                     placeHolder="Nhập tiêu đề"
                     errorMessage="Tiêu đề không được để trống"
                     error={false}
                     isDisable={false}
                     customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />


              <Space height={20} />
              <Input value={uploadPayload?.expiredDate}
                     onChange={(value) => setUploadPayload({
                       ...uploadPayload,
                       expiredDate: value,
                     })}
                     label="Ngày hết hạn"
                     isRequired={true}
                     placeHolder="Nhập ngày hết hạn"
                     errorMessage="Ngày hết hạn không được để trống"
                     error={false}
                     isDisable={false}
                     type={'date'}
                     customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />

              <Space height={20} />

              <MDBFile label="Tải tệp" id="customFile"
                       onChange={(e) => {
                         setUploadPayload({
                           ...uploadPayload,
                           file: e.target.files[0],
                         });
                       }
                       }
              />

              <Space height={20} />

              <Pulldown value={documentTypes.filter(item => item.value === uploadPayload?.type)[0]}
                        setSelected={(value) => setUploadPayload({ ...uploadPayload, type: value.value })}
                        items={documentTypes}
                        ignores={[]}
                        label={'Loại tài liệu'}
                        customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                        error={false}
                        isDisable={false}
              />

              <Space height={20} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button title={'Tải lên'}
                        onClick={() => handleUploadDocument()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
                <Button title={'Huỷ'}
                        onClick={() => handleCancelUpload()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
              </div>

            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/*Model update*/
      }
      <MDBModal open={showUpdateModal} tabIndex="-1" onClose={() => handleCancelUpdate()}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Cập nhập tài liệu</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => handleCancelUpdate()}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Input value={updatePayload?.title}
                     onChange={(value) => setUpdatePayload({ ...updatePayload, title: value })}
                     label="Tiêu đề"
                     isRequired={true}
                     placeHolder="Nhập tiêu đề"
                     errorMessage="Tiêu đề không được để trống"
                     error={false}
                     isDisable={false}
                     customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />

              <Space height={20} />

              <Input value={updatePayload?.expiredDate}
                     onChange={(value) => setUpdatePayload({ ...updatePayload, expiredDate: value })}
                     label="Ngày hết hạn"
                     isRequired={true}
                     placeHolder="Nhập ngày hết hạn"
                     errorMessage="Ngày hết hạn không được để trống"
                     error={false}
                     isDisable={false}
                     type={'date'}
                     customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
              />

              <Space height={20} />

              <MDBFile label="Tải tệp" id="customFile"
                       onChange={(e) => {
                         setUpdatePayload({
                           ...updatePayload,
                           file: e.target.files[0],
                         });
                       }
                       }
              />

              <Space height={20} />

              <Pulldown value={documentTypes.filter(item => item.value === updatePayload?.type)[0]}
                        setSelected={(value) => setUpdatePayload({ ...updatePayload, type: value.value })}
                        items={documentTypes}
                        ignores={[]}
                        label={'Loại tài liệu'}
                        customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                        error={false}
                        isDisable={false}
              />

              <Space height={20} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button title={'Cập nhập'}
                        onClick={() => handleUpdateDocument()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
                <Button title={'Huỷ'}
                        onClick={() => handleCancelUpdate()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
              </div>

            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>;

      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true}>
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}></LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>;
    </div>
  )
};

export default Documents;
