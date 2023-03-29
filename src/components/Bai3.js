
import { useState, useEffect, useMemo } from "react"; //useEffect: không có giá trị trả về, useMemo: có giá trị trả về
// useEffect và useMemo có 2 input, 1 là hàm, 1 là mảng
import FormUser from "./FormUser";
import TableUserList from "./TableUserList"; // gọi thư mục con
// import {DEFAULT_USER} from "./constant"
const DEFAULT_USER={name: '', email:'', phone:''} // biến không có cập nhật (không thay đổi) thường đặt ở bên ngoài
const TableUsers =() => { 
    // userList của thầy = users
    const [users, setUsers]= useState([]);  // dùng để thêm các giá trị, edit or delete
    const [formData, setFormData]= useState(DEFAULT_USER); // dùng để cập nhật dữ liệu
    const [keyword, setKeyword]=useState('') 
    //const [searchUserList, setsearchUserList]= useState([]); // khai báo khi sử dụng useEffect 

    /*useEffect(() => { // sử dụng useEffect khi update 2 hoặc nhiều dữ liệu
        if(keyword !== ''){
            const newUserList = users.filter((item)=>{
                //return item.name === keyword khi search chính xác fullname mới ra
                //return item.name.includes(keyword)  // có thể search được khi có keyword giống mà không cần full name
                return item.name.includes(keyword) || item.email.includes(keyword) // có thể search cả email
            })
            setsearchUserList(newUserList)// nếu có nhập keyword thì trả về list new
        }
        else{
            setsearchUserList(users)// nếu không có nhập keyword thì trả về list old
        }
    },[keyword,users])// khi nào thay đổi keyword hoặc list danh sách thì nó sẽ gọi vào function useEffect, giám sát biến
    */

    // sử dụng useMemo khi update 1 dữ liệu 
    const searchUserList = useMemo(() => { // vì có giá trị trả về nên cần có biến để hứng giá trị
        if(keyword !== ''){
            const newUserList = users.filter((item)=>{
                return item.name.includes(keyword) || item.email.includes(keyword)
            })
            return newUserList // vì useMemo có giá trả về nên dùng return
        }
        else{
            return users // vì useMemo có giá trả về nên dùng return
        }
    },[keyword,users])

    const onClick = () => { //event onclick, khi ấn nút submit
        if(formData.id) { // nếu form data đã có id
            const newUsers = users.map((item) =>{  //duyệt mảng
                if(item.id === formData.id){ // id của user = id của data
                    return formData // đưa giá trị lên input
                }
                return item // giữ nguyên giá trị
            }) // 
            setUsers(newUsers)// dữ liệu mới 
        }
        else{ // nếu form data chưa có id
            setUsers([ 
                ...users,
                {
                    id: Math.random(), // gán id là 1 con số bât kì vào users.id
                    ...formData // ghi dè vào dữ liệu của formData
                }
            ])
        }
        setFormData(DEFAULT_USER)// reset dữ liệu để nhập dữ liệu mới
    };

    const onEdit = (item) => {
        setFormData(item) // khi bấm function Edit thì sẽ đưa data từ item đó lên input
    };

    const onDelete =(item) => {
        //có giá trị, true, >0, string khác ''
        //không có giá trị, null, undefined, ===0, string ''
        //if(!!userList.length)=> biến có điều khiện true or false
        const newUserList = users.filter((user)=> {
            return user.id !== item.id
        })
        setUsers(newUserList)
    };

    const onSearch = (e) => { // e là event
        setKeyword(e.target.value)
    }

  return (
    <div>
        <input value={keyword} onChange={onSearch}/>
        <FormUser formData={formData} setFormData={setFormData} onClick={onClick}/>
        <TableUserList users={searchUserList} onEdit={onEdit} onDelete={onDelete}/>
    </div>
  );
  //để truyền dữ liệu cho tableUserList cần tạo 1 biến để hứng giá trị, dữ liệu
 }
export default TableUsers;