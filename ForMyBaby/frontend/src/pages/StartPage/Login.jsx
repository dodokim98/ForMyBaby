import React from 'react';
import kakaoLoginImage from '../../assets/kakao.png'; // 이미지 파일 경로

const Login = () => {
    const Rest_api_key = process.env.REACT_APP_REST_API_KEY; //REST API KEY
    const redirect_uri = 'https://j10c202.p.ssafy.io/oauth/redirected/kakao' //Redirect URI
    //const redirect_uri = 'http://localhost:3000/oauth/redirected/kakao' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=40f7b007044cb4e88f5190467ce35a58&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <button onClick={handleLogin} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                    <img src={kakaoLoginImage} alt="카카오 로그인" />
                </button>
            </div>  
        </div>
    );
}

export default Login;