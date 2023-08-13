import httpStatus from 'http-status';
import { abortIf } from '../utils/responder';
import { verifyToken } from '../utils/tokenManagement';

const verify = (req, res, next) => {
  abortIf(
    !req.headers['authorization'],
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const token = req.headers['authorization'].split(' ')[1];
  abortIf(
    !token || token == '',
    httpStatus.FORBIDDEN,
    'token expired please login'
  );
  const data: any = verifyToken(token);
  abortIf(!data, httpStatus.FORBIDDEN, 'token expired please login');
  const user = {
    user_id: data._id,
  };
  req.body.token = user;
  next();
};

export { verify };
