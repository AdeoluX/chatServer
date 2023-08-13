import { v2 } from 'cloudinary';
import { abortIf } from './responder';
import httpStatus from 'http-status';

v2.config({
  cloud_name: 'dsavh0wlc',
  api_key: '565295426515125',
  api_secret: 'U7OS6MyKGVtHnId5qNMsan-hsrE',
});

export const cloudinaryUpload = (image): any => {
  const upload = v2.uploader
    .upload(image.tempFilePath)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      abortIf(error, httpStatus.BAD_REQUEST, 'Failed to upload');
      return { status: false };
    });
  return upload;
};

// module.exports = {
//   cloudinaryUpload,
// };
