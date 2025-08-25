import { notification } from 'antd';
import codeMessage from '@request/codeMessage';


const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;
    console.log(response,'errrororoo');

    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 2,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    // if (response.data && response.data.jwtExpired) {
    //   navigate('/logout');
    // }
    return response.data;
  } else {
    notification.config({
      duration: 2,
    });
    notification.error({
      message: 'No internet connection',
      description: 'Cannot connect to the server, Check your internet network',
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Check your internet network',
    };
  }
};

export default errorHandler;
