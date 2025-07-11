import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clientDocuments } from "../../../Routes/RouterPage";
import moment from "moment";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip">
    {props}
  </Tooltip>
);
export const ClientColumns = [
  {
    Header: 'Clients',
    accessor: 'full_name',
    Cell: ({ cell }) => (
      <Link to={clientDocuments.link + (cell.row.original.id) + '/6'}>
        {cell.row.original.full_name}
      </Link>
    )
  },
  {
    // Header: 'Date of Birth',
    Header: () => <div style={{ textAlign: "center" }}>Date of Birth</div>,
    accessor: 'dob',
    Cell: ({cell}) => <div className="text-dark text-center">{moment(cell.row.original.dob).format('MM/DD/Y')}</div>
  },
  {
    // Header: 'Last Service Date',
    Header: () => <div style={{ textAlign: "center" }}>Last Service Date</div>,
    accessor: 'last_service_date',
    Cell: ({cell}) => <div className="text-dark text-center">{(cell.row.original.last_service_date == '-') ? '-' : moment(cell.row.original.last_service_date).format('MM/DD/Y')}</div>
  },
  {
    Header: () => <div style={{ textAlign: "center" }}>Create New</div>,
    accessor: 'create_new',
    Cell: ({ cell }) => (
      <div className="text-center">
        <div className="d-flex justify-content-center flex-shrink-0">
          <Link to={clientDocuments.link + (cell.row.original.id)+'/1'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
            <OverlayTrigger
              placement="bottom"
              className={"bg-dark"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Progress Notes')}
            >
              <button className="btn btn-sm btn-info py-1 px-2">PN</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/4'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Treatment Plan')}
            >
            <button className="btn btn-sm btn-success py-1 px-2">TP</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/3'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Assessment')}
            >
            <button className="btn btn-sm btn-warning py-1 px-2">AS</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/5'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Discharge Summary')}
            >
            <button className="btn btn-sm btn-primary py-1 px-2">DS</button>
            </OverlayTrigger>
          </Link>
        </div>
      </div>
    ),
  },
];  