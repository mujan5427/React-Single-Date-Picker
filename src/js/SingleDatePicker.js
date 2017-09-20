import React from 'react';

class SingleDatePicker extends React.Component {
  constructor (props) {
    super(props);

    this.generateDayLabelList = this.generateDayLabelList.bind(this);
  }

  generateDayLabelList() {
    const { days } = this.props;
    const totalCount = days
    var startCount   = 1;
    var dayLabelList = [];

    if(!isEmpty(days)) {

      for(startCount; startCount <= totalCount; startCount++) {
        dayLabelList.push(<label>{ startCount }</label>);
      }
    }

    return dayLabelList;
  }

  render() {
    const { days } = this.props;

    return (
      <div className='single-date-picker'>

        {/* Header */}
        <div className='single-date-picker-header'>
          <a className='single-date-picker-header-button'>
            <i className='fa fa-angle-left fa-fw' aria-hidden='true'></i>
          </a>
          <h1>九月 2017</h1>
          <a className='single-date-picker-header-button'>
            <i className='fa fa-angle-right fa-fw' aria-hidden='true'></i>
          </a>
        </div>

        {/* Content */}
        <div className='single-date-picker-content'>

          {/* Week Label */}
          <div className='single-date-picker-week-label'>
            <label>日</label>
            <label>一</label>
            <label>二</label>
            <label>三</label>
            <label>四</label>
            <label>五</label>
            <label>六</label>
          </div>

          {/* Day Label */}
          { days &&
            <div className='single-date-picker-day-label'>
              { this.generateDayLabelList() }
            </div>
          }

        </div>

        {/* Footer */}
        <div className='single-date-picker-footer'></div>

      </div>
    );
  }
}

export default SingleDatePicker;
