import React, { useState, useEffect } from 'react';
import styles from './Table.module.scss';

type EditableCellProps = {
  value: any;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
  isEditMode: boolean;
};

const EditableCell: React.FC<EditableCellProps> = ({ value: initialValue, rowIndex, columnId, updateData, isEditMode }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(rowIndex, columnId, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isEditMode) {
    return <>{value}</>;
  }

  if (columnId === 'gender') {
    return (
      <select value={value} onChange={onChange} onBlur={onBlur} className={styles.editableInput}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    );
  }

  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={styles.editableInput}
    />
  );
};

export default EditableCell;
