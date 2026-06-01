import React, { useMemo } from 'react';

export function Table({
  data = [],
  columns = [],
  isLoading,
  emptyMessage = "ไม่พบข้อมูลในระบบ"
}) {
  const headers = useMemo(() => (
    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold tracking-wider">
      {columns.map((col, idx) => (
        <th key={idx} scope="col" className="px-6 py-4 text-center" style={{ width: col.width }}>
          {col.header}
        </th>
      ))}
    </tr>
  ), [columns]);

  return (
    <div className="w-full overflow-x-auto shadow-[var(--shadow-card)] rounded-[var(--radius-primary)] border border-gray-200 bg-white">
      <table className="w-full border-collapse text-center align-middle">
        <thead>{headers}</thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="py-8">
                <div className="flex justify-center items-center">
                  <div className="animate-pulse h-2 w-24 bg-gray-200 rounded" />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50 transition-colors duration-150 text-sm text-gray-700">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-8 text-gray-500 font-medium">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
