import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import Button from '../../../hook/button';
import './style.scss';
import {
  MDBBtn,
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as SubjectActions from '../../../store/actions/SubjectActions';
import Space from '../../../hook/space/space';
import Pulldown from '../../../hook/pulldown';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const SubjectManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects = [], semesters = [], loading = false } = useSelector((state) => state.subject);
  const [searchPayload, setSearchPayload] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const [payloadCreate, setPayloadCreate] = React.useState({
    subjectCode: '',
    subjectName: '',
    numberOfCredits: '',
    idSemester: 0,
  });
  const [showEdit, setShowEdit] = React.useState(false);
  const [payloadEdit, setPayloadEdit] = React.useState(null);
  const [showDelete, setShowDelete] = React.useState(false);
  const [payloadDelete, setPayloadDelete] = React.useState(null);


  useEffect(() => {
    dispatch(SubjectActions.getSubjectsRequest({ subjectName: searchPayload }));
    dispatch(SubjectActions.getListSemesterRequest());
  }, []);


  const handleCreateSubject = () => {
    if (payloadCreate?.subjectCode === '') {
      toast.error('Mã môn học không được để trống');
      return;
    }
    if (payloadCreate?.subjectName === '') {
      toast.error('Tên môn học không được để trống');
      return;
    }
    if (payloadCreate?.numberOfCredits === 0) {
      toast.error('Số tín chỉ không được để trống');
      return;
    }
    if (payloadCreate?.idSemester === 0) {
      toast.error('Chưa chọn học kì');
      return;
    }
    dispatch(SubjectActions.createSubjectRequest({ ...payloadCreate, idSemester: payloadCreate.idSemester.value }));
    handleCancelCreate();
  };

  const handleCancelCreate = () => {
    setPayloadCreate({
      subjectCode: '',
      subjectName: '',
      numberOfCredits: '',
      idSemester: 0,
    });
    setShowCreate(false);
  };

  const findSemester = (id) => {
    return semesters.find((item) => item.value === id);
  };

  const handleEditSubject = () => {
    if (payloadEdit.subjectCode === '') {
      toast.error('Mã môn học không được để trống');
      return;
    }
    if (payloadEdit.subjectName === '') {
      toast.error('Tên môn học không được để trống');
      return;
    }
    if (payloadEdit.numberOfCredits === 0) {
      toast.error('Số tín chỉ không được để trống');
      return;
    }
    if (payloadEdit.idSemester === 0) {
      toast.error('Chưa chọn học kì');
      return;
    }
    dispatch(SubjectActions.editSubjectRequest(payloadEdit));
    handleCancelEdit();
  };

  const handleCancelEdit = () => {
    setPayloadEdit(null);
    setShowEdit(false);
  };

  const handleDeleteSubject = () => {
    dispatch(SubjectActions.deleteSubjectRequest(payloadDelete));
    setShowDelete(false);
  };

  return (
    <div className={'subject-manager-page'}>
      <div className={'subject-input-box'}>
        <p>Tên môn: </p>
        <Input
          value={searchPayload}
          onChange={(value) => setSearchPayload(value)}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              dispatch(SubjectActions.getSubjectsRequest({ subjectName: searchPayload }));
            }
          }}
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

        <Space width={20} />

        <Button title={'Tìm kiếm'} onClick={() => {
          dispatch(SubjectActions.getSubjectsRequest({ subjectName: searchPayload }));
        }} customStyle={{ width: '120px' }} />
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách môn học:</p>
        <Button title={'Thêm môn học'} onClick={() => setShowCreate(true)} />
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
              <tr style={{ cursor: 'pointer' }} key={index}>
                <td onClick={() => navigate(`/admin/class-manager?subjectId=${item.id}`)}>{index + 1}</td>
                <td onClick={() => navigate(`/admin/class-manager?subjectId=${item.id}`)}>{item.subjectCode}</td>
                <td onClick={() => navigate(`/admin/class-manager?subjectId=${item.id}`)}>{item.subjectName}</td>
                <td onClick={() => navigate(`/admin/class-manager?subjectId=${item.id}`)}>{item.numberOfCredits}</td>
                <td onClick={() => navigate(`/admin/class-manager?subjectId=${item.id}`)}>{item.idSemester}</td>
                <td style={{ width: '120px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px',
                    alignItems: 'center',
                    width: '120px',
                  }}>
                    <Button title={'Sửa'}
                            onClick={() => {
                              setPayloadEdit(item);
                              setShowEdit(true);
                            }}
                            width={'50px'}
                            customStyle={{ padding: '6px 0' }}
                    />
                    <Button title={'Xoá'}
                            onClick={() => {
                              setPayloadDelete(item);
                              setShowDelete(true);
                            }}
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


      {/* Modal show create */}
      <MDBModal open={showCreate} tabIndex="-1" onClose={() => setShowCreate(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm môn học</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowCreate(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadCreate.subjectCode}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, subjectCode: value })}
                       label="Mã môn học"
                       isRequired={true}
                       placeHolder="Nhập mã môn học"
                       errorMessage="Mã môn học không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate.subjectName}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, subjectName: value })}
                       label="Tên môn học"
                       isRequired={true}
                       placeHolder="Nhập họ tên"
                       errorMessage="Tên môn học không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate.numberOfCredits}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, numberOfCredits: value })}
                       label="Số tín chỉ"
                       isRequired={true}
                       placeHolder="Nhập số tín chỉ"
                       errorMessage="Số tín chỉ không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn kì học</span>
                <Pulldown items={semesters}
                          label={'Không được để trống'}
                          value={payloadCreate.idSemester}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadCreate({ ...payloadCreate, idSemester: value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Thêm'}
                          onClick={() => handleCreateSubject()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Huỷ'}
                          onClick={() => handleCancelCreate()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                </div>

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/* Modal show edit */}
      <MDBModal open={showEdit} tabIndex="-1" onClose={() => setShowEdit(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Sửa môn học</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEdit(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadEdit?.subjectCode}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, subjectCode: value })}
                       label="Mã môn học"
                       isRequired={true}
                       placeHolder="Nhập mã môn học"
                       errorMessage="Mã môn học không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.subjectName}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, subjectName: value })}
                       label="Tên môn học"
                       isRequired={true}
                       placeHolder="Nhập tên môn học"
                       errorMessage="Tên môn học không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.numberOfCredits}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, numberOfCredits: value })}
                       label="Số tín chỉ"
                       isRequired={true}
                       placeHolder="Nhập số tín chỉ"
                       errorMessage="Số tín chỉ không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn kì học</span>
                <Pulldown items={semesters}
                          label={'Không được để trống'}
                          value={findSemester(payloadEdit?.idSemester)}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadEdit({ ...payloadEdit, idSemester: value.value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Sửa'}
                          onClick={() => handleEditSubject()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Huỷ'}
                          onClick={() => handleCancelEdit()}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                </div>

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/* Modal show delete */}
      <MDBModal open={showDelete} tabIndex="-1" onClose={() => setShowDelete(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Xoá môn học</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowDelete(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xoá môn học này không?</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button title={'Có'}
                        onClick={() => handleDeleteSubject()}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
                <Button title={'Không'}
                        onClick={() => setShowDelete(false)}
                        width={'200px'}
                        customStyle={{ padding: '6px 0' }}
                />
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      <MDBModal open={loading}>
        <MDBModalDialog size="xl" centered={true}>
          <div style={{ width: '100%', height: '100%' }}>
            <LoadingOverlay active={loading} spinner={<Oval color={'#4fa94d'} />} text={'Loading...'}>
            </LoadingOverlay>
          </div>
        </MDBModalDialog>
      </MDBModal>

    </div>
  );
};

export default SubjectManager;