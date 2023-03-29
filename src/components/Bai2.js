import {useState } from "react";

const Bai2 =() => { 
    const [student, setStudent] = useState({id:'', score: ''});

    const [studentList, setStudentList] = useState([
        {id:'123', score: 10},
        {id:'456', score: 8},
    ]);
    const onClick = () => {
       // const newStudent = {
           // ...student,
          //  score: 9,
        //}
        setStudentList([
            ...studentList,
            student
        ]);
        setStudent({ id: "", score: '' })//reset arr student về giá trị ban đầu để có thể thêm giá trị mới
    };

    const onChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value // name tương ứng value khi nhập, target chính là thẻ mà mình thao tác
        })
    };
//Nhập input -> hàm onChange -> cập nhật useState -> hiển thị ra màn hình chỗ input -> onClick -> student gán vào hàm studentlist -> reset student trống để nhập data khác
 return (
    <div>
        <div>
            <input name='id' value={student.id} onChange={onChange}/>
            <input name='score' value={student.score} onChange={onChange}/>
            <button onClick={onClick}>Add</button>
        </div> 
        
    

        {studentList.map((item)=>{
            return (
                <div>
                    <div>Mã số học sinh: {item.id}</div>
                    <div>Điểm số: {item.score}</div>
                </div>
            );
        })}
    </div> 
 );
}
export default Bai2;