import Actions from '../actions';

const usersReducer = (
    state = {
        inProgress: false,
        errors: undefined,
        data: [],
    },
    { type, payload },
) => {
    switch (type) {
        case Actions.homepageSuccess:
            return {
                ...state,
                inProgress: false,
                data: payload.users,
                errors: undefined,
            };
        case Actions.homepageInProgress:
            return {
                ...state,
                inProgress: true,
                errors: undefined,
            };
        case Actions.homepageFail:
            return {
                ...state,
                inProgress: false,
                errors: payload.errors,
            };
        case Actions.logout:
            return {
                ...state,
                errors: undefined,
                data: [],
                inProgress: false,
            };
        case Actions.likeSuccess: {
            const usersArr = state.data.map(user => {
                if (user.id == payload.imageLiked) {
                    return {
                        ...user,
                        likes: user.likes + 1,
                        likedby: [payload.userid, ...user.likedby]
                    }
                }
                return user
            })
            return {
                ...state,
                data: usersArr
            }
        }
        case Actions.superlikeSuccess: {
            const usersArr = state.data.map(user => {
                if (user.id == payload.imageSuperliked) {
                    return {
                        ...user,
                        superlikes: user.superlikes + 1,
                        superlikedby: [payload.userid, ...user.superlikedby]
                    }
                }
                return user
            })
            return {
                ...state,
                data: usersArr
            }
        }
        case Actions.blockSuccess: {
            const usersArr = state.data.filter(user => user.id != payload.blocked)
            return {
                ...state,
                data: usersArr
            }
        }
        default:
            return state;
    }
};

export default usersReducer;
