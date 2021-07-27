import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button as ReactButton } from "react-bootstrap";
import axios from "axios";
import { changeTradeStatus } from "../actions/tradeActions";
import toast from "react-hot-toast";

const AdminTradeActions = (props) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, success } = useSelector((state) => state.status);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [walletPass, setwalletPass] = useState("");
  const [action, setAction] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    dispatch(changeTradeStatus(action, props.id, walletPass));
    setShow(false);
  };

  const Button = ({ title, callback }) => {
    return (
      <>
        <button className="btn btn-primary" onClick={callback}>
          {title}
        </button>
      </>
    );
  };

  const complete = () => {
    setTitle("Complete Trade");
    setAction("admin-complete");
    handleShow();
  };

  const cancelForce = () => {
    setTitle("Cancel Trade");
    setAction("admin-cancel");
    handleShow();
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Submitting ..... ");
    }
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
    if (success) {
      toast.dismiss();
      toast.success("Trade Updated Successfully");
      props.history.pushState("/admin/trades");
    }
  }, [loading, error, success]);

  const Render = () => {
    if (userInfo.isAdmin) {
      switch (props.status) {
        case "on dispute":
          return (
            <>
              <div className="alert alert-info">
                Hello, The Trade is on dispute. Contact with buyer & seller and
                Take action.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button callback={cancelForce} title="Cancel" />
                <Button callback={complete} title="Complete" />
              </div>
            </>
          );
        default:
          return <></>;
      }
    } else {
      return (
        <>
          <div className="alert alert-danger">You are not Admin</div>
        </>
      );
    }
  };

  const renderModal = (name) => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              placeholder="Enter your wallet password"
              type="password"
              className="form-control"
              value={walletPass}
              onChange={(e) => setwalletPass(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <ReactButton variant="secondary" onClick={handleClose}>
              Close
            </ReactButton>
            <ReactButton variant="primary" onClick={handleConfirm}>
              {" "}
              Confirm{" "}
            </ReactButton>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Render />
      {renderModal(title)}
    </>
  );
};

export default AdminTradeActions;
