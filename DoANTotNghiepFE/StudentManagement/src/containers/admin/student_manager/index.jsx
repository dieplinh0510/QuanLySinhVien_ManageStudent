import React, { useEffect } from 'react';
import Input from '../../../hook/input';
import './style.scss';
import Pulldown from '../../../hook/pulldown';
import Button from '../../../hook/button';
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as CourseActions from '../../../store/actions/CourseActions';
import * as ClassActions from '../../../store/actions/ClassActions';
import Space from '../../../hook/space/space';
import * as StudentActions from '../../../store/actions/StudentActions';
import { toast } from 'react-toastify';
import Pagination from '../../../components/paging';
import { AuthKeys, UploadType } from '../../../constant';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';
import storageService from '../../../utils/storage.service';

const StudentManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, courses = [], error = null } = useSelector((state) => state.course);
  const { classes = [] } = useSelector((state) => state.class);
  const { students = [], paging = null } = useSelector((state) => state.student);
  const [role, setRole] = React.useState(AuthKeys.ROLE_ADMIN);
  const [lstCourse, setLstCourse] = React.useState([]);
  const [course, setCourse] = React.useState(null);
  const [clazz, setClass] = React.useState(null);
  const [lstClass, setLstClass] = React.useState([]);
  const [searchPayload, setSearchPayload] = React.useState({
    studentCode: '',
    courseId: null,
    classroomId: null,
    pointStart: null,
    pointEnd: null,
    pageIndex: 1,
    pageSize: 10,
  });
  const [showCreate, setShowCreate] = React.useState(false);
  const [payloadCreate, setPayloadCreate] = React.useState({
    studentName: '',
    studentCode: '',
    studentImage: null,
    idCourse: 0,
    idClass: 0,
  });
  const [showEdit, setShowEdit] = React.useState(false);
  const [payloadEdit, setPayloadEdit] = React.useState(null);
  const [showDelete, setShowDelete] = React.useState(false);
  const [payloadDelete, setPayloadDelete] = React.useState(null);

  // get list course
  useEffect(() => {
    dispatch(CourseActions.getListCourseRequest({}));
    setRole(JSON.parse(storageService.get(AuthKeys.CURRENT_USER)).roleName);
  }, []);

  useEffect(() => {
    if (courses) {
      let arr = courses.map((item) => {
        return { label: item.nameCourse, value: item.id };
      });
      setLstCourse([...arr, { label: 'Hủy bỏ', value: null }]);
    }
  }, [courses]);

  // Get list class by course
  useEffect(() => {
    if (course) {
      dispatch(ClassActions.getListClassByCourseRequest({ courseId: course.value }));
      setClass(null);
      setSearchPayload({ ...searchPayload, classroomId: null });
    }
  }, [course]);

  useEffect(() => {
    if (classes) {
      setLstClass([...classes.map((item) => {
        return { label: item.nameClass, value: item.id };
      }), { label: 'Hủy bỏ', value: null }]);
    }
  }, [classes]);

  const handleSearchStudent = () => {
    // validate input not blank
    let isValid = searchPayload.studentCode !== ''
      || searchPayload.courseId != null || searchPayload.classroomId != null
      || searchPayload.pointStart != null || searchPayload.pointEnd != null;

    if (!isValid) {
      toast.info('Vui lòng nhập thông tin tìm kiếm');
      return;
    }
    dispatch(StudentActions.searchStudentRequest(searchPayload));
  };

  const handleCreateStudent = () => {
    // validate input not blank
    if (!payloadCreate.studentCode
      && !payloadCreate.studentName
      && !payloadCreate.idCourse
      && !payloadCreate.idClass
    ) {
      toast.info('Vui lòng nhập thông tin sinh viên');
      return;
    }

    dispatch(StudentActions.createStudentRequest({
      ...payloadCreate,
      idClass: payloadCreate.idClass.value,
      idCourse: payloadCreate.idCourse.value,
    }));

    setShowCreate(false);
    // clear data
    setPayloadCreate({
      studentName: '',
      studentCode: '',
      studentImage: null,
      idCourse: 0,
      idClass: 0,
    });
  };

  const handleEditStudent = () => {
    // validate input not blank
    if (!payloadEdit.studentCode
      && !payloadEdit.studentName
      && !payloadEdit.idCourse
      && !payloadEdit.idClass
    ) {
      toast.info('Vui lòng nhập thông tin sinh viên');
      return;
    }

    dispatch(StudentActions.editStudentRequest({
      payload: {
        ...payloadEdit,
        idClass: payloadEdit.idClass.value,
        idCourse: payloadEdit.idCourse.value,
      },
      payloadSearch: searchPayload,
    }));

    setShowEdit(false);
  };

  const handleDeleteStudent = () => {
    dispatch(StudentActions.deleteStudentRequest({
      payload: { studentCode: payloadDelete.studentCode },
      payloadSearch: searchPayload,
    }));

    setShowDelete(false);
  };

  const handlePageChange = (pageNumber) => {
    dispatch(StudentActions.searchStudentRequest({
      ...searchPayload,
      pageIndex: pageNumber,
    }));

    setSearchPayload({ ...searchPayload, pageIndex: pageNumber });
  };

  return (
    <div className={'student-manager-page'}>
      <div className={'student-id-box'}>
        <Input value={searchPayload.studentCode}
               onChange={(value) => setSearchPayload({ ...searchPayload, studentCode: value })}
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
            <Pulldown items={lstCourse}
                      label={'Chọn khóa'}
                      value={course}
                      ignores={[]}
                      setSelected={(value) => {
                        setCourse(value);
                        setSearchPayload({ ...searchPayload, courseId: value.value, classroomId: null });
                      }}
                      isRequired={false}
                      error={false}
                      customStyle={{ width: '140px', backgroundColor: '#f5f5f5' }}
            />
          </div>
          <div className={'select-box'}>
            <p>Lớp:</p>
            <Pulldown items={lstClass}
                      label={'Chọn lớp'}
                      value={clazz}
                      ignores={[]}
                      setSelected={(value) => {
                        setClass(value);
                        setSearchPayload({ ...searchPayload, classroomId: value.value });
                      }}
                      isRequired={false}
                      error={false}
                      customStyle={{ width: '140px', backgroundColor: '#f5f5f5' }}
            />
          </div>
        </div>

        <div className={'input-container'}>
          <p>Điểm tích lũy:</p>

          <div className={'input-box'}>
            <p>Từ</p>
            <Input value={searchPayload.pointStart}
                   onChange={(value) => setSearchPayload({ ...searchPayload, pointStart: value })}
                   label=""
                   isRequired={false}
                   placeHolder="Nhập điểm"
                   errorMessage="Điểm không được để trống"
                   error={false}
                   isDisable={false}
                   customStyle={{ width: '80px', backgroundColor: '#f5f5f5' }}
            />
          </div>

          <div className={'input-box'}>
            <p>Đến</p>
            <Input value={searchPayload.pointEnd}
                   onChange={(value) => setSearchPayload({ ...searchPayload, pointEnd: value })}
                   label=""
                   isRequired={false}
                   placeHolder="Nhập điểm"
                   errorMessage="Điểm không được để trống"
                   error={false}
                   isDisable={false}
                   customStyle={{ width: '80px', backgroundColor: '#f5f5f5' }}
            />
          </div>
        </div>

        <div>
          <Button title={'Tìm kiếm'}
                  onClick={handleSearchStudent}
                  width={'80px'}
                  customStyle={{ padding: '6px 0', height: '38px' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className={'title-container'}>
        <p>Danh sách sinh viên:</p>
        {
          role === AuthKeys.ROLE_ADMIN && (
            <Button title={'Thêm sinh viên'} onClick={() => setShowCreate(true)} />
          )
        }
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
              {
                role === AuthKeys.ROLE_ADMIN && (
                  <th></th>
                )
              }
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {students && students.length > 0 && students.map((item, index) => (
              <tr style={{ cursor: 'pointer' }} key={index}>
                <td
                  onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{((searchPayload.pageIndex - 1) * 10) + index + 1}</td>
                <td onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{item.studentCode}</td>
                <td onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{item.studentName}</td>
                <td onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{item.courseName}</td>
                <td onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{item.classroomName}</td>
                <td
                  onClick={() => navigate(`/students/detail?studentId=${item.studentId}`)}>{item.accumulatedPoints}</td>
                {
                  role === AuthKeys.ROLE_ADMIN && (
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
                                  setShowEdit(true);
                                  setPayloadEdit(item);
                                }}
                                width={'50px'}
                                customStyle={{ padding: '6px 0' }}
                        />
                        <Button title={'Xoá'}
                                onClick={() => {
                                  setShowDelete(true);
                                  setPayloadDelete(item);
                                }}
                                width={'50px'}
                                customStyle={{ padding: '6px 0' }}
                        />
                      </div>
                    </td>
                  )
                }
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

      </div>

      {/* Paging */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
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


      {/* Modal show create */}
      <MDBModal open={showCreate} tabIndex="-1" onClose={() => setShowCreate(false)}>
        <MDBModalDialog size="fullscreen-sm-down">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Thêm sinh viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowCreate(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadCreate.studentCode}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, studentCode: value })}
                       label="Mã sinh viên"
                       isRequired={true}
                       placeHolder="Nhập mã sinh viên"
                       errorMessage="Mã sinh viên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadCreate.studentName}
                       onChange={(value) => setPayloadCreate({ ...payloadCreate, studentName: value })}
                       label="Họ tên sinh viên"
                       isRequired={true}
                       placeHolder="Nhập họ tên"
                       errorMessage="Họ tên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn khoá</span>
                <Pulldown items={lstCourse}
                          label={'Không được để trống'}
                          value={payloadCreate.idCourse}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadCreate({ ...payloadCreate, idCourse: value, idClass: 0 });
                            setCourse(value);
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn lớp</span>
                <Pulldown items={lstClass}
                          label={'Không được để trống'}
                          value={payloadCreate.idClass}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadCreate({ ...payloadCreate, idClass: value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                {/*<Input value={payloadCreate.studentImage}*/}
                {/*       onChange={(value) => setPayloadCreate({ ...payloadCreate, studentImage: value })}*/}
                {/*       label="Hình ảnh"*/}
                {/*       isRequired={false}*/}
                {/*       placeHolder="Chọn hình ảnh"*/}
                {/*       errorMessage=""*/}
                {/*       error={false}*/}
                {/*       isDisable={false}*/}
                {/*       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}*/}
                {/*/>*/}
                <MDBFile label="Hình ảnh" id="customFile"
                         onChange={(e) => setPayloadCreate({ ...payloadCreate, studentImage: e.target.files[0] })} />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Thêm dữ liệu từ file'}
                          onClick={() => navigate(`/teacher/file-input?uploadType=${UploadType.STUDENT}`)}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Lưu'}
                          onClick={() => handleCreateStudent()}
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
              <MDBModalTitle>Sửa sinh viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowEdit(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <Input value={payloadEdit?.studentCode}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, studentCode: value })}
                       label="Mã sinh viên"
                       isRequired={true}
                       placeHolder="Nhập mã sinh viên"
                       errorMessage="Mã sinh viên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.studentName}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, studentName: value })}
                       label="Họ tên sinh viên"
                       isRequired={true}
                       placeHolder="Nhập họ tên"
                       errorMessage="Họ tên không được để trống"
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn khoá</span>
                <Pulldown items={lstCourse}
                          label={'Không được để trống'}
                          value={payloadEdit?.idCourse}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadEdit({ ...payloadEdit, idCourse: value });
                            setCourse(value);
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <span style={{ fontSize: '14px' }}>Chọn lớp</span>
                <Pulldown items={lstClass}
                          label={'Không được để trống'}
                          value={payloadEdit?.idClass}
                          ignores={[]}
                          setSelected={(value) => {
                            setPayloadEdit({ ...payloadEdit, idClass: value });
                          }}
                          isRequired={false}
                          error={false}
                          customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <Input value={payloadEdit?.studentImage}
                       onChange={(value) => setPayloadEdit({ ...payloadEdit, studentImage: value })}
                       label="Hình ảnh"
                       isRequired={false}
                       placeHolder="Chọn hình ảnh"
                       errorMessage=""
                       error={false}
                       isDisable={false}
                       customStyle={{ width: '100%', backgroundColor: '#f5f5f5' }}
                />

                <Space height={20} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button title={'Thêm dữ liệu từ file'}
                          onClick={() => console.log('Thêm từ file')}
                          width={'200px'}
                          customStyle={{ padding: '6px 0' }}
                  />
                  <Button title={'Lưu'}
                          onClick={() => handleEditStudent()}
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
              <MDBModalTitle>Xoá sinh viên</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setShowDelete(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p style={{ textAlign: 'center' }}>Bạn có chắc muốn xoá sinh viên này không?</p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button title={'Có'}
                        onClick={() => handleDeleteStudent()}
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

export default StudentManager;