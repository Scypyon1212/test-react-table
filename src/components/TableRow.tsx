import React from 'react';
import { Row } from '@tanstack/react-table';
import { Data } from './types';
import styles from './Table.module.scss';
import EditableCell from './EditableCell';

type TableRowProps = {
  row: Row<Data>;
  isEditMode: boolean;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
};

const TableRow: React.FC<TableRowProps> = ({ row, isEditMode, updateData }) => (
  <tr className={row.original.age >= 20 && row.original.age <= 30 ? styles.highlightedRow : ''}>
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id}>
        <EditableCell
          value={cell.getValue()}
          rowIndex={row.index}
          columnId={cell.column.id}
          updateData={updateData}
          isEditMode={isEditMode}
        />
      </td>
    ))}
  </tr>
);

export default TableRow;
