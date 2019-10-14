export const Menus = [
  {
    'name': 'Entity',
    'link': '/admin/admin/entity',
    'icon': 'dashboard',
    'chip': false,
    'open': true,
  },
  {
    'name': 'Branch',
    'link': '/admin/admin/branch',
    'icon': 'dashboard',
    'chip': false,
    'open': true,
  },
  {
    'name': 'Roles',
    'link': '/admin/admin/role',
    'icon': 'dashboard',
    'chip': false,
    'open': true,
  },
  {
    'name': 'Users',
    'link': '/admin/admin/user',
    'icon': 'dashboard',
    'chip': false,
    'open': true,
  },
  {
    'name': 'Billing',
    'icon': 'widgets',
    'link': false,
    'open': false,
    'chip': {'value': 17, 'color': 'accent'},
    'sub': [
      {
        'name': 'Payment Package',
        'link': '/admin/admin/payment',
        'icon': 'indeterminate_check_box',
        'chip': false,
        'open': false,
      }
    ]
  }
];
