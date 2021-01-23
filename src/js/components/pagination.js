import apiService from '../apiService';
import 'paginationjs';

const paginationObject = {
  dataSource: function (done) {
    var result = [];
    for (var i = 1; i < this.totalNumber; i++) {
      result.push(i);
    }
    done(result);
  },

  totalNumber: 0,
  pageSize: 12,

  pageNumber: apiService.page,

  //   showPrevious: false,
  //   showNext: false,

  pageRange: 1,
  triggerPagingOnInit: false,
  className: 'paginationjs-theme-blue paginationjs-big',
};
// console.log(paginationObject);
// console.log($('#pagination').prev());

export default paginationObject;
