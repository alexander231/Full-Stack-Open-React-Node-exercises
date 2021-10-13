
let idOfTimeout
export const showAndHide = (notification, time) => {
    return async dispatch => {

        console.log(idOfTimeout)
        clearTimeout(idOfTimeout)
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: notification
        })
        idOfTimeout = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
            })
        }, time);
        
        
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: notification
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: null
    }
}
const notificationReducer = (state = null, action) => {
    switch(action.type) {
      case 'SHOW_NOTIFICATION': {
          return action.data
      }
      case 'HIDE_NOTIFICATION': {
          return null
      }
      
      default:
         return state
    }
    
  }
  
  export default notificationReducer