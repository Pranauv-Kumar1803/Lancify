import React, { useEffect, useState } from "react";
import "./RecordsComponent.css"; // Import CSS file for styling
import api from "../../api/axios";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminApproval = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(null);
  const [fetch, setFetch] = useState(true);
  const nav = useNavigate();

  const func = async () => {
    try {
      const res = await api.get('/services/toBeApproved');

      console.log(res.data);

      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
    setFetch(false);
  }

  const handleAccept = async (id) => {
    try {
      const res = await api.post('/services/approve/' + `${id}`);
      console.log(res.data);
      toast.success("Accepted Successfully!")
      setFetch(true);
      nav('/admin/dashboard');
    } catch (err) {
      toast.error("Some error occured!")
    }
  }
  
  const handleReject = async (id) => {
    try {
      const res = await api.post('/services/reject/' + `${id}`);
      console.log(res.data);
      toast.success("Rejected Successfully!")
      setFetch(true);
      nav('/admin/dashboard');
    } catch (err) {
      toast.error("Some Error occured!")
    }
  }

  useEffect(() => {
    setLoading(true);
    func();
    setLoading(false);
  }, [fetch])

  return (
    <>
      {loading ? <Loader /> :
        <div className="records-container">
          <h1>Records</h1>
          <ul className="records-list">
            {records && records.length > 0 ? records.map((record) => (
              <li key={record._id} className="record-item">
                <div className="record-content">
                  <p className="record-name">{record.seller_name}</p>
                  <p className="record-description">{record.seller_title}</p>
                  {(
                    <>
                      <div className="button-container">
                        <button
                          className="accept-button"
                          onClick={() => handleAccept(record._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleReject(record._id)}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))
              : <h1 >No Records Found!</h1>}
          </ul>
        </div>
      }
    </>
  );
};

export default AdminApproval;
