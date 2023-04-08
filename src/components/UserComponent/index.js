import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import SearchBox from "./SearchBox";
import TableUserList from "./TableUsersList";
import FormUser from "./FormUser";
import { useLocation } from "react-router-dom";
import { ButtonCreate, SearchContainer } from "./styles";

const DEFAULT_USER ={
    name: "",
    email: "",
    phone: "",
    status: "",
    avatar: "",
};

const UserComponent = () => {
    const location = useLocation
    const [formData, setFormData] = useState(DEFAULT_USER);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState (false);
    const [itemLoading, setItemLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [keyword, setKeyword] = useState("");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const searchParams = new URLSearchParams(location.search)
    const baseUrl = "https://6401ddeb3779a862625fd55d.mockapi.io/users"
    const keyword = searchParams.has("keyword") ? searchParams.get("keyword"): "";
    const page = searchParams.has("page")? searchParams.get("page"): 1;
    const limit = searchParams.has("limit")? searchParams.get("limit"): 10;

    setTableLoading(true);

    axios
      .get(`${baseUrl}?keyword=${keyword}&page=${page}&limit=${limit}`)
      .then((res) => {
        setDataSource(res.data);
        setTableLoading(false);
      });
  };


  const onSearch = (e) => {
    setKeyword(e.target.value);
  };

  const onCreate = () => {
    setFormData(DEFAULT_USER);
    setOpen(true);
  };

  const onEdit = (id) => {
    setItemLoading(true);

    axios
      .get(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`)
      .then((res) => {
        setFormData(res.data);
        setItemLoading(false);
        setOpen(true);
      });
  };

  const onDelete = (id) => {
    Modal.confirm({
      title: "Xóa dữ liệu này?",
      content: "Dữ liệu sẽ bị mất vĩnh viễn.",
      onOk() {
        setItemLoading(true);

        axios
          .delete(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`)
          .then((res) => {
            setItemLoading(false);
            fetchData();
          });
      },
    });
  };

  const onSubmit = (id, data) => {
    setSubmitLoading(true);

    if (id) {
      axios
        .put(`https://6401ddeb3779a862625fd55d.mockapi.io/users/${id}`, data)
        .then((res) => {
          setSubmitLoading(false);
          setFormData(DEFAULT_USER);
          setOpen(false);
          fetchData();
        });
    } else {
      axios
        .post("https://6401ddeb3779a862625fd55d.mockapi.io/users", data)
        .then((res) => {
          setSubmitLoading(false);
          setFormData(DEFAULT_USER);
          setOpen(false);
          fetchData();
        });
    }
  };

  return (
    <div>
      <FormUser
        open={open}
        loading={submitLoading}
        setOpen={setOpen}
        onSubmit={onSubmit}
        formData={formData}
      />

        <SearchContainer>
            <SearchBox onChange={onSearch} />
            <div>
                <ButtonCreate onClick={onCreate}>New User</ButtonCreate>
            </div>
        </SearchContainer>

      <TableUserList
        loading={tableLoading}
        itemLoading={itemLoading}
        dataSource={dataSource}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default UserComponent;
