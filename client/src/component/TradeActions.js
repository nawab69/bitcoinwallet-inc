import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button as ReactButton } from "react-bootstrap";
import { Button as MyButton } from "./dashboard";
import axios from "axios";
import { changeTradeStatus } from "../actions/tradeActions";
import toast from "react-hot-toast";

const TradeActions = (props) => {
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
        <MyButton onClick={callback}>{title}</MyButton>
      </>
    );
  };

  const cancelTrade = () => {
    dispatch(changeTradeStatus("cancel", props.id, ""));
  };

  const startTrade = () => {
    setTitle("Start Trade");
    setAction("start");
    handleShow();
  };

  const markAsPaid = () => {
    dispatch(changeTradeStatus("mark-as-paid", props.id, ""));
  };

  const dispute = () => {
    dispatch(changeTradeStatus("dispute", props.id, ""));
  };

  const complete = () => {
    setTitle("Complete Trade");
    setAction("complete");
    handleShow();
  };

  const cancelForce = () => {
    setTitle("Cancel Trade");
    setAction("cancel");
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
    }
  }, [loading, error, success]);

  const Render = () => {
    if (userInfo.email === props.buyer) {
      switch (props.status) {
        case "pending":
          return (
            <>
              <div className="alert alert-info">
                Hello, If you are the buyer and you have enough fund on your
                wallet, then click on start.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button callback={startTrade} title="Start" />
                <Button callback={cancelTrade} title="Cancel" />
              </div>
            </>
          );
        case "processing":
          return (
            <>
              <div className="alert alert-warning">
                Hello, You have started the trade . Waiting for the seller's
                response. If you want to cancel the trade make a dispute
                request.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button title="Dispute" callback={dispute} />
              </div>
            </>
          );
        case "marked paid":
          return (
            <>
              <div className="alert alert-warning">
                Hello, the seller marked as paid. If you get your service , You
                can complete the trade.{" "}
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button title="Complete" callback={complete} />
                <Button title="Dispute" callback={dispute} />
              </div>
            </>
          );
        case "on dispute":
          return (
            <>
              <div className="alert alert-warning">
                Hello, Trade is now on dispute. Admin will check the Trade's
                chat and make the decision
              </div>
            </>
          );
        case "cancelled":
          return (
            <>
              <div className="alert alert-warning">
                Hello, The trade has been cancelled.
              </div>
            </>
          );
        default:
          return <></>;
      }
    } else if (userInfo.email === props.seller) {
      switch (props.status) {
        case "pending":
          return (
            <>
              <div className="alert alert-info">
                Hello, You have created the trade. Waiting for the buyer's
                confirmation.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button callback={cancelTrade} title="Cancel" />
              </div>
            </>
          );
        case "processing":
          return (
            <>
              <div className="alert alert-info">
                Hello, Buyer has started the trade. Give your service to the
                buyer, click on mark as paid.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button title="Mark As Paid" callback={markAsPaid} />
                <Button title="Cancel" callback={cancelForce} />
              </div>
            </>
          );
        case "marked paid":
          return (
            <>
              <div className="alert alert-warning">
                Hello, You have marked the trade as Paid. Waiting for the
                buyer's confirmation.
              </div>
              <div className="d-flex justify-content-around mb-2">
                <Button title="Dispute" callback={dispute} />
              </div>
            </>
          );

        case "on dispute":
          return (
            <>
              <div className="alert alert-warning">
                Hello, Trade is now on dispute. Admin will check the Trade's
                chat and make the decision
              </div>
            </>
          );
        case "cancelled":
          return (
            <>
              <div className="alert alert-warning">
                Hello, The trade has been cancelled.
              </div>
            </>
          );
        default:
          return <></>;
      }
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

export default TradeActions;
