import React from 'react';
import useContents from '../../hooks/useContents';

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

  return (
    <div className='tb-content mt-3'>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {isLoading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">กำลังโหลด...</span>
          </div>
        </div>
      )}

      <div className="table-responsive shadow-sm rounded-lg overflow-hidden border border-gray-200">
        <table className="table table-bordered table-gray table-striped text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '80px' }}>#</th>
              <th scope="col" className="text-start">หัวข้อคอนเทนท์</th>
              <th scope="col" style={{ width: '220px' }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && currentContents.length > 0 ? (
              currentContents.map((content, index) => (
                <tr key={content.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="font-semibold text-gray-500">{indexOfFirstItem + index + 1}</td>
                  <td className="text-start font-semibold">
                    <button
                      className="btn btn-link text-primary text-decoration-none p-0 font-medium"
                      onClick={() => handleViewDetails(content.id)}
                    >
                      {content.content_name}
                    </button>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary btn-sm rounded-md px-3 mr-2" 
                      onClick={() => handleEdit(content.id)}
                    >
                      แก้ไข
                    </button>{' '}
                    <button 
                      className="btn btn-danger btn-sm rounded-md px-3" 
                      onClick={() => handleDelete(content.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : !isLoading ? (
              <tr>
                <td colSpan="3" className="text-muted py-4">ไม่พบข้อมูลคอนเทนท์</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {!isLoading && filteredContent.length > 0 && (
        <nav aria-label="Page navigation" className="mt-3">
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
