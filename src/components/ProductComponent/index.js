import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import SearchBox from "./SearchBox";
import FormProduct from "./FormProduct";
import TableProductList from "./TableProductList";
import { useLocation } from "react-router-dom";
import { ButtonCreate, SearchContainer } from "./styles";

const DEFAULT_PRODUCT ={
    name: "",
    code: "",
    price: "",
    description: "",
    thumbnail: "",
};

const ProductComponent = () => {
    const location = useLocation();
    const [formData, setFormData] = useState(DEFAULT_PRODUCT);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState (false);
    const [itemLoading, setItemLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [keyword, setKeyword] = useState("");


  useEffect(() => {
    fetchData();
  }, [location]);

  const fetchData = () => {
    const searchParams = new URLSearchParams(location.search)
    const baseUrl = "https://6401ddeb3779a862625fd55d.mockapi.io/products"
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
    setFormData(DEFAULT_PRODUCT);
    setOpen(true);
  };

  const onEdit = (id) => {
    setItemLoading(true);

    axios
      .get(`https://6401ddeb3779a862625fd55d.mockapi.io/products/${id}`)
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
          .delete(`https://6401ddeb3779a862625fd55d.mockapi.io/products/${id}`)
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
        .put(`https://6401ddeb3779a862625fd55d.mockapi.io/products/${id}`, data)
        .then((res) => {
          setSubmitLoading(false);
          setFormData(DEFAULT_PRODUCT);
          setOpen(false);
          fetchData();
        });
    } else {
      axios
        .post("https://6401ddeb3779a862625fd55d.mockapi.io/products", data)
        .then((res) => {
          setSubmitLoading(false);
          setFormData(DEFAULT_PRODUCT);
          setOpen(false);
          fetchData();
        });
    }
  };

  return (
    <div>
      <FormProduct
        open={open}
        loading={submitLoading}
        setOpen={setOpen}
        onSubmit={onSubmit}
        formData={formData}
      />

        <SearchContainer>
            <SearchBox onChange={onSearch} />
            <div>
                <ButtonCreate onClick={onCreate}>New Product</ButtonCreate>
            </div>
        </SearchContainer>

      <TableProductList
        loading={tableLoading}
        itemLoading={itemLoading}
        onEdit={onEdit}
        onDelete={onDelete}
        dataSource={dataSource}
      />
    </div>
  );
};

export default ProductComponent;
