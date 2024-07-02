import React from 'react';
import { Row } from '@tanstack/react-table';
import TableRow from './TableRow';
import { Data } from './types';

type TableBodyProps = {
  rows: Row<Data>[];
  isEditMode: boolean;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

const TableBody: React.FC<TableBodyProps> = ({ rows, isEditMode, updateData }) => (
  <tbody>
    {rows.map((row) => (
      <TableRow key={row.id} row={row} isEditMode={isEditMode} updateData={updateData} />
    ))}
  </tbody>
);

export default TableBody;
