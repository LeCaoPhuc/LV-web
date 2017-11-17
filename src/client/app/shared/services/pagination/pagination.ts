export class Pagination {
  private _mode: string;
  private _getData: Function;
  private _search: Function;
  private _searchData: any;
  private _filter: Function;
  private _filterData: any;
  private _page: number = 1;
  private _perPage: number = 10;
  private _skipMore: number = 0;
  private _numOfPage: number = 0;
  private _numOfRecord: number = 0;
  private _getNumOfPage: Function;
  private _data: any;
  private _loading: boolean = false;
  private _enableLoading: boolean = false;
  private _maxPageInPagination: number = 5;
  private _enableMaxPageMode: boolean = true;
  private _pageList: any = [];

  get mode(): string {
    return this._mode;
  }

  set mode(mode: string) {
    this._mode = mode;
  }

  get getData(): Function {
    return this._getData;
  }
  set getData(getData: Function) {
    this._getData = getData;
  }

  get search(): Function {
    return this._search;
  }
  set search(search: Function) {
    this._search = search;
  }

  get searchData(): any {
    return this._searchData;
  }
  set searchData(searchData: any) {
    this._searchData = searchData;
  }

  get filter(): Function {
    return this._filter;
  }
  set filter(filter: Function) {
    this._filter = filter;
  }

  get filterData(): any {
    return this._filterData;
  }
  set filterData(filterData: any) {
    this._filterData = filterData;
  }

  get page() {
    return this._page;
  }
  set page(value: any) {
    this._page = value;
  }

  get perPage() {
    return this._perPage;
  }
  set perPage(value: any) {
    this._perPage = value;
    this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
  }

  get skipMore() {
    return this._skipMore;
  }
  set skipMore(value: any) {
    this._skipMore = value;
  }

  get numOfPage() {
    return this._numOfPage;
  }
  set numOfPage(value: any) {
    this._numOfPage = value;
  }

  get getNumOfPage() {
    return this._getNumOfPage;
  }
  set getNumOfPage(value: any) {
    this._getNumOfPage = value;
  }

  get numOfRecord() {
    return this._numOfRecord;
  }
  set numOfRecord(value: any) {
    this._numOfRecord = value;
    this.numOfPage = Math.ceil(this.numOfRecord / this.perPage);
  }

  get data() {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
  }

  get loading() {
    return this._loading;
  }
  set loading(value: any) {
    this._loading = value;
  }

  get enableLoading() {
    return this._enableLoading;
  }
  set enableLoading(value: any) {
    this._enableLoading = value;
  }

  get maxPageInPagination(){
    return this._maxPageInPagination;
  }

  set maxPageInPagination(value: any) {
    this._maxPageInPagination = value;
  }

  get enableMaxPageMode() {
    return this._enableMaxPageMode;
  }
  set enableMaxPageMode(value: any) {
    this._enableMaxPageMode = value;
  }

  get pageList() {
    return this._pageList;
  }
  set pageList(value: any) {
    this._pageList = value;
  }

  constructor(getData?: Function, getNumOfPage?: Function, page?: number, perPage?: number) {
    var self = this;
    this.getData = getData;
    if (page) this.page = page;
    else this.page = 1;
    if (perPage) this.perPage = perPage;
    else this.perPage = 10;
    if (getNumOfPage) {
      this.getNumOfPage = getNumOfPage;
      this.executeGetNumOfPage();
    }
  }

  private executeGetData(): Promise<any> {
    this.mode = 'getData';
    var self = this;
    return new Promise((resolve: any, reject: any) => {
      self.getData(self.page, self.perPage).then((data: any) => {
        self.data = data;
        resolve(data);
      }).catch((err: any) => {
        reject(err);
      })
    })
  }

  private executeSearch(data?: any): Promise<any> {
    this.mode = 'search';
    if (data) this.searchData = data;
    var self = this;
    return new Promise((resolve: any, reject: any) => {
      self.search(self.page, self.perPage, self.searchData).then((data: any) => {
        self.data = data;
        resolve(data);
      }).catch((err: any) => {
        reject(err);
      })
    })
  }

  private executeFilter(data?: any): Promise<any> {
    this.mode = 'filter';
    if (data) this.filterData = data;
    var self = this;
    return new Promise((resolve: any, reject: any) => {
      self.filter(self.page, self.perPage, self.filterData).then((data: any) => {
        self.data = data;
        resolve(data);
      }).catch((err: any) => {
        reject(err);
      })
    })
  }

  public executeGetNumOfPage(callback?: Function) {
    var self = this;
    this.getNumOfPage().then((count: number) => {
      self.numOfRecord = count;
      self.numOfPage = Math.ceil(count / self.perPage);
      self.makePageList();
      if (callback) callback();
    }).catch((err: any) => {
      console.log(err);
    })
  }

  private getStartByPage(page?: number) {
    if (page) {
      return (page - 1) * this.perPage;
    } else {
      return (this.page - 1) * this.perPage;
    }
  }

  private executeData(data?: any) {
    switch (this.mode) {
      case 'getData': {
        return this.executeGetData();
      }
      case 'search': {
        return this.executeSearch(data);
      }
      case 'filter': {
        return this.executeFilter(data);
      }
      default: {
        return this.executeGetData();
      }
    }
  }

  public makePageList() {
    if (this.enableMaxPageMode) {
      console.log(this.numOfPage);
      this.pageList = [];
      if (this.page <= Math.ceil(this.maxPageInPagination/2)) {
        for (let i = 0; i < this.maxPageInPagination; i++) {
          if (i < this.numOfPage)
            this.pageList.push(i + 1);
        }
      }
      else if (this.numOfPage - this.page < Math.ceil(this.maxPageInPagination/2)) {
        for (let i = this.numOfPage - 1; i >= this.numOfPage - this.maxPageInPagination; i--) {
          this.pageList.unshift(i + 1);
        }
      } else {
        for (let i = this.page - (Math.floor(this.maxPageInPagination/2) + 1); i <= this.page + (Math.floor(this.maxPageInPagination/2) - 1); i++) {
          this.pageList.push(i + 1);
        }
      }
    } else {
      this.pageList = [];
      for (let i = 0; i < this.numOfPage; i++) {
        this.pageList.push(i + 1);
      }
    }
  }

  public getPage(page: number, data?: any) {
    var self = this;
    if (this.loading) return new Promise(function (resolve, reject) {
      resolve(null);
    });
    this.page = page;
    if (this.enableLoading) this.loading = true;
    return this.executeData(data).then((res: any) => {
      self.loading = false;
      self.makePageList();
      return res;
    }).catch((err: any) => {
      self.loading = false;
      return Promise.reject(err);
    })
  }

  public nextPage(data?: any) {
    var self = this;
    if (this.loading) return new Promise(function (resolve, reject) {
      resolve(null);
    });
    this.page++;
    if (this.enableLoading) this.loading = true;
    return this.executeData(data).then((res: any) => {
      self.loading = false;
      self.makePageList();
      return res;
    }).catch((err: any) => {
      self.loading = false;
      return Promise.reject(err);
    })
  }

  public prevPage(data?: any) {
    var self = this;
    if (this.loading) return new Promise(function (resolve, reject) {
      resolve(null);
    });
    this.page--;
    if (this.enableLoading) this.loading = true;
    return this.executeData(data).then((res: any) => {
      self.loading = false;
      self.makePageList();
      return res;
    }).catch((err: any) => {
      self.loading = false;
      return Promise.reject(err);
    })
  }

  public firstPage(data?: any) {
    var self = this;
    if (this.loading) return new Promise(function (resolve, reject) {
      resolve(null);
    });
    this.page = 1;
    if (this.enableLoading) this.loading = true;
    return this.executeData(data).then((res: any) => {
      self.loading = false;
      self.makePageList();
      return res;
    }).catch((err: any) => {
      self.loading = false;
      return Promise.reject(err);
    })
  }

  public lastPage(data?: any) {
    var self = this;
    if (this.loading) return new Promise(function (resolve, reject) {
      resolve(null);
    });
    this.page = self.numOfPage;
    if (this.enableLoading) this.loading = true;
    return this.executeData(data).then((res: any) => {
      self.loading = false;
      self.makePageList();
      return res;
    }).catch((err: any) => {
      self.loading = false;
      return Promise.reject(err);
    })
  }
}
