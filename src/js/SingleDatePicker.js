import React from 'react';

class SingleDatePicker extends React.Component {
  constructor (props) {
    super(props);


    /* * * * * * * * * * * * *
     *                       *
     *      Local State      *
     *                       *
     * * * * * * * * * * * * */

    this.state = {
      seletedDay: undefined,
      quotaOfThisMonth: {}
    };


    /* * * * * * * * * * * * *
     *                       *
     *    Global Veriable    *
     *                       *
     * * * * * * * * * * * * */

    this.currentDate = new Date();


    /* * * * * * * * * * * * *
     *                       *
     *    Method Binding     *
     *                       *
     * * * * * * * * * * * * */

    this.generateDayLabelList   = this.generateDayLabelList.bind(this);
    this.getYear                = this.getYear.bind(this);
    this.getMonth               = this.getMonth.bind(this);
    this.lastMonthButtonHandler = this.lastMonthButtonHandler.bind(this);
    this.nextMonthButtonHandler = this.nextMonthButtonHandler.bind(this);
    this.generateQuotaList      = this.generateQuotaList.bind(this);
  }


  /* * * * * * * * * * * * *
   *                       *
   *    Private Methods    *
   *                       *
   * * * * * * * * * * * * */

  generateDayLabelList() {
    const totalDaysInMonth            = this.getDaysInMonth(this.getYear(), this.getMonth());
    const weekdayOfFirstDayOfTheMonth = this.getWeekdayByDate(this.getYear(), this.getMonth(), 1);
    const totalCount                  = totalDaysInMonth
    var startCount                    = 1;
    var dayLabelList                  = [];
    var activeDayLabel, disableDayLabel;


    if(!isEmpty(weekdayOfFirstDayOfTheMonth)) {

      for(startCount; startCount <= weekdayOfFirstDayOfTheMonth; startCount++) {
        dayLabelList.push(<label key={`placeholder-item-${ startCount }`}></label>);
      }

      startCount = 1;
    }

    if(!isEmpty(totalCount)) {
      for(startCount; startCount <= totalCount; startCount++) {

        if(this.state.quotaOfThisMonth.hasOwnProperty(startCount)) {

          // active day label
          activeDayLabel =
            <label
              key={`displayed-item-${ startCount }`}
              className='day-label-activity'
            >
              { startCount }
            </label>;

          dayLabelList.push(activeDayLabel);

        } else {

          // disable day label
          disableDayLabel =
            <label
              key={`displayed-item-${ startCount }`}
            >
              { startCount }
            </label>

          dayLabelList.push(disableDayLabel);

        }
      }
    }

    return dayLabelList;
  }

  generateQuotaList(year, month) {
    const randomNumber = Math.floor((Math.random() * 100) + 1);
    const maximumQuota = 20;
    const totalDays    = this.getDaysInMonth(year, month);
    const openDays     = this.getRandomNumber(10, totalDays);
    var quotaList = {};
    var propertyName, quota;

    openDays.map(item => {
      propertyName = item.toString();
      quota        = this.getRandomNumber(1, maximumQuota)[0];

      quotaList[propertyName] = {
        quota: quota
      }
    });

    return quotaList;
  }

  getRandomNumber(quantity, maximumValue) {
    var randomNumber;
    var resultList = [];

    while(resultList.length !== quantity) {
      randomNumber = Math.ceil(Math.random() * maximumValue);

      // breaks one iteration, if the following condition occurs
      if(resultList.indexOf(randomNumber) !== -1) {
        continue;
      }

      resultList.push(randomNumber);
    }

    return resultList;
  }

  getYear() {
    return this.currentDate.getFullYear();
  }

  getMonth(dispalyStyle) {
    const enMappingList = ['january', 'february', 'march', 'april', 'may', 'june',
                           'july', 'august', 'september', 'october', 'november',
                           'december'];
    const zhMappingList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
                           '八月', '九月', '十月', '十一月', '十二月'];

    switch(dispalyStyle) {
      case 'en':
        return enMappingList[this.currentDate.getMonth()];

      case 'zh':
        return zhMappingList[this.currentDate.getMonth()];

      default:
        return this.currentDate.getMonth() + 1;
    }
  }

  getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  };

  getWeekdayByDate(year, month, day) {
    var month = month - 1;

    return new Date(year, month, day).getDay();
  }

  lastMonthButtonHandler() {
    const currentUTCMonth = this.currentDate.getUTCMonth();

    this.currentDate.setUTCMonth(currentUTCMonth - 1);

    // MUST to REMOVE from production environment
    this.forceUpdate();
  }

  nextMonthButtonHandler() {
    const currentUTCMonth = this.currentDate.getUTCMonth();

    this.currentDate.setUTCMonth(currentUTCMonth + 1);

    // MUST to REMOVE from production environment
    this.forceUpdate();
  }

  render() {
    return (
      <div className='single-date-picker'>

        {/* Header */}
        <div className='single-date-picker-header'>

          {/* Last Month Button */}
          <a className='single-date-picker-header-button' onClick={ this.lastMonthButtonHandler }>
            <i className='fa fa-angle-left fa-fw' aria-hidden='true'></i>
          </a>

          {/* Title */}
          <h1>{`${ this.getMonth('zh') } ${ this.getYear() }`}</h1>

          {/* Next Month Button */}
          <a className='single-date-picker-header-button' onClick={ this.nextMonthButtonHandler }>
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
          <div className='single-date-picker-day-label'>
            { this.generateDayLabelList() }
          </div>

        </div>

        {/* Footer */}
        <div className='single-date-picker-footer'></div>

      </div>
    );
  }
}

export default SingleDatePicker;
