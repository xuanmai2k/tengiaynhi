import { Header, Footer, Main, Sidebar, Content } from "./style";
import{ Button } from "antd";
import { useNavigate, Link } from 'react-router-dom';

const DefaultLayout =({children}) => {
    const navigate = useNavigate ();

    const onLogout =()=>{
        localStorage.removeItem('token')
        navigate("/");
    }
    return(
        <div>
            <Header>
                <a>Green Academy</a>
                <Button onClick={onLogout}>Layout</Button>
            </Header>

            <Main>
                <Sidebar>
                    <Link to='/students'>Student</Link>
                    <Link to='/dashboard'>Dashboard</Link>
                </Sidebar>

                <Content>
                    {children}
                </Content>
            </Main>

            <Footer>Powered by Mai</Footer>
            
        </div>
    )
    }
    export default DefaultLayout;