import styled from "styled-components";
import { Button,Input } from "antd";
//npm install styled-components --save
//npm install axios --save
// 1 rem=16px
// 8px = 0.5 rem
// 20px = 1.25rem
// 24px = 1.5rem
// 32px = 2rem
// 40px = 2.5rem


export const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
`
export const SearchBox = styled(Input.Search)`
    width: 30%;
`

export const ButtonCreate = styled( Button )`
    display: block;
`