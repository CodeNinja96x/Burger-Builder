import './table.scss';

import React, { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BTable from 'react-bootstrap/Table';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import {
    useTable,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce,
    useSortBy,
    usePagination,
    useRowSelect
  } from "react-table";

import { FaAngleLeft, FaAngleRight, FaChevronDown, FaSearch, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

export interface ISelectAction {
  label: string,
  action: (rows: Array<{}>) => any
}

// Define a default UI for global filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </span>
  );
}

// Define a default UI for column filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  return (
    <Form.Control type="text" htmlSize={1} size="sm"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // undefined removes the filter
      }}
    />
  );
}

// Our table component
function Table({ columns, data, selectActions, canSelect = true, addButton = '', addButtonClickHandler = () => {} }) {
  const history = useHistory();
  const [pageList, setPageList] = useState([]);
  const [showSearch, setShowSearch] = React.useState(false);
  const pageListLength = 10;

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );
  
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      //fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                // TODO: Replace with 'contains' search (indexOf?)?
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  // TODO: Move this to separate file
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }: any, ref: MutableRefObject<any>) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate]);
  
      return (
        <>
          <input type="checkbox" className="checkbox-teal" ref={resolvedRef} {...rest} />
        </>
      )
    }
  );
  
  // Use the state and functions returned from useTable to build the UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //footerGroups,
    prepareRow,
    //rows, // all rows
    page, // page of rows
    pageCount,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { globalFilter, pageIndex, pageSize },
    visibleColumns,
    //preGlobalFilteredRows,
    //setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes
    },
    useFilters,
    //useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    hooks => {
      if (!canSelect) return;
      // Add selection column
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          canFilter: false,
          canSort: false,
          Header: ({ getToggleAllPageRowsSelectedProps, selectedFlatRows, ...rest }) => {
            return (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />

              <OverlayTrigger
                trigger="click"
                rootClose
                placement="bottom-start"
                overlay={
                  <Popover id="select-actions-popover">
                    <Popover.Content>
                      { selectActions.map((sa, i) => (
                        <div key={`select-action-${i}`} className="action" role="button" onClick={() => { 
                          !!sa.action && sa.action(selectedFlatRows);
                          // Close the popover
                          document.body.click();
                        }}>{sa.label}</div>
                      ))}
                    </Popover.Content>
                  </Popover>
                }
              >
                <FaChevronDown className="select-actions-chevron" size={10}/>
              </OverlayTrigger>
          </div>
          )},
          headerClassName: 'check-column',
          Cell: ({ row, ...rest }) => {
            return (
              <div key={`select-column-${row.id}`}>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
        },
        ...columns,
      ])
    }
  );

  const updatePageList = useCallback((startIndex = -1) => {
    let pages = [];
    let offset = pageIndex % pageListLength;
    startIndex = startIndex > -1 ? startIndex : pageIndex - offset;
    let endIndex = startIndex + pageListLength - 1;
    if (endIndex > pageCount - 1) { endIndex = pageCount - 1 };
    for (let i = startIndex; i <= endIndex; i++) {
      pages.push(i);
    }
    setPageList(pages);
  }, [pageIndex, pageCount]);

  useEffect(() => {
    updatePageList();
  }, [updatePageList]);

  const prevPageList = () => {
    const newStartIndex = pageList[0] - 10;
    if (newStartIndex > -1) {
      updatePageList(newStartIndex);
    }
  };

  const nextPageList = () => {
    const newStartIndex = pageList[0] + 10;
    if (newStartIndex < pageCount) {
      updatePageList(newStartIndex);
    }
  }

  // Render the UI for the table
  return (
    <div className="table-component p-4">
      <div className="table-actions">
        <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)) }}>
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={`pageSize-${pageSize}`} value={pageSize}>View: {pageSize}</option>
          ))}
        </select>
        <span className="divider"/>
        <FaSearch className="search-icon" onClick={() => setShowSearch(!showSearch)}/>
        { !!addButton &&
        <>
          <span className="divider"/>
          <span className="add-btn">{addButton} <span className="primary-circle-btn" onClick={addButtonClickHandler}>+</span></span>
        </>
        }
      </div>
      <BTable hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <React.Fragment key={`header-group-${i}`}>
              <tr {...headerGroup.getHeaderGroupProps([{ key: `header-row-${i}` }])}>
                {headerGroup.headers.map((column, j) => (
                  // Add the sorting props to control sorting
                  <th {...column.getHeaderProps([
                    column.getSortByToggleProps(),
                    {
                      key: `header-${i}-${j}`,
                      className: column.headerClassName,
                      style: column.headerStyle
                    }
                  ])}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    { column.canSort && 
                      <span className="sort-arrows">
                        <FaSort />
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <FaSortDown />
                            : <FaSortUp />
                          : ''
                        }
                      </span>
                  }
                  </th>
                ))}
              </tr>
              {/* Search row */}
              <tr className={ showSearch ? 'search-tr' : 'd-none' } {...headerGroup.getHeaderGroupProps([{ key: `search-row-${i}` }])}>
                {headerGroup.headers.map((column, j) => (
                  <th {...column.getHeaderProps([
                    {
                      key: `search-${i}-${j}`,
                      className: column.headerClassName,
                      style: column.headerStyle
                    }
                  ])}>
                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={`row-${i}`} {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return <td key={`cell-${i}-${j}`} {...cell.getCellProps({
                    className: cell.column.className,
                    style: cell.column.style
                  })}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>

      <hr className="dotted" />

      {/* Pagination */}

      <div className="pagination">
        <span className="pages-of">{pageList[0] + 1}-{pageList[pageList.length - 1] + 1} of {pageCount}</span>
        <button className="white-circle-btn" disabled={pageList[0] === 0} onClick={prevPageList}><FaAngleLeft/></button>
        {pageList.map((i) => {
          return <button key={`page-btn-${i}`} onClick={() => gotoPage(i)} className={ i === pageIndex ? 'primary-circle-btn' : 'white-circle-btn'}>{i + 1}</button>
        })}
        <button className="white-circle-btn" disabled={pageList[pageList.length -1] >= pageCount - 1 } onClick={nextPageList}><FaAngleRight/></button>
      </div>
    </div>
  )
}

export default Table;
