import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { Balances } from "../actions/tradeActions";

const Receive = (props) => {
  const dispatch = useDispatch();
  const { match } = props;
  const currency = match.params.slug;
  const [text, setText] = useState("");
  const {
    loading: bLoading,
    balances,
    error: bError,
  } = useSelector((state) => state.balances);

  useEffect(() => {
    if (!balances) {
      dispatch(Balances());
    }
    if (balances) {
      balances.map((x) => {
        if (x.currency === currency) {
          setText(x.address);
        }
      });
    }
  }, [balances, bLoading, currency]);

  // const address = balances.filter((item) => {
  //   if (item.currency === currency) return item;
  // });

  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen dashboard">
      <div className="container pt-24">
        {bLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-center items-center ">
            <div className="bg-white w-96 px-8 py-8">
              <div className="text-center text-gray py-4">
                <strong className="text-3xl">Receive</strong>
              </div>
              <div className="flex flex-column justify-center items-center">
                <div>
                  <QRCode className="mb-4" value={text} />
                </div>
                <div className="w-100">
                  <CopyToClipboard text={text} onCopy={onCopyText}>
                    <input
                      type="text"
                      className="form-control text-center mb-4"
                      style={{ cursor: "pointer" }}
                      readonly
                      value={text}
                    />
                  </CopyToClipboard>

                  {isCopied ? <p className="text-center">Copied!</p> : ""}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Receive;
