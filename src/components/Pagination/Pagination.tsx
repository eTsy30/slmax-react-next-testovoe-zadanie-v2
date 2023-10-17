import React from 'react'
import styles from './Pagination.module.css'
import { PaginationProps } from '@/Types/Type'

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageRangeDisplayed = 5
  const firstPage = 1
  const lastPage = totalPages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPagination = () => {
    const pageButtons = []

    if (totalPages <= pageRangeDisplayed) {
      for (let i = firstPage; i <= lastPage; i++) {
        pageButtons.push(
          <button
            className={styles.button}
            key={i}
            onClick={() => handleGoToPage(i)}
            style={{ color: i === currentPage ? 'red' : 'white' }}
          >
            {i}
          </button>
        )
      }
    } else {
      const leftOffset = Math.floor(pageRangeDisplayed / 2)
      const rightOffset = lastPage - leftOffset

      if (currentPage <= leftOffset) {
        for (let i = firstPage; i <= pageRangeDisplayed; i++) {
          pageButtons.push(
            <button
              className={styles.button}
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'red' : 'white' }}
            >
              {i}
            </button>
          )
        }
      } else if (currentPage >= rightOffset) {
        for (let i = lastPage - pageRangeDisplayed + 1; i <= lastPage; i++) {
          pageButtons.push(
            <button
              className={styles.button}
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'red' : 'white' }}
            >
              {i}
            </button>
          )
        }
      } else {
        for (
          let i = currentPage - leftOffset;
          i <= currentPage + leftOffset;
          i++
        ) {
          pageButtons.push(
            <button
              className={styles.button}
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'red' : 'white' }}
            >
              {i}
            </button>
          )
        }
      }
    }

    return pageButtons
  }

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.button}
        style={currentPage < 2 ? { color: 'grey' } : {}}
        onClick={handlePrevPage}
        disabled={currentPage < 2}
      >
        {' '}
        <i className="fa-regular fa-circle-up" style={{ fontSize: '30px' }}></i>
      </button>
      {currentPage <= firstPage + 2 || (
        <button
          onClick={() => handleGoToPage(1)}
          className={styles.button}
          style={{ color: 'white' }}
        >
          1
        </button>
      )}
      {renderPagination()}
      {currentPage >= lastPage - 2 || (
        <button
          className={styles.button}
          onClick={() => handleGoToPage(lastPage)}
          style={{ color: 'white' }}
        >
          {lastPage}
        </button>
      )}
      <button
        className={styles.button}
        style={currentPage === totalPages ? { color: 'grey' } : {}}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {' '}
        <i
          className="fa-regular fa-circle-down"
          style={{ fontSize: '30px' }}
        ></i>
      </button>
    </div>
  )
}

export default Pagination
