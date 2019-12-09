import styled from 'styled-components';

export const OrderWrapper = styled.div`
  padding: 20px;
`
export const DetailWrapper = styled.div`
  padding: 20px;
  
`
export const DetailMap = styled.div`
  height: 450px;
  width: 100%;
  margin: 25px auto;
`
export const DetailItem = styled.div`
  margin-left: 90px;
  padding: 25px 50px 25px 0;
  border-bottom: 1px solid #999;
  &:last-child{
    border-bottom: none;
  }
`
export const ItemTitle = styled.div`
  margin: 20px 0;
  font-size: 20px;
`
export const DetailForm = styled.ul`
  li{
    margin: 20px 0;
    line-height: 20px;
    font-size: 15px;
    color: #999;
    list-style: none;
    &::after{
      content: '';
      clear: both;
      display: block;
      visibility: hidden;
    }

    .form-left{
      float: left;
      width: 165px;
      text-align: right;
    }
    .form-content{
      padding-left: 194px;
    }
  }
`
