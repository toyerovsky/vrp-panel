import { MatPaginatorIntl } from '@angular/material';

const polishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 z ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
}


export function getPolishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.firstPageLabel = "Pierwsza";
  paginatorIntl.lastPageLabel = "Ostatnia";
  paginatorIntl.nextPageLabel = "Następna";
  paginatorIntl.previousPageLabel = "Poprzednia";
  paginatorIntl.itemsPerPageLabel = "Rekordów na stronie:";

  paginatorIntl.getRangeLabel = polishRangeLabel;

  return paginatorIntl;
}