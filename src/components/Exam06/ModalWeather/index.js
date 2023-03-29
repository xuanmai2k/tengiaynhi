import axios from "axios";
import { useState, useEffect } from "react";
//import { Image } from "antd";
import { ModalNew, Condition, Image } from "./styles";

const ModalWeather = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (name !== "") {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=1a95157ac32a413c975113659232703&q=${name}&aqi=no`
        )
        .then((res) => {
          setData(res.data);
          setOpen(true);
        });
    }
  }, [name]);

  const onCancel = () => {
    setOpen(false)
  }

  return (
    <ModalNew open={open} footer={null} onCancel={onCancel}>
      {data.location && data.current && (
        <div>
          <div>Thành phố: {data.location.name}</div>
          <div>humidity: {data.current.humidity} </div>
          <div>Nhiệt độ: {data.current.temp_c}</div>
          <div>Nhiệt độ cảm nhận: {data.current.feelslike_c}</div>
          <Condition>
            <Image src={data.current.condition.icon}/>
            <div> Thời Tiết: {data.current.condition.text}</div>
          </Condition>
        </div>
      )}
    </ModalNew>
  );
};

export default ModalWeather;
