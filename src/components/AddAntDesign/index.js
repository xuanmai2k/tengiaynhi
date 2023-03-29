import { useState } from "react";
import { Button } from "antd"; // dùng thẻ nào trong ant design thì khai báo
import ModalFormStudent from "./ModalFormStudent";
import TableStudents from "./TableStudents";

const DEFAULT_USER={name: '', studentID:'', score:'', className:''} // hằng số
const ListStu = (props) => {
    //useState gồm 1 biến và 1 hàm, biến dùng để lưu trữ dữ liệu hoặc lấy dữ liệu sử dụng, hàm dùng để đưa dữ liệu mới hoặc truyền tham số vào
    const [formData, setFormData] = useState (DEFAULT_USER); // lưu trữ dữ liệu từ ô input, sau đó đưa vào list danh sách
    const [dataSource, setDataSource] = useState([]); // lưu trữ của list danh sách
    const [open, setOpen] = useState (false); // dùng để đóng mở cửa số nhỏ, ban đầu cửa sổ đóng (false)

    const onCreate = () => { // khi bấm nút new student thì open cửa sổ nhỏ
        setFormData(DEFAULT_USER)// khi bấm creat sẽ đưa dữ liệu trống lên hàm setFormData
        setOpen(true) // mở cửa sổ để nhập liệu
    }

    const onEdit = (item) => {  // truyền giá trị tại vị trí click (item) vào hàm edit
        setFormData(item) // đưa nội dung của item vừa click lên ô input để edit
        setOpen(true) // mở cửa sổ để chỉnh sửa
    }
    
    // khi 2 ID = nhau (ID tại vị trí Click và ID trong filter) sẽ bị loại bỏ (xóa) khỏi danh sách mới
    const onDelete = (item) => { // truyền giá trị tại vị trí click (item) vào hàm delete
        const newDataSource = dataSource.filter((user)=> {//tạo 1 biến mới để lưu trữ sau khi lọc từ list danh sách, user là 1 object ?
           return user.id !== item.id //chỉ lấy những dữ liệu có ID khác với ID tại vị trí click
        })
        setDataSource(newDataSource)// đưa list danh sách mới sau khi lọc vào hàm để thay thế cho list danh sach cũ
    };
    
    // ant design không dùng onChange
    const onChange = (e) => { // event ?
        setFormData({// hàm để đưa giá trị vào biến lưu trữ
            ...formData, // biến lưu trữ dữ liệu
            [e.target.name]: e.target.value// name và value sẽ thay đổi tương ứng theo từng ô input
        })
    };

    // cách 1 Submit basic
    /*const onSubmit = () => { // khi bấm nút nút OK (Submit)
        if(formData.id){ // nếu đã có id
            const newDataSource = dataSource.map((item) =>{
                if(item.id === formData.id){
                    return formData
                }
                return item // không đổi
            });
            setDataSource(newDataSource) // đưa danh sách mới vào list danh sách 
        }
        else{ // nếu chưa có ID thì thêm ID vào
            setDataSource([ // hàm để đưa giá trị vào list danh sách
                ...dataSource, // biến lưu trữ list danh sách
                {
                    id: Math.random(), // ID là 1 số bất kì
                    ...formData // ghi vào formData trước sau đó mới đưa vào list danh sách ?
                }
            ]);
        }
        setFormData(DEFAULT_USER)//sau khi đưa dữ liệu từ biến lưu trữ formData vào biến list danh sách dataSource thì truyền nội dung của hằng số vào(mất đi nội dung vừa nhập, thay bằng '')
        setOpen(false) // đóng cửa sổ 
    };*/

    // cách 2 Submit
    const onSubmit = (id, data) => { // khi bấm nút nút OK (Submit), data lấy từ chương trình con, làm theo cách 2 thì {id, data}
        if(id){ // nếu đã có id
            const newDataSource = dataSource.map((item) =>{
                return item.id === id ? {id: id, ...data} : item ;// không đổi
            });
            setDataSource(newDataSource) // đưa danh sách mới vào list danh sách 
        }
        else{ // nếu chưa có ID thì thêm ID vào
            setDataSource([ // hàm để đưa giá trị vào list danh sách
                ...dataSource, // biến lưu trữ list danh sách
                {
                    id: Math.random(), // ID là 1 số bất kì
                    ...data // ghi giá trị data vừa nhập ở input vào dataSource
                }
            ]);
        }
        setFormData(DEFAULT_USER)//sau khi đưa dữ liệu từ biến lưu trữ formData vào biến list danh sách dataSource thì truyền nội dung của hằng số vào(mất đi nội dung vừa nhập, thay bằng '')
        setOpen(false) // đóng cửa sổ
    }
  return (
      <div>
        <ModalFormStudent open={open} setOpen={setOpen} onSubmit={onSubmit} formData={formData} onChange={onChange}/>
        <Button onClick={onCreate}>New Student</Button>
        <TableStudents dataSource={dataSource} onEdit={onEdit} onDelete={onDelete} />
      </div>
  );
}

export default ListStu;