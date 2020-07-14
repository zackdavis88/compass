import React, {useState} from "react";
import PropTypes from "prop-types";
import {TableWrapper, ActionsWrapper, Action} from "./table.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight, faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../tooltip/tooltip";

const Table = (props) => {
  const {headers, rows} = props;
  const [hoverMap, setHover] = useState(rows.reduce((prev, curr) => {
    if(curr.id)
      return Object.assign(prev, {[curr.id]: false});
    
    return prev;
  }, {}));

  const _renderHeaders = () => (
    <thead>
      <tr>
        {headers && headers.map((header, index) => (
          <th key={index}>{header.label}</th>
        ))}
      </tr>
    </thead>
  );

  const _renderProjectActions = (row) => {
    const {isAdmin, isManager, isDeveloper, isViewer} = row.roles;
    const rowHovered = hoverMap[row.id];
    const adminAllowed = rowHovered && isAdmin;
    const managerAllowed = rowHovered && (isAdmin || isManager);
    const viewerAllowed = rowHovered && (isAdmin || isManager || isDeveloper || isViewer);
    return (
      <ActionsWrapper>
        <Action isAllowed={adminAllowed}>
          <FontAwesomeIcon icon={faTrash} fixedWidth />
          {adminAllowed && <Tooltip text={"Delete Project"} />}
        </Action>
        <Action isAllowed={managerAllowed}>
          <FontAwesomeIcon icon={faEdit} fixedWidth />
          {managerAllowed && <Tooltip text={"Edit Project"} />}
        </Action>
        <Action isAllowed={viewerAllowed}>
          <FontAwesomeIcon icon={faArrowRight} fixedWidth />
          {viewerAllowed && <Tooltip text={"View Project"} />}
        </Action>
      </ActionsWrapper>
    );
  };

  const _renderCell = (row, header) => {
    if(header.keyName === "projectActions")
      return _renderProjectActions(row);

    //TODO: Do this eventually, once we get to Task table development.
    // if(header.keyName === "taskActions")
    //   return _renderTaskActions();

    const cellData = row[header.keyName];
    if(typeof cellData === "undefined")
      return;
    
    if(header.format)
      return header.format(cellData, row);
    
    return cellData.toString();
  };

  const _renderBody = () => (
    <tbody>
      {rows && rows.map((row, index) => {
        return (
          <tr key={index} onMouseOver={() => setHover({...hoverMap, [row.id]: true})} onMouseLeave={() => setHover({...hoverMap, [row.id]: false})}>
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
    <TableWrapper>
      <table>
        {_renderHeaders()}
        {_renderBody()}
      </table>
    </TableWrapper>
  );
};

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};

export default Table;
