import React from 'react';
import { HeaderGroup } from '@tanstack/react-table';

type TableHeaderProps<T> = {
  headerGroups: HeaderGroup<T>[];
};

const TableHeader = <T,>({ headerGroups }: TableHeaderProps<T>) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
            {header.isPlaceholder ? null : (
              <>
                {typeof header.column.columnDef.header === 'function'
                  ? header.column.columnDef.header(header.getContext())
                  : header.column.columnDef.header}
                {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted() as string] ?? null}
              </>
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default TableHeader;
