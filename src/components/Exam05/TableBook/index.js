import { Table, Button } from "antd";
import { Action } from "./styles";

const Exam05 = (props) => {
    const columns = [ // trong dataSource có 4 phần tử (name,studentId,score,className) nên column có 4 cột là 4 {}
    {
      title: "Title",// tiêu đề của cột, có thể thay đổi tên
      dataIndex: "title", // tên ở đây phải giống với tên của các phần tử trong mảng
      key: "title", // có thể bỏ
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Page",
        dataIndex: "page",
        key: "page",
    },
    {
        title: "", // cột cuối cùng của table luôn để button,link,... để thao tác với dòng dữ liệu
        dataIndex: "actions",
        render: (text, item) => {
            return(
                <Action>
                    <Button disabled={props.itemLoading} onClick={()=> { props.onEdit (item.id)}}>Edit {item.name}</Button>
                    <Button disabled={props.itemLoading} onClick={()=> { props.onDelete (item.id)}}>Delete</Button>
                </Action>
            )
        }
    }
  ];
    return (
        <div>
          <Table loading={props.loading} dataSource={props.dataSource} columns={columns} />
        </div>
    );
}
export default Exam05;