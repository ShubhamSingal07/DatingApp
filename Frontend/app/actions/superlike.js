import Actions from '../store/actions';
import { logout } from './';

const superlikeSuccess = payload => ({
  type: Actions.superlikeSuccess,
  payload,
});

const superlikeInProgress = () => ({
  type: Actions.superlikeInProgress,
});

const superlikeFail = () => ({
  type: Actions.superlikeFail,
});

export const superlike = (userid, imageSuperliked, socket, usersuperliked, image) => async dispatch => {
  await dispatch(superlikeInProgress());
  try {
    const res = await fetch('http://localhost:5000/api/superlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Token ${localStorage.jwt}`,
      },
      body: `imageSuperliked=${imageSuperliked}`,
    });
    const data = await res.json();

    if (data.success) {
      dispatch(superlikeSuccess({ userid, imageSuperliked }))
      socket.emit('superlike', { image, usersuperliked, imageSuperliked })
    }
    else if (data.userNotPresent) dispatch(logout());

  } catch (err) {
    dispatch(
      superlikeFail({
        errors: err,
      }),
    );
  }
};
