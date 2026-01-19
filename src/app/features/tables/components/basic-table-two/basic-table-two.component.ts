
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxComponent } from '../../../../shared/components/form/input/checkbox.component';

@Component({
  selector: 'app-basic-table-two',
  imports: [
    TagModule,
    AvatarModule,
    CheckboxComponent
],
  templateUrl: './basic-table-two.component.html',
  styles: ``
})
export class BasicTableTwoComponent {

  tableRowData = [
    {
      id: 'DE124321',
      user: { initials: 'AB', name: 'John Doe', email: 'johndoe@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'Software License', price: '$18,50.34', purchaseDate: '2024-06-15' },
      status: { type: 'Complete' },
      actions: { delete: true },
    },
    {
      id: 'DE124322',
      user: { initials: 'CD', name: 'Jane Smith', email: 'janesmith@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'Cloud Hosting', price: '$12,99.00', purchaseDate: '2024-06-18' },
      status: { type: 'Pending' },
      actions: { delete: true },
    },
    {
      id: 'DE124323',
      user: { initials: 'EF', name: 'Michael Brown', email: 'michaelbrown@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'Web Domain', price: '$9,50.00', purchaseDate: '2024-06-20' },
      status: { type: 'Cancel' },
      actions: { delete: true },
    },
    {
      id: 'DE124324',
      user: { initials: 'GH', name: 'Alice Johnson', email: 'alicejohnson@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'SSL Certificate', price: '$2,30.45', purchaseDate: '2024-06-25' },
      status: { type: 'Pending' },
      actions: { delete: true },
    },
    {
      id: 'DE124325',
      user: { initials: 'IJ', name: 'Robert Lee', email: 'robertlee@gmail.com' },
      avatarColor: 'brand',
      product: { name: 'Premium Support', price: '$15,20.00', purchaseDate: '2024-06-30' },
      status: { type: 'Complete' },
      actions: { delete: true },
    },
  ];

  selectedRows: string[] = [];
  selectAll = false;

  handleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedRows = this.tableRowData.map(row => row.id);
    } else {
      this.selectedRows = [];
    }
  }

  handleRowSelect(id: string) {
    if (this.selectedRows.includes(id)) {
      this.selectedRows = this.selectedRows.filter(rowId => rowId !== id);
    } else {
      this.selectedRows = [...this.selectedRows, id];
    }
  }

  getBadgeColor(type: string): 'success' | 'warn' | 'danger' {
    if (type === 'Complete') return 'success';
    if (type === 'Pending') return 'warn';
    return 'danger';
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#e0e7ff', // brand-100 (approx)
      '#fce7f3', // pink-100
      '#cffafe', // cyan-100
      '#ffedd5', // orange-100
      '#dcfce7', // green-100
      '#f3e8ff', // purple-100
      '#fef9c3', // yellow-100
      '#fee2e2', // error-100
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }

  getAvatarTextColor(name: string): string {
    const colors = [
      '#4338ca', // brand-600 (approx)
      '#db2777', // pink-600
      '#0891b2', // cyan-600
      '#ea580c', // orange-600
      '#16a34a', // green-600
      '#9333ea', // purple-600
      '#ca8a04', // yellow-600
      '#dc2626', // error-600
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }
}
