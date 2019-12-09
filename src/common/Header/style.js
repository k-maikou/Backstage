import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  font-size: 14px;
  background: white;
  width: 100%;

  .header-top{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    text-align: right;
    font-size: 14px;

    .btn{
      margin-left: 40px;
      padding: 0 6px;
      font-size: 14px;
      height: 28px;
      background: #ff5d35;
      border: 1px solid #ff5d35;
      color: white;
    }
  }

  .breadcrumb{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border-top: 1px solid #f9c700;

    .breadcrumb-title{
      text-align: center;
      font-size: 18px;
      position: relative;

      &:after{
        position: absolute;
        content: '';
        left: 50%;
        bottom: -9px;
        transform: translate(-50%);
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 10px solid white;
      }
    }
    
    .weather{
      text-align: right;
      color: #999;

      .date{
        margin-right: 10px;
      }
      .weather-detail{
        img{
          width: 26px;
          margin-bottom: 2px;
          margin-right: 4px;
        }
      }
    }
  }

`;
