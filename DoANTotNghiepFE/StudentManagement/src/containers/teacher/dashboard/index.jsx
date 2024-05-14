import React, { useEffect } from 'react';
import './style.scss';
import * as DashboardActions from '../../../store/actions/DashboardActions';
import * as ClassActions from '../../../store/actions/ClassActions';
import { useDispatch, useSelector } from 'react-redux';
import ShapePieChart from './ShapePieChart';
import Title from '../../../hook/title/Title';
import { MDBModal, MDBModalDialog, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { getDetailClassRequest } from '../../../store/actions/ClassActions';
import LoadingOverlay from 'react-loading-overlay';
import { Oval } from 'react-loader-spinner';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading = false,
    statisticsPoint = {},
    statisticsPointStudent = {},
  } = useSelector((state) => state.dashboard);
  const { classDetail = {} } = useSelector((state) => state.class);

  const [dataChart, setDataChart] = React.useState([]);
  const [dataTable, setDataTable] = React.useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    dispatch(DashboardActions.getStatisticalPointRequest({
      classroomCode: queryParams.get('classroomCode'),
    }));

    dispatch(DashboardActions.getStatisticalPointStudentRequest({
      classroomCode: queryParams.get('classroomCode'),
    }));

    dispatch(ClassActions.getDetailClassRequest({
      classroomCode: queryParams.get('classroomCode'),
    }));

  }, []);

  const onChangeActiveIndex = (index) => {
    let pointName = dataChart[index].name;

    let arr = [];
    for (let key in statisticsPointStudent) {
      if (statisticsPointStudent[key] === pointName) {
        arr.push(JSON.parse(key));
      }
    }

    setDataTable(arr);
  };

  useEffect(() => {
    let arr = [];
    for (let key in statisticsPoint) {
      arr.push({
        name: key,
        value: statisticsPoint[key],
      });
    }
    setDataChart(arr);
  }, [statisticsPoint]);

  useEffect(() => {
    let arr = [];
    for (let key in statisticsPointStudent) {
      if (statisticsPointStudent[key] === 'A') {
        arr.push(JSON.parse(key));
      }
    }
    setDataTable(arr);
  }, [statisticsPointStudent]);

  return (
    <div>
      <Title text={`Thống kê ${classDetail.subjectName} - ${classDetail.classroomCode}`} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div style={{
          width: '25%',
        }}>
          <ShapePieChart data={dataChart} onChangeActiveIndex={onChangeActiveIndex} />
        </div>

        <div style={{
          width: '70%',
        }}>
          <TableView dataTable={dataTable} />
        </div>
      </div>

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

const TableView = ({ dataTable }) => {
  return <MDBTable striped hover>
    <MDBTableHead>
      <tr style={{ textAlign: 'center' }}>
        <th style={{
          width: '10%',
          fontWeight: 'bold',
          lineHeight: '0',
        }}>STT
        </th>
        <th style={{
          width: '40%', fontWeight: 'bold', lineHeight: '0',
        }}>Mã sinh viên
        </th>
        <th style={{
          width: '20%', fontWeight: 'bold', lineHeight: '0',
        }}>Tên sinh viên
        </th>
        <th style={{
          width: '15%', fontWeight: 'bold', lineHeight: '0',
        }}>Lớp
        </th>
        <th style={{ width: '15%', fontWeight: 'bold', lineHeight: '0' }}>Khóa</th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {
        dataTable && dataTable.length > 0 && dataTable.map((item, index) => (
          <tr key={index} style={{ textAlign: 'center' }}>
            <td style={{
              width: '10%', lineHeight: '0',
            }}>{index + 1}</td>
            <td style={{
              width: '40%',
              overflow: 'hidden', lineHeight: '0',
            }}>{item.studentCode}</td>
            <td style={{
              width: '20%', lineHeight: '0',
            }}>{item.studentName}</td>
            <td style={{ width: '15%', margin: '4px 0', lineHeight: '0' }}>
              {item.classroomName}
            </td>
            <td style={{
              width: '15%',
              textAlign: 'center',
              margin: '4px 0', lineHeight: '0',
            }}>{item.courseName}</td>
          </tr>
        ))
      }
    </MDBTableBody>
  </MDBTable>;
};

export default Dashboard;