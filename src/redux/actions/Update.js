import {UPDATE_ACCOUNTNAME, UPDATE_EMAIL} from '../reducer/InforReducer';

export const updateEmail = email => async dispatch => {
  try {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    console.log('da cap nhat data email');
  } catch (error) {}
};

export const updateAccountName = accountName => async dispatch => {
  console.log('name o soter= ', accountName);
  try {
    await console.log('dbat dau cap nhat data email');

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    console.log('da cap nhat data Account');

    // cap nhat thong tin
    dispatch({
      type: UPDATE_ACCOUNTNAME,
      accountName: accountName,
    });
  } catch (error) {}
};
