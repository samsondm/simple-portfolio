export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

const showNotification = (id) => ({
  type: SHOW_NOTIFICATION,
  id
});

const hideNotification = (prevDisplay) => ({
  type: HIDE_NOTIFICATION,
  prevDisplay
});

// let nextNotificationId = 0;

const showNotificationWithTimeout = (prevDisplay) =>
  (dispatch, getState) => {
    // const id = nextNotificationId++;

    
    const timeoutID = setTimeout(() => {
      dispatch(hideNotification(prevDisplay));
    }, 1500);

    dispatch(showNotification(timeoutID));
  };

export default showNotificationWithTimeout;