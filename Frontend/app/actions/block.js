import Actions from '../store/actions'
import { logout } from './'

const blockSuccess = payload => ({
  type: Actions.blockSuccess,
  payload
})

const blockInProgress = () => ({
  type: Actions.blockInProgress
})

const blockFail = payload => ({
  type: Actions.blockFail,
  payload
})

export const block = (blocked) => async dispatch => {
  await dispatch(blockInProgress())
  try {
    const res = await fetch('http://localhost:5000/api/block', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.jwt}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `blocked=${blocked}`,
    });

    const data = await res.json();
    if (data.success)
      dispatch(
        blockSuccess({ blocked }),
      );
    else if (data.userNotPresent) dispatch(logout());
  } catch (err) {
    dispatch(
      blockFail({
        errors: err,
      }),
    );
  }
}