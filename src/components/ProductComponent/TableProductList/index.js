import { Table, Button } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom';

const TableProductList = (props) => { // prop là object
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
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

export default TableProductList;