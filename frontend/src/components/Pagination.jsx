const Pagination = ({ currentPage, totalPages, onPageChange,loading }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    return (
        <div className="pagination">
            <button className="pagination-btn" onClick={handlePrevious} disabled={loading || currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button className="pagination-btn" onClick={handleNext} disabled={loading || currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination