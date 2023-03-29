import styled from "styled-components";
import { Input, Button } from "antd";

export const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
`

export const SearchBox = styled(Input.Search)`
    width: 30%;
`

export const ButtonCreate = styled(Button)`
    display: block;
`