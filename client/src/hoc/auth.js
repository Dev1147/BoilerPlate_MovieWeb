import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function withAuthenticationCheck(SpecificComponent, option, adminRoute = null) {
    // option:
    // null -> 누구나 접근 가능한 페이지
    // true -> 로그인한 사용자만 접근 가능한 페이지
    // false -> 로그인한 사용자는 접근할 수 없는 페이지

    function AuthenticationCheck(props) {
        const navigate = useNavigate(); 
        const dispatch = useDispatch();
        const [loading, setLoading] = useState(true);  // 로딩 상태


        useEffect(() => {
            dispatch(auth()).then(response => {
     
                // 로그인하지 않은 상태
                if (!response.isAuth) {
                    if (option) {
                        navigate('/login'); // 로그인 페이지로 리다이렉트
                    }
                } else { 
                    // 로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/'); // 관리자가 아니면 홈으로 리다이렉트
                    } else {
                        if (option === false) {
                            navigate('/'); // 로그인한 사용자는 접근 불가 페이지로 리다이렉트
                        }
                    }
                }

                setLoading(false);  // 인증 완료 후 로딩 상태 false로 변경

            }).catch(err => {
                //console.error('Authentication error:', err);
                //navigate('/login');
                setLoading(false);  // 에러가 발생해도 로딩 상태 false로 변경
            });
        }, [dispatch, navigate]); //, option, adminRoute
        //console.log("AuthenticationCheck props:", props); 

        // 인증 정보가 로드되기 전까지 로딩 화면 표시
        if (loading) {
            return <div>Loading...</div>;  // 로딩 화면 또는 스피너를 추가할 수 있음
        }

        return <SpecificComponent {...props} />;
    }

    return AuthenticationCheck;
}
