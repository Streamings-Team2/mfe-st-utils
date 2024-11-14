export interface PaginationData {
    pages: number[];
    totalItems: number;
    itemsPerPage: number;
    currentPageC: number; 
    totalPages: number;
  }
  
export const getPagination = (
    currentPageC: number,
    totalItems: number,
    itemsPerPage: number = 10,
    pageRangeDisplayed: number = 5
  ): PaginationData => {
    console.log({currentPageC, totalItems})
  
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const clampedCurrentPage = Math.max(1, Math.min(currentPageC, totalPages));
    
    const startPage = Math.max(1, clampedCurrentPage - Math.floor(pageRangeDisplayed / 2));
    const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);
    
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pages.slice(startPage - 1, endPage);
    
    return {
      pages: visiblePages,
      totalItems,
      itemsPerPage,
      currentPageC: clampedCurrentPage,
      totalPages
    };
};


export const getDataSlice = <T>(
    data: T[], 
    itemsPerPage: number, 
    currentPage:number
  ):T[]  =>{
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex)
}