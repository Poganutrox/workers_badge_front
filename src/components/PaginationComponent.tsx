import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 0}>
        <PaginationLink first onClick={() => onPageChange(0)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 0}>
        <PaginationLink
          previous
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationItem key={index} active={index === currentPage}>
          <PaginationLink onClick={() => onPageChange(index)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <PaginationLink last onClick={() => onPageChange(totalPages - 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
