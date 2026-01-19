export interface InvoiceUser {
  id: string;
  name: string;
  image: string;
  active?: boolean;
}

export interface InvoiceItem {
  sno: number;
  product: string;
  qty: number;
  unitCost: string;
  discount: string;
  total: string;
}

export interface Invoice {
  id: string;
  from: {
    name: string;
    address: string[];
  };
  to: {
    name: string;
    address: string[];
  };
  issuedOn: string;
  dueOn: string;
  items: InvoiceItem[];
  subTotal: string;
  vat: string;
  total: string;
}
