
import { Table, Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom';


const TableUserList = (props) => { // prop là object
  const navigate = useNavigate();
  const location = useLocation();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render:(text, item) => {
            return(
                <div>
                  <Button
                    disabled={props.itemLoading}
                    onClick={() => {
                      props.onEdit(item.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={props.itemLoading}
                    onClick={() => {
                      props.onDelete(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
            )
        }
    },
  ];
  
  return (
    <Table dataSource={props.dataSource} columns={columns} onChange={(pagination)=>{ const searchParams = new URLSearchParams(location.search); searchParams.set("page", pagination.current); searchParams.set("limit", pagination.pageSize); navigate(`${location.pathname}?${searchParams.toString()}`) }} />
  );
};

export default TableUserList;