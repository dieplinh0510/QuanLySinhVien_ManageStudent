import React from 'react';
import './style.scss';
import { Api, AuthKeys } from '../../../../constant';
import editIcon from '../../../../assets/icon/edit-icon.png';
import Space from '../../../../hook/space/space';

const StudentDetailInfo = ({ studentDetail, handleOpenChangeInfo, role }) => {
  return (
    <div className="detail-block">
      <div className="detail-left">
        <img
          src={
            studentDetail?.studentImage
              ? Api.BASE_URL + studentDetail?.studentImage
              : 'https://icdn.isrgrajan.com/in/2018/03/photo-1496509218134-fad73128e572-696x464.jpg'
          }
        />
      </div>
      <div className="detail-right">
        <div className="detail-item">
          <span className="detail-label">Họ tên:</span>
          <span className="detail-value">{studentDetail?.studentName}</span>
          <Space width={20} />
          {role === AuthKeys.ROLE_STUDENT && (
            <img src={editIcon} className={'edit-icon'} alt={'Edit icon'} onClick={() => handleOpenChangeInfo()} />
          )}
        </div>
        <div className="detail-item">
          <span className="detail-label">Lớp:</span>
          <span className="detail-value">{studentDetail?.classroomName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Mã học sinh:</span>
          <span className="detail-value">{studentDetail?.studentCode}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailInfo;
