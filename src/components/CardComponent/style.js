import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 300px;
    & img{
        height: 300px;
        width: 300px;
    },
    position: relative;
    .ant-card-body{
        padding-left: 10px;
        padding-top: 20px;
    }
    background-color: #fff;
    cursor: pointer;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
    margin-left: 4px;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 12px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`