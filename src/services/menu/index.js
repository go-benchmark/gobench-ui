export default async function getMenuData () {
  return [
    {
      category: true,
      title: 'Menu'
    },
    {
      title: 'TRANG CHỦ',
      key: 'dashboards',
      icon: 'fe fe-home',
      url: '/'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'TRẠM BIẾN ÁP',
      key: 'cabinet',
      icon: 'fe fe-bolt',
      url: '/cabinets'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'VẬN HÀNH',
      key: 'operation',
      icon: 'fe fe-warning',
      url: '/operations'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'CẢNH BÁO',
      key: 'warning',
      icon: 'fe fe-home',
      url: '/warnings'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'NHÂN VIÊN',
      key: 'employees',
      icon: 'fe fe-home',
      url: '/employees'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'KHU VỰC',
      key: 'zones',
      icon: 'fe fe-home',
      url: '/zones'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'TRỢ GIÚP',
      key: 'help',
      icon: 'fe fe-home',
      url: '/help'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      title: 'CÀI ĐẶT',
      key: 'setting',
      icon: 'fe fe-home',
      url: '/setting'
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      category: true,
      title: 'Thông báo'
    }
  ]
}
