import React , { PureComponent } from 'react';
import CityForm from './components/form';
import OpenCityForm from './components/openCityForm';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { CityWrapper } from './style';
import Utils from '../../utils/utils';
import { Card, Button, Table, Modal, message } from 'antd';

class City extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      pagination: {}
    }
    this.params = {
      page: 1
    }
  }

  componentDidMount() {
    const { request } = this.props;
    request(this.params.page);
    this.handlePage()
  }

  handlePage = () => {
    const _this = this;
    const data = {
      page: 1,
      page_size: 10,
      total_count: 60
    }
      this.setState({
        pagination: Utils.pagination(data, (current) => {
          _this.params.page = current;
          _this.props.request();
        })
      })

  }

  render() {
    const { columns, cityList, isShow, handleOpenCity, hiddenModal, handleSubmit } = this.props;

    return (
      <CityWrapper>
        <Card className='card'>
          <CityForm/>
        </Card>

        <Card className='card'>
          <Button
            type='primary'
            onClick={handleOpenCity}
            style={{marginBottom: 10}}
          >
            开通城市
          </Button>
          <Table
            columns={columns}
            dataSource={cityList}
            pagination={this.state.pagination}
          />
          <Modal
            visible={isShow}
            onCancel={hiddenModal}
            onOk={() => handleSubmit(this.cityForm)}
            title= '开通城市'
          >
            <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
          </Modal>
        </Card>
      </CityWrapper>
    )
  }

}

const mapState = (state) => ({
  columns: state.getIn(['city', 'columns']).toJS(),
  cityList: state.getIn(['city', 'cityList']).toJS(),
  data: state.getIn(['city', 'data']).toJS(),
  isShow: state.getIn(['city', 'isShowOpenCity'])
});

const mapDispatch = (dispatch) => ({
  request(page) {
    dispatch(actionCreators.getHttpData(page));
  },
  handleOpenCity() {
    dispatch(actionCreators.isShowButton());
  },
  hiddenModal() {
    dispatch(actionCreators.clickHiddenModal());
  },
  handleSubmit(cityForm) {
    let cityInfo = cityForm.props.form.getFieldsValue();
    message.success('开通成功！');
    // this.handlePage();
    dispatch(actionCreators.getCityHttp(cityInfo));
  }
});

export default connect(mapState, mapDispatch)(City);
