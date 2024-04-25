import * as UploadTypes from '../types/UploadTypes';

const initialState = {
  loading: false,
  error: null,
  studentColumns: [],
  pointColumns: [],
  uploadId: null,
  fileStatus: [],
  paging: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UploadTypes.GET_STUDENT_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.GET_STUDENT_COLUMN_SUCCESS:
      return {
        ...state,
        studentColumns: action.payload,
        loading: false,
      };
    case UploadTypes.GET_STUDENT_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UploadTypes.GET_POINT_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.GET_POINT_COLUMN_SUCCESS:
      return {
        ...state,
        pointColumns: action.payload,
        loading: false,
      };
    case UploadTypes.GET_POINT_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API upload file
    case UploadTypes.UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadId: action.payload,
      };
    case UploadTypes.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API post mapping column
    case UploadTypes.POST_MAPPING_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.POST_MAPPING_COLUMN_SUCCESS:
      console.log('action.payload', action.payload);
      console.log('Case: ', UploadTypes.POST_MAPPING_COLUMN_SUCCESS);
      return {
        ...state,
        loading: false,
        uploadId: null,
      };
    case UploadTypes.POST_MAPPING_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API get file status list
    case UploadTypes.GET_FILE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.GET_FILE_STATUS_SUCCESS:
      return {
        ...state,
        fileStatus: action.payload.content,
        paging: {
          last: action.payload.last,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          size: action.payload.size,
          number: action.payload.number,
          first: action.payload.first,
          numberOfElements: action.payload.numberOfElements,
          pageIndex: action.payload.pageable.pageNumber,
          pageSize: action.payload.pageable.pageSize,
          offset: action.payload.pageable.offset,
        },
        loading: false,
      };
    case UploadTypes.GET_FILE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API download file
    case UploadTypes.DOWNLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default uploadReducer;