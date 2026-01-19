import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-basic-table-four',
  imports: [
    TagModule,
    MenuModule,
    ButtonModule
],
  templateUrl: './basic-table-four.component.html',
  styles: ``
})
export class BasicTableFourComponent {

  campaigns = [
    {
      id: 1,
      creator: {
        image: '/images/user/user-01.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-01.svg',
        name: 'Grow your brand by...',
        type: 'Ads campaign',
      },
      status: 'Success',
    },
    {
      id: 2,
      creator: {
        image: '/images/user/user-02.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-02.svg',
        name: 'Make Better Ideas...',
        type: 'Ads campaign',
      },
      status: 'Pending',
    },
    {
      id: 3,
      creator: {
        image: '/images/user/user-03.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-03.svg',
        name: 'Increase your website tra...',
        type: 'Ads campaign',
      },
      status: 'Success',
    },
    {
      id: 4,
      creator: {
        image: '/images/user/user-04.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-04.svg',
        name: 'Grow your brand by...',
        type: 'Ads campaign',
      },
      status: 'Failed',
    },
    {
      id: 5,
      creator: {
        image: '/images/user/user-05.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-05.svg',
        name: 'Grow your brand by...',
        type: 'Ads campaign',
      },
      status: 'Success',
    },
    {
      id: 6,
      creator: {
        image: '/images/user/user-06.jpg',
        name: 'Wilson Gouse',
      },
      campaign: {
        image: '/images/brand/brand-06.svg',
        name: 'Grow your brand by...',
        type: 'Ads campaign',
      },
      status: 'Success',
    },
  ];

  tableActions: MenuItem[] = [
    { 
      label: 'Ver más', 
      icon: 'pi pi-eye', 
      command: () => this.handleViewMore()
    },
    { 
      label: 'Eliminar', 
      icon: 'pi pi-trash', 
      command: () => this.handleDelete()
    }
  ];

  handleViewMore() {
    console.log('View More clicked');
    // Add your view more logic here
  }

  handleDelete() {
    console.log('Delete clicked');
    // Add your delete logic here
  }

  getBadgeColor(status: string): 'success' | 'warn' | 'danger' {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warn';
    return 'danger';
  }
}
