import { Header, Footer, Main, Sidebar, Content, Layout, Logo, MenuItem } from "./style";
import { HomeOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import AuthUser from "./AuthUser";

const DefaultLayout =({children}) => {
    
    return(
        <Layout>
            <Sidebar>
                <Logo>Green Academy</Logo>

                <Link to='/dashboard'>
                    <MenuItem>
                        <HomeOutlined />  <span>Dashboard</span>
                    </MenuItem>
                </Link>
                <Link to='/products'>
                    <MenuItem>
                    <GiftOutlined /> <span>Product</span>
                    </MenuItem>
                </Link>
                <Link to='/users'>
                    <MenuItem>
                        <UserOutlined /> <span>User</span>
                    </MenuItem>
                </Link>
            </Sidebar>

            <Content>
                <Header>
                    <AuthUser/>
                </Header>
                <Main> {children} </Main>
                <Footer>Powered by Mai</Footer>
            </Content>
        </Layout> 
    )
}
export default DefaultLayout;