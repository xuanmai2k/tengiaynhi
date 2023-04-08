import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PublicRoute = ({component}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token){
            navigate('/dashboard');
        }
    },[])
    
    return (
        <div>{ component }</div>
    )
}
export default PublicRoute;
