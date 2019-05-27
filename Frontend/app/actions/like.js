import Actions from '../store/actions';
import { logout } from './';

const likeSuccess = payload => ({
  type: Actions.likeSuccess,
  payload,
});

const likeInProgress = () => ({
  type: Actions.likeInProgress,
});

const likeFail = () => ({
  type: Actions.likeFail,
});

export const like = (userid, imageLiked, socket, userliked) => async dispatch => {

  await dispatch(likeInProgress());
  try {
    const res = await fetch('http://localhost:5000/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Token ${localStorage.jwt}`,
      },
      body: `imageLiked=${imageLiked}`,
    });
    const data = await res.json();
    if (data.success) {
      dispatch(likeSuccess({ userid, imageLiked }))
      socket.emit('like', { userliked, imageLiked })
    }
    else if (data.userNotPresent) dispatch(logout());
  } catch (err) {
    dispatch(
      likeFail({
        errors: err,
      }),
    );
  }
};
