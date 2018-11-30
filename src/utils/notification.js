import {notification} from 'antd'
const openNotificationWithIcon = (type, title, desc) => {
    notification[type]({
        message: title,
        description: desc,
        duration: 2
    });
};

export default {
    openNotificationWithIcon
}