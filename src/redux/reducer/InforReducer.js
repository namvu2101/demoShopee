const initialSate = {
  email: '',
  password: '',
  accountName: 'Nam Vũ',
  id: '1',
};
export const UPDATE_EMAIL = 'Cap_nhap_Email'
export const UPDATE_ACCOUNTNAME = 'Cap_nhap_Email'

export default function ActionReducer(state = initialSate, payload) {
  switch (payload.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        email: payload.email,
      };
    case UPDATE_ACCOUNTNAME:
      return {
        ...state,
        accountName: payload.accountName,
      };
    default:
      return state;
  }
}
