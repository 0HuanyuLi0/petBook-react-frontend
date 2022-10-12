import { createStore } from 'redux';



const initialState = {
    posts: null,
    comments: null,
    friends: 0
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'posts/getPosts':
            return {
                ...state,
                posts: [...action.payload]
            }

        case 'posts/addNewPost':
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        case 'posts/deletePost':
            return {
                ...state,
                posts: state.posts.filter(p => p._id !== action.payload)
            }

        case 'comments/getComments':
            return {
                ...state,
                comments: [...action.payload]
            }

        case 'comments/addNewComment':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }

        case 'comments/deleteComment':
            return {
                ...state,
                comments: state.comments.filter(c => c._id !== action.payload)
            }

        case 'friends/getFriends':
            return {
                ...state,
                friends: action.payload
            }

        case 'friends/addNewFriends':
            return {
                ...state,
                friends: state.friends + 1
            }

        case 'friends/deleteFriends':
            return {
                ...state,
                friends: state.friends - 1
            }

        default:
            console.log("ACTION,", action);
            return state
    }
}

export const store = createStore(
    reducer,
    // optional second argument: initial state value to use, maybe from localStorage.getItem() ?
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);