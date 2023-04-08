import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoute= ({component}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token){
            navigate('/')
        }
    },[]);
    return(
        <div>{ component }</div>
    )
}
export default PrivateRoute;