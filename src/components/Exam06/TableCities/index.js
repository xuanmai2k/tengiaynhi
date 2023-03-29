import { Table, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Actions, Country, Image, Population } from "./styles";

const getColor = (population) => {
  if (population < 5) {
    return "darkgreen";
  }

  if (population < 10) {
    return "darkgoldenrod";
  }

  return "darkred";
};

const TableCities = (props) => {
  const columns = [
    {
      title: "Thành phố",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
      width: "25%",
      render: (_, item) => {
        return (
          <Country>
            <Image src={item.countryFlag} />
            <div>
              <h6>{item.country}</h6>
              <div>{item.countryCode}</div>
            </div>
          </Country>
        );
      },
    },
    {
      title: "Dân số",
      dataIndex: "population",
      key: "population",
      align: "center",
      width: "25%",
      render: (_, item) => {
        const color = getColor(item.population);
        return (
          <Population color={color}>
            {item.population} <UserOutlined />
          </Population>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      width: "25%",
      render: (text, item) => {
        return (
          <Actions>
            <Button
              onClick={() => {
                props.onGetWeather(item.name);
              }}
            >
              Weather
            </Button>
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
          </Actions>
        );
      },
    },
  ];

  return (
    <Table
      loading={props.loading}
      dataSource={props.dataSource}
      columns={columns}
    />
  );
};

export default TableCities;
