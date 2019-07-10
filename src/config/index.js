export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '聚美通道-实体商家',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    // dev: 'http://192.168.0.203:8160/merchant/',
    dev: 'http://retail.jumeitd.net/merchant/',
    pro: 'http://retail.jumeitd.com/merchant/' // 生产环境
    // pro: 'http://retail.jumeitd.net/merchant/' // 测试环境
  },
  // uploadImgUrl: 'http://retail.jumeitd.net/merchant/common/file/uploadImgAliy', // 上传图片url 测试环境
  // uploadVideoUrl: 'http://retail.jumeitd.net/merchant/common/file/uploadVideo', // 上传视频url 测试环境
  uploadImgUrl: 'http://retail.jumeitd.net/merchant/common/file/uploadImgAliy', // 上传图片url
  uploadVideoUrl: 'http://retail.jumeitd.net/merchant/common/file/uploadVideo', // 上传视频url
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
  }
}
