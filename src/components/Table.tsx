import React from 'react';
import styles from './Table.module.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useTableLogic } from './useTableLogic';

const Table: React.FC = () => {
  const {
    table,
    globalFilter,
    setGlobalFilter,
    isEditMode,
    setIsEditMode,
    updateData,
  } = useTableLogic();

  return (
    <div className={styles.tableContainer}>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button onClick={() => setIsEditMode((prev) => !prev)} className={styles.editButton}>
        {isEditMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
      </button>
      <table className={styles.table}>
        <TableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody rows={table.getRowModel().rows} isEditMode={isEditMode} updateData={updateData} />
      </table>
    </div>
  );
};

export default Table;
