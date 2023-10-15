import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

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
            key={i}
            onClick={() => handleGoToPage(i)}
            style={{ color: i === currentPage ? 'blue' : 'black' }}
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
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'blue' : 'black' }}
            >
              {i}
            </button>
          )
        }
      } else if (currentPage >= rightOffset) {
        for (let i = lastPage - pageRangeDisplayed + 1; i <= lastPage; i++) {
          pageButtons.push(
            <button
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'blue' : 'black' }}
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
              key={i}
              onClick={() => handleGoToPage(i)}
              style={{ color: i === currentPage ? 'blue' : 'black' }}
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        gap: 2,
        marginBottom: 40,
      }}
    >
      <button
        style={currentPage < 2 ? { color: 'grey' } : {}}
        onClick={handlePrevPage}
        disabled={currentPage < 2}
      >
        Назад
      </button>
      {currentPage <= firstPage + 2 || (
        <button onClick={() => handleGoToPage(1)} style={{ color: 'black' }}>
          1
        </button>
      )}
      {renderPagination()}
      {currentPage >= lastPage - 2 || (
        <button
          onClick={() => handleGoToPage(lastPage)}
          style={{ color: 'black' }}
        >
          {lastPage}
        </button>
      )}
      <button
        style={currentPage === totalPages ? { color: 'grey' } : {}}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Далее
      </button>
    </div>
  )
}

export default Pagination
