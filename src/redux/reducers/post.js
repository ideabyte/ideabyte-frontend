const initialState = {
  latestResponse: null,
  latestError: null,
  isLoading: false
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_IDEA_BEGIN': {
      return {
        ...state,
        isLoading: true,
        latestError: null
      }
    }

    case 'POST_IDEA_SUCCESS': {
      return {
        ...state,
        isLoading: false,
        latestResponse: action.payload.response
      }
    }

    case 'POST_IDEA_ERROR': {
      return {
        ...state,
        isLoading: false,
        latestError: action.payload.error,
        latestResponse: null
      }
    }

    default: {
      return state
    }
  }
}

export default postReducer
