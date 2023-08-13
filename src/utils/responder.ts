import httpStatus from 'http-status';
import ApiError from './ApiError';
import stream from 'stream';

const ApiResponder = (res, statusCode, message, payload, extra = {}) => {
  res.status(statusCode).send({
    status: statusCode,
    success:
      statusCode === httpStatus.OK || statusCode === httpStatus.CREATED
        ? 'true'
        : 'false',
    message,
    data: payload,
    ...extra,
  });
};

const redirectResponder = (res, redirect_url) => {
  res.redirect(redirect_url);
};

const downloadResponder = (res, filepath, filename) => {
  res.download(filepath, filename);
};

const redirect = (res, redirect_url) => {
  return redirectResponder(res, redirect_url);
};

const download = (res, filepath, filename) => {
  console.log('About to download');
  return downloadResponder(res, filepath, filename);
};

const downloadPdfFile = async (fileData, res, fileName) => {
  var fileContents = Buffer.from(fileData, 'base64');

  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', 'attachment; filename=' + fileName);
  res.set('Content-Type', 'application/pdf');

  readStream.pipe(res);
};

const downloadFile = async (fileDate, res, fileName, content_type) => {
  var fileContents = Buffer.from(fileDate, 'base64');

  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-Type', content_type);

  return readStream.pipe(res);
};

const zipDownload = async () => {};

// async function sendWorkbook(workbook, response) {}

const successResponse = (res, payload = {}, message = 'Success') => {
  return ApiResponder(res, httpStatus.OK, message, payload);
};

const errorResponse = (
  res,
  message = null,
  statusCode = httpStatus.INTERNAL_SERVER_ERROR,
  extra = {}
) => {
  const httpMessage = message || httpStatus[statusCode];
  return ApiResponder(res, statusCode, httpMessage, {}, extra);
};

const abort = (status, message) => {
  console.log(status, message);
  throw new ApiError(status, message);
};

const abortIf = (condition, status, message) => {
  if (condition) abort(status, message);
};

const abortUnless = (condition, status, message) => {
  if (!condition) abort(status, message);
};

export {
  ApiResponder,
  successResponse,
  errorResponse,
  abort,
  abortIf,
  abortUnless,
  redirect,
  download,
  downloadFile,
  downloadPdfFile,
};
