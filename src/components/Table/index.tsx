import { Table } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const TableCell = forwardRef<HTMLTableCellElement, Table.CellProps>(function Component(props, ref) {
  return <Table.Cell ref={ref} py={3} px={5} {...props} />;
});

export const TableColumnHeader = forwardRef<HTMLTableCellElement, Table.ColumnHeaderProps>(
  function Component(props, ref) {
    return <Table.ColumnHeader ref={ref} pt={5} pb={3} px={5} {...props} />;
  },
);
