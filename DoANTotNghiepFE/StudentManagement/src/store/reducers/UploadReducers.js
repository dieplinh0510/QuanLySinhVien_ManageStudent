import * as UploadTypes from '../types/UploadTypes';

const initialState = {
  loading: false,
  error: null,
  studentColumns: [],
  pointColumns: [],
  uploadId: null,
  fileStatus: [],
  paging: null,
  documents: [],
  pagingDocuments: null,
  studentDocuments: [],
  pagingStudentDocuments: null,
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

    // API get all documents
    case UploadTypes.GET_ALL_DOCUMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.GET_ALL_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload.content,
        pagingDocuments: {
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
    case UploadTypes.GET_ALL_DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API upload document
    case UploadTypes.UPLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.UPLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API download file
    case UploadTypes.DOWNLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.DOWNLOAD_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API export file pdf
    case UploadTypes.EXPORT_FILE_PDF_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.EXPORT_FILE_PDF_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.EXPORT_FILE_PDF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API get all documents of classroom by documentId
    case UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        studentDocuments: action.payload.content,
        pagingStudentDocuments: {
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
      };
    case UploadTypes.GET_ALL_DOCUMENTS_BY_DOCUMENT_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API update document
    case UploadTypes.UPDATE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.UPDATE_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API submit homework
    case UploadTypes.SUBMIT_HOMEWORK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.SUBMIT_HOMEWORK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.SUBMIT_HOMEWORK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // API download assignment
    case UploadTypes.DOWNLOAD_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UploadTypes.DOWNLOAD_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UploadTypes.DOWNLOAD_ASSIGNMENT_FAILURE:
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
