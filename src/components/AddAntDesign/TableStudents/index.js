import { Table, Button } from "antd";


const ListStu = (props) => {
    const columns = [ // trong dataSource có 4 phần tử (name,studentId,score,className) nên column có 4 cột là 4 {}
    {
      title: "Tên học sinh",// tiêu đề của cột, có thể thay đổi tên
      dataIndex: "name", // tên ở đây phải giống với tên của các phần tử trong mảng
      key: "name", // có thể bỏ
    },
    {
      title: "Mã số học sinh",
      dataIndex: "studentID",
      key: "studentID",
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
    },
    {
        title: "Lớp",
        dataIndex: "className",
        key: "className",
    },
    {
        title: "", // cột cuối cùng của table luôn để button,link,... để thao tác với dòng dữ liệu
        dataIndex: "actions",
        render: (text, item) => {
            return(
                <div>
                    <Button onClick={()=> { props.onEdit (item)}}>Edit {item.name}</Button>
                    <Button onClick={()=> { props.onDelete (item)}}>Delete</Button>
                </div>
            )
        }
    }
  ];
    return (
        <div>
          <Table dataSource={props.dataSource} columns={columns} />
        </div>
    );
}
export default ListStu;