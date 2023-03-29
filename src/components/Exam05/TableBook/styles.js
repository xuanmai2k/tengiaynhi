import styled from "styled-components";

//style(component)
//style.[name]
export const Action = styled.div`
    button{
        display: block;
        margin-right: 20px;
        color:#1c2130;
        background-color: #f8b195;
        border-color:#1c2130 !important;

        &:hover {
            color: #1c2130;
            background-color: #f67280;
            border-color: #1c2130 !important;
        }
    
        &:active, &:focus {
            color: #1c2130;
            background-color: #e21b5a;
            border-color: #1c2130 !important;
        }
    }
`