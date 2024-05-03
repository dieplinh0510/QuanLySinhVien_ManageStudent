import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { UploadType } from '../../../constant';
import * as UploadActions from '../../../store/actions/UploadActions';
import Title from '../../../hook/title/Title';
import * as XLSX from 'xlsx';
import { MDBFile } from 'mdb-react-ui-kit';
import Pulldown from '../../../hook/pulldown';
import Button from '../../../hook/button';
import Space from '../../../hook/space/space';
import { toast } from 'react-toastify';

const FileInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading = false,
    error = null,
    studentColumns = [],
    pointColumns = [],
    uploadId = null,
  } = useSelector((state) => state.upload);
  const [uploadType, setUploadType] = useState(null);
  const [file, setFile] = React.useState(null);
  const [columnsInFile, setColumnsInFile] = React.useState([]);
  const [columnsIgnore, setColumnsIgnore] = React.useState([]);
  const [payloadMapping, setPayloadMapping] = React.useState([]);

  const getColumnType = () => {
    if (+uploadType === UploadType.STUDENT) {
      return studentColumns;
    } else {
      return pointColumns;
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let type = queryParams.get('uploadType');
    setUploadType(type);

    if (+type === UploadType.STUDENT) {
      dispatch(UploadActions.getStudentColumnRequest());
    } else {
      dispatch(UploadActions.getPointColumnRequest());
    }
  }, []);

  const buildMap = () => {
    let map = new Map();
    payloadMapping.forEach(i => {
      map.set(i.column, i.value);
    });

    getColumnType().forEach(i => {
      if (!map.has(i.value)) {
        map.set(i.value, "");
      }
    });

    return map;
  }

  useEffect(() => {
    console.log("-----------------------------------" + uploadId)
    if (uploadId !== null) {
      dispatch(UploadActions.postMappingColumnRequest({
        id: uploadId,
        mapFields: Object.fromEntries(buildMap()),
        type: uploadType
      }));

      // clear all state
      setFile(null);
      setColumnsInFile([]);
      setColumnsIgnore([]);
      setPayloadMapping([]);
    }

  }, [uploadId]);

  // Read data from file
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        let arr = sheetData[0];
        setColumnsInFile(arr.map((item, index) => ({ value: index, label: item })) || []);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

  const getLabel = (item) => {
    let result = payloadMapping.find(i => i.column === item.value);
    if (result) {
      return { label: result.value, value: item.value };
    }
    return null;
  }

  const handleSubmit = () => {
    if (file === null) {
      toast.error("Vui lòng chọn file");
      return;
    }

    if (payloadMapping.length === 0) {
      toast.error("Vui lòng chọn cột mapping");
      return;
    }

    dispatch(UploadActions.uploadFileRequest({ file }));
  }

  return (
    <div className={"upload-container"}>
      <Title text="NHẬP ĐIỂM THEO MÔN HỌC" />

      <MDBFile label='Tải tệp' id='customFile' onChange={(e) => setFile(e.target.files[0])} />

      <div className={'column-container'}>
        {
          getColumnType().map((item, index) => (
            <div className={"column-item"} key={index}>
              <span>{item.label}</span>
              <Pulldown items={columnsInFile}
                        label={'Không được để trống'}
                        value={getLabel(item)}
                        ignores={payloadMapping.map(i => ({ value: i.index }))}
                        setSelected={(value) => {
                          // Check duplicate item in payloadMapping
                          if (
                            payloadMapping.filter(i => i.column === item.value && i.value === value.label).length === 0
                          ) {
                            let newPayloadMapping = payloadMapping.filter(i => i.column !== item.value);
                            setPayloadMapping([...newPayloadMapping, { column: item.value, value: value.label, index: value.value }]);
                            // setColumnsIgnore([...columnsIgnore, {...item, value: value.value}]);
                          }
                        }}
                        isRequired={false}
                        error={false}
                        customStyle={{ width: '80%', backgroundColor: '#f5f5f5' }}
              />
            </div>
          ))
        }
      </div>

      <div className={'button-contaner'}>
        <Button
          title={'Quay lại'}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className={'right-container'}>
          <Button
            title={'Làm mới'}
            onClick={() => {
              setColumnsIgnore([]);
              setPayloadMapping([]);
            }}
          />
          <Space width={50} />
          <Button
            title={'Lưu'}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>

    </div>
  );
};

export default FileInput;