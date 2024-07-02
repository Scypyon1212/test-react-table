import { useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Data } from './types';

const initialData: Data[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 28, gender: 'Male' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34, gender: 'Female' },
  { id: 3, firstName: 'Alice', lastName: 'Johnson', age: 24, gender: 'Female' },
  { id: 4, firstName: 'Bob', lastName: 'Brown', age: 45, gender: 'Male' },
];

export const useTableLogic = () => {
  const [data, setData] = useState<Data[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: 'firstName',
      header: () => <span>First Name</span>,
      cell: (info) => (
        <span>{info.getValue() as React.ReactNode}</span>
      ),
    },
    {
      accessorKey: 'lastName',
      header: () => <span>Last Name</span>,
      cell: (info) => (
        <span>{info.getValue() as React.ReactNode}</span>
      ),
    },
    {
      accessorKey: 'age',
      header: () => <span>Age</span>,
      cell: (info) => (
        <span>{info.getValue() as React.ReactNode}</span>
      ),
    },
    {
      accessorKey: 'gender',
      header: () => <span>Gender</span>,
      cell: (info) => (
        <span>{info.getValue() as React.ReactNode}</span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return {
    table,
    globalFilter,
    setGlobalFilter,
    isEditMode,
    setIsEditMode,
    updateData,
  };
};
