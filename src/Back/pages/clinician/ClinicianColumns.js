import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { viewClinician, viewClinicianClient } from "../../../Routes/RouterPage";
import { postRequest } from "../CustomHttp";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";



const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

export const ClinicianColumns = [
  {
    Header: "Full Name",
    accessor: "full_name",
    Cell: ({ cell }) => (
      <div className="d-flex py-1 flex-shrink-0 text-right">
        <div className="me-2">
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`view clients`)}
          >
            <Link to={viewClinicianClient.link + "/" + cell.row.original.id}>
              <i className="fas fa-eye"></i>
            </Link>
          </OverlayTrigger>
        </div>

        {/* <Link to={viewClinicianClient.link + "/" + cell.row.original.id}> */}
          {cell.row.original.full_name}
        {/* </Link> */}
        <div className="ms-2">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(`view/edit provider`)}
          >
            <Link to={viewClinician.link + "/" + cell.row.original.id}>
              <i className="fas fa-pen" style={{color:"#c3c3c3"}}></i>
            </Link>
          </OverlayTrigger>
        </div>
      </div>
    ),
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ cell }) => (
      <div className="text-dark">{cell.row.original.email}</div>
    ),
  },
  {
    Header: "Phone Number",
    accessor: "phone_number",
    Cell: ({ cell }) => (
      <div className="text-dark">{cell.row.original.phone_number}</div>
    ),
  },
  {
    Header: "Role",
    accessor: "role_name",
    Cell: ({ cell }) => (
      <div className="text-dark">{cell.row.original.role_name}</div>
    ),
  },
  {
    Header: () => (
      <div style={{ textAlign: "center", marginRight: "22px" }}>
        Active/Inactive
      </div>
    ),
    accessor: "action",
    Cell: ({ cell }) => {
      // console.log(cell.row.original.email,cell.row.original.status === 1,cell.row.original.status)
      const [toggleStatus,setToggleStatus] = useState(cell.row.original.status === 1 ? true : false)
      const changeStatus = async (id, status) => {
        const getData = await postRequest("/change-clinician-status", {id, status: status ?? false}, true);
        // console.log("getData",getData)
        if(getData.status){
            toast.success(getData.message) 
            setToggleStatus(status)
          } else {
          toast.error(getData.message) 
          setToggleStatus(!status)
        }
      }
      return (
        <div className="d-flex justify-content-center py-1 flex-shrink-0 text-right">
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={toggleStatus}
              disabled={cell.row.original.parent_account == 0 ? true : false}
              onChange={(e) =>
                changeStatus(cell.row.original.id, e.target.checked)
              }
              // defaultChecked={cell.row.original.status}
            />
          </Form>
          {/* <div className="mx-2">
                    <Link to={viewClinician.link+'/'+(cell.row.original.id)}>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </div>           */}
        </div>
      );
    },
  },
];
