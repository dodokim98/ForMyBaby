import React, { useState, useEffect } from 'react';
import './NotificationSetting.css';
import { sendNotificationSetting, getNotificationSetting } from '../../api/notificationApi';
import { Link, useNavigate } from 'react-router-dom'; 
import arrowLeft from '../../assets/arrow_left.png'

const NotificationSettings = () => {
  const [notificationStates, setNotificationStates] = useState({
    isSound: false,
    isGeneral: false,
    isDanger: false
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchInitialNotificationStates = async () => {
      try {
        const initialStatesFromServer = await getNotificationSetting();
        setNotificationStates(initialStatesFromServer);
      } catch (error) {
        console.error('알림 설정 가져오기 에러!', error);
      }
    };

    fetchInitialNotificationStates();
  }, []);

  const toggleNotification = (type) => {
    const updatedStates = {
      ...notificationStates,
      [type]: !notificationStates[type]
    };
    console.log('updated states', updatedStates);
    setNotificationStates(updatedStates);
  };

  const handleSave = async () => {
    try {
      await sendNotificationSetting(notificationStates);
      console.log('알림 설정이 성공적으로 변경되었습니다.');
      //navigate(-1);
    } catch (error) {
      console.error('알림 설정 전송 에러!', error);
    }
  };

  return (
    <div className='notification-setting-container'>
      <div className='notification-setting-header'>
        <Link to="/notification">
          <button className="settings-button" onClick={handleSave}>
            <img src={arrowLeft} alt="Settings" />
          </button>
        </Link>
       
      </div>

      <div className='noti-list'>
        <div className='noti-box'>
          <div>알림 소리</div>
          <label className="switch">
            <input type="checkbox" checked={notificationStates.isSound} onChange={() => toggleNotification('isSound')} />
            {/* <input type="checkbox" /> */}
            <span className="slider round"></span>
          </label>
        </div>
        <hr/>
        <div className='noti-box'>
          <div>건강/접종 알림</div>
          <label className="switch">
            <input type="checkbox" checked={notificationStates.isGeneral} onChange={() => toggleNotification('isGeneral')} />
            {/* <input type="checkbox" /> */}
            <span className="slider round"></span>
          </label>
        </div>
        <hr/>
        <div className='noti-box'>
          <div>위험 예방 알림</div>
          <label className="switch">
            <input type="checkbox" checked={notificationStates.isDanger} onChange={() => toggleNotification('isDanger')} />
            {/* <input type="checkbox" /> */}
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettings;
