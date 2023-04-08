import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import {Image, Role, User, Name} from './styles'


const AuthUser = () => {
    const navigate = useNavigate();
    const onLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        navigate("/");
    };

    return(
    <Dropdown menu={{
        items: [
            {
                key:"0",
                label: <a onClick={onLogout}>Log out</a>,
            },
        ],
        }}>
        <User>
            <Image src='https://loremflickr.com/cache/resized/65535_52691042514_21f766b3a2_320_240_nofilter.jpg'/>
                <div>
                    <Role>Admin</Role>
                    <Name>Xuan Mai</Name>
                </div>
        </User>
    </Dropdown>
    );
    };

export default AuthUser;