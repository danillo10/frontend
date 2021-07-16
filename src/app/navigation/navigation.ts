import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'inicio',
        title    : 'Inicio',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/inicio',
        first    : true
    },
    {
        id       : 'cadastro',
        title    : 'Cadastro',
        type     : 'collapsable',
        icon     : 'dashboard',
        children : [
            {
                id   : 'clientes',
                title: 'Clientes',
                type : 'item',
                icon : 'dashboard',
                url  : '/cadastro/clientes'
            }
        ]
    }
];
