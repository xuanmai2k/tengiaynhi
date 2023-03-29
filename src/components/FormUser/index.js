const FormUser =(props) =>{
    const onChange = (e) => { //event onchange
        const name=e.target.name // tagname
        const value=e.target.value // giá trị từ input

        props.setFormData({ // function
            ...props.formData, // dữ liệu của form data
            [name]:value  // tagname tương ứng value khi người dùng nhập dữ liệu
        })
    }

  return (
    <div>
        <input name='name' value={props.formData.name} onChange={onChange}/> 
        <input name='email' value={props.formData.email} onChange={onChange}/>  
        <input name='phone' value={props.formData.phone} onChange={onChange}/>
        <button onClick={props.onClick}>{props.formData.id ? "Edit" : "Create"}</button>
    </div>
  );
 }
export default FormUser;