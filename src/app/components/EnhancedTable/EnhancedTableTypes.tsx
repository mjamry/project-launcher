export type Order = 'asc' | 'desc';
export type Align = 'right' | 'left';

export interface HeadCell {
  disablePadding: boolean;
  disableSorting?: boolean;
  id: keyof any;
  label: string;
  align?: Align;
}

export function descendingComparator(a: any, b: any, orderBy: keyof any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: string | Date },
    b: { [key in Key]: string | Date },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
