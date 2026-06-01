import React from 'react';
import useContents from '../../hooks/useContents';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';

const Content = () => {
  const {
    currentContents,
    filteredContent,
    isLoading,
    error,
    currentPage,
    totalPages,
    indexOfFirstItem,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
    handleEdit,
    handleDelete,
    handleViewDetails
  } = useContents(10);

  // Column definitions for atomic Table
  const columns = [
    {
      header: '#',
      accessor: (item) => (
        <span className="font-semibold text-gray-500">
          {indexOfFirstItem + currentContents.indexOf(item) + 1}
        </span>
      ),
      width: '80px'
    },
    {
      header: 'หัวข้อคอนเทนท์',
      accessor: (item) => (
        <button
          className="btn btn-link text-primary text-decoration-none p-0 font-medium cursor-pointer"
          onClick={() => handleViewDetails(item.id)}
        >
          {item.content_name}
        </button>
      )
    },
    {
      header: 'จัดการ',
      accessor: (item) => (
        <div className="flex justify-center gap-2">
          <Button 
            variant="primary" 
            className="px-3 py-1 text-xs" 
            onClick={() => handleEdit(item.id)}
          >
            แก้ไข
          </Button>
          <Button 
            variant="danger" 
            className="px-3 py-1 text-xs" 
            onClick={() => handleDelete(item.id)}
          >
            ลบ
          </Button>
        </div>
      ),
      width: '220px'
    }
  ];

  return (
    <div className='tb-content mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Reusable, Virtualized Table Component */}
      <Table
        data={currentContents}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="ไม่พบข้อมูลคอนเทนท์ในระบบ"
      />

      {!isLoading && filteredContent.length > 0 && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link shadow-none" onClick={handlePreviousPage}>ก่อนหน้า</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link shadow-none" onClick={() => handlePageClick(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link shadow-none" onClick={handleNextPage}>ถัดไป</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Content;
