import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api/UploadServices';
import * as UploadActions from '../actions/UploadActions';
import * as UploadTypes from '../types/UploadTypes';

// API get column in student
function* getStudentColumnSaga() {
  try {
    const data = yield call(api.getStudentColumn);
    yield put(UploadActions.getStudentColumnSuccess(data));
  } catch (error) {
    yield put(UploadActions.getStudentColumnFailure(error.message));
  }
}

// API get column in point
function* getPointColumnSaga() {
  try {
    const data = yield call(api.getPointColumn);
    yield put(UploadActions.getPointColumnSuccess(data));
  } catch (error) {
    yield put(UploadActions.getPointColumnFailure(error.message));
  }
}

function* uploadFileSaga(payload) {
  try {
    const data = yield call(api.uploadFile, payload);
    yield put(UploadActions.uploadFileSuccess(data));
  } catch (error) {
    yield put(UploadActions.uploadFileFailure(error.message));
  }
}

function* postMappingColumnSaga(payload) {
  try {
    const data = yield call(api.postMappingColumn, payload.payload);
    yield put(UploadActions.postMappingColumnSuccess(data));
  } catch (error) {
    yield put(UploadActions.postMappingColumnFailure(error.message));
  }
}

// API get file status list
function* getFileStatusSaga(payload) {
  try {
    const data = yield call(api.getFileStatusList, payload.payload);
    yield put(UploadActions.getFileStatusSuccess(data));
  } catch (error) {
    yield put(UploadActions.getFileStatusFailure(error.message));
  }
}

// API download file
function* downloadFileSaga(payload) {
  try {
    const data = yield call(api.downloadFile, payload.payload);
    yield put(UploadActions.downloadFileSuccess(data));
  } catch (error) {
    yield put(UploadActions.downloadFileFailure(error.message));
  }
}

// API get all documents
function* getAllDocumentsSaga(payload) {
  try {
    const data = yield call(api.getAllDocuments, payload.payload);
    yield put(UploadActions.getAllDocumentsSuccess(data));
  } catch (error) {
    yield put(UploadActions.getAllDocumentsFailure(error.message));
  }
}

// API upload document
function* uploadDocumentSaga(payload) {
  try {
    const data = yield call(api.uploadDocument, payload.payload);
    yield put(UploadActions.uploadDocumentSuccess(data));
    yield put(UploadActions.getAllDocumentsRequest(payload.payload.searchPayload));
  } catch (error) {
    yield put(UploadActions.uploadDocumentFailure(error.message));
  }
}

// API download Document
function* downloadDocument(payload) {
  try {
    const data = yield call(api.downloadDocument, payload.payload);
    yield put(UploadActions.downloadDocumentSuccess(data));
  } catch (error) {
    yield put(UploadActions.downloadDocumentFailure(error.message));
  }
}

// API export file pdf
function* exportFilePdfSaga(payload) {
  try {
    const data = yield call(api.exportFilePdf, payload.payload);
    yield put(UploadActions.exportFilePdfSuccess(data));
  } catch (error) {
    yield put(UploadActions.exportFilePdfFailure(error.message));
  }
}

export default function* uploadWatcherSaga() {
  yield takeLatest(UploadTypes.GET_STUDENT_COLUMN_REQUEST, getStudentColumnSaga);
  yield takeLatest(UploadTypes.GET_POINT_COLUMN_REQUEST, getPointColumnSaga);
  yield takeLatest(UploadTypes.UPLOAD_FILE_REQUEST, uploadFileSaga);
  yield takeLatest(UploadTypes.POST_MAPPING_COLUMN_REQUEST, postMappingColumnSaga);
  yield takeLatest(UploadTypes.GET_FILE_STATUS_REQUEST, getFileStatusSaga);
  yield takeLatest(UploadTypes.DOWNLOAD_FILE_REQUEST, downloadFileSaga);
  yield takeLatest(UploadTypes.GET_ALL_DOCUMENTS_REQUEST, getAllDocumentsSaga);
  yield takeLatest(UploadTypes.UPLOAD_DOCUMENT_REQUEST, uploadDocumentSaga);
  yield takeLatest(UploadTypes.DOWNLOAD_DOCUMENT_REQUEST, downloadDocument);
  yield takeLatest(UploadTypes.EXPORT_FILE_PDF_REQUEST, exportFilePdfSaga);
}