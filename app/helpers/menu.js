const getMenu = (role) => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          subMenu: [
            { titulo: 'Main', url: '/'},
            { titulo: 'ProgressBar', url: 'progress'},
            { titulo: 'Grafica', url: 'grafica1'},
            { titulo: 'Rxjs', url: 'rxjs'}
    
          ]
        },
        {
          titulo: 'Gestión',
          icono: 'mdi mdi-folder-lock-open',
          subMenu: [
            { titulo: 'Hospitales', url: 'hospitales'},
            { titulo: 'Médicos', url: 'medicos'},
    
          ]
        },
      ]

      if (role === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({ titulo: 'Usuarios', url: 'usuarios'})
      }

      return menu;
}

module.exports = {getMenu};