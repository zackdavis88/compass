import React from "react";
import PropTypes from "prop-types";
import {TableWrapper} from "./table.styles";

const Table = (props) => {
  const {headers, rows, rowProps, dataTestId} = props;
  const _renderHeaders = () => (
    <thead data-testid={`${dataTestId}.tableHead`}>
      <tr>
        {headers && headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );

  const _renderCell = (row, header) => {
    if(header.renderActions)
      return header.renderActions(row);

    const cellData = row[header.keyName];
    
    if(header.format)
      return header.format(cellData, row);

    if(typeof cellData === "undefined")
      return;
    
    return cellData.toString();
  };

  const _addRowProps = (row) => {
    if(rowProps && typeof rowProps === "function")
      return rowProps(row);
    
    return {}; // return an empty object if rowProps is not provided...this will add no additional props to the rows.
  };

  const _renderBody = () => (
    <tbody data-testid={`${dataTestId}.tableBody`}>
      {rows && rows.map((row, index) => {
        return (
          <tr key={index} {..._addRowProps(row)}>
            {headers && headers.map((header, index) => {
              return (
                <td key={index}>
                  {_renderCell(row, header)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );

  return (
    <TableWrapper data-testid={dataTestId}>
      <table data-testid={`${dataTestId}.table`}>
        {_renderHeaders()}
        {_renderBody()}
      </table>
    </TableWrapper>
  );
};

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowProps: PropTypes.func,
  dataTestId: PropTypes.string
};

export default Table;
