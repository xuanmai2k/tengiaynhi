import { useState, useMemo, useEffect } from "react";
import FormBook from "./FormBook";
import TableBook from "./TableBook";
import axios from "axios";
import { ButtonCreate,SearchContainer,SearchBox } from './styles';
import { Modal } from "antd";



const DEFAULT_BOOK={title: '', author:'', description:'', type:'', page:0}
const Exam05 = () => {
    const [formData, setFormData] = useState (DEFAULT_BOOK); // lưu trữ dữ liệu từ ô input, sau đó đưa vào list danh sách
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState (false);
    const [keyword, setKeyword]=useState('')
    const [tableLoading, setTableLoading]=useState(false);
    const [submitLoading, setSubmitLoading]=useState(false);
    const [itemLoading, setItemLoading]=useState(false);

    //chạy đúng 1 lần, khi components dc khởi tạo
    // GET: LẤY THÔNG TIN DỮ LIỆU 
    // axios.get(url)
    // POST: SỬ DỤNG KHI MUỐN TẠO MỚI DỮ LIỆU
    // axios.post(url, formData) // dữ liệu vừa đc tạo trên server
    // PUT/ PATCH: SỬ DỤNG KHI UPDATE DỮ LIỆU
    // axios.put(url, formData) //dữ liệu vừa đc cập nhật trên server
    // DELETE: SỬ DỤNG KHI MUỐN XÓA DỮ LIỆU ĐÓ
    // axios.delete(url) // true or false
    
    useEffect(() =>{
        fetchData()
    },[])
    /*useEffect(async ()=> {
          const res = await axios.get('https://6401ddeb3779a862625fd55d.mockapi.io/users');
          setDataSource(res.data);
    },[])*/
    
    const fetchData=()=>{
        setTableLoading(true)
        axios.get(`https://6401ddeb3779a862625fd55d.mockapi.io/users`).then((res) =>{
          setDataSource(res.data);
          setTableLoading(false);
        })
    }

    /*const onDelete = (item) => {
        const newDataSource = dataSource.filter((book)=> {
           return book.id !== item.id
        })
        setDataSource(newDataSource)
    };*/
    const onDelete = (id) => {
        Modal.confirm({
            title: "Xóa dữ liệu này",
            content: " Xóa vĩnh viễn",
            onOk(){
                setItemLoading(true)
                axios.delete(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`).then((res)=>{
                    setItemLoading(false)
                    fetchData()
                })
            }
        })
    };

    /*const onEdit = (item) => {
        setFormData(item)
        setOpen(true)
    }*/
    const onEdit = (id) => {
        setItemLoading(true)
        axios.get(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`).then((res)=>{
            setFormData(res.data)
            setItemLoading(false)
            setOpen(true)
        })
    }

    const onCreate = () => {
        setFormData(DEFAULT_BOOK)
        setOpen(true)
    }

    /*const onSubmit = (id, data) => {
        if(id){
            const newDataSource = dataSource.map((item) =>{
                return item.id === id ? {id: id, ...data} : item ;
            });
            setDataSource(newDataSource)
        }
        else{
            setDataSource([
                ...dataSource,
                {
                    id: Math.random(),
                    ...data 
                }
            ]);
        }
        setFormData(DEFAULT_BOOK)
        setOpen(false)
    }*/
    const onSubmit = (id, data) => {
        setSubmitLoading(true)
        if(id){
            axios.put(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`,data).then((res)=>{
                setSubmitLoading(false) 
                setFormData(DEFAULT_BOOK)
                setOpen(false)   
                fetchData()
            })
        }
        else{
            axios.post('https://6401ddeb3779a862625fd55d.mockapi.io/users',data).then((res)=>{
                setSubmitLoading(false)
                setFormData(DEFAULT_BOOK)
                setOpen(false)
                fetchData()
            })
        }
        
    }

    const onSearch = (e) => {
        setKeyword(e.target.value)
    }

    const searchedDataSource = useMemo(() =>{
        if (keyword){
          return dataSource.filter((item) =>{
            return item.title.includes(keyword) || item.author.includes(keyword);
          })
        }
        return dataSource;
      },[keyword, dataSource])

    return(
        <div>
            <FormBook open={open} loading={submitLoading} setOpen={setOpen} onSubmit={onSubmit} formData={formData}/>
            <SearchContainer>
                <SearchBox onChange={onSearch}></SearchBox>
                <ButtonCreate onClick={onCreate}>New Book</ButtonCreate>
            </SearchContainer>
            
            <TableBook itemLoading={itemLoading} loading={tableLoading} dataSource={searchedDataSource} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}
export default Exam05;