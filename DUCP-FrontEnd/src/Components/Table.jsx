import React from 'react';

const Table = ({ title, subtitle, columns, data }) => {
  console.log(data);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                >
                  {column.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => {
                  const cellData = row[column.accessor];
                  return (
                    <td
                      key={column.accessor}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        colIndex === 0 ? 'text-black' : 'text-gray-500'
                      }`}
                    >
                      {React.isValidElement(cellData) ? (
                        cellData
                      ) : (
                        <span>{cellData}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;