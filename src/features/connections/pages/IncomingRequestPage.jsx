import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIncomingRequests,
  selectConnectionsLoading,
  setIncomingRequests,
  setLoading,
} from "../connectionsSlice";
import { getIncomingRequests } from "../../../Api/connectionsApi";
import ItemsList from "../components/ItemsList";

const IncomingRequestPage = () => {
  const dispatch = useDispatch();
  const incoming = useSelector(selectIncomingRequests);
  const loading = useSelector(selectConnectionsLoading);

  useEffect(() => {
    if (incoming.length > 0) return; // already in store
    const fetch = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getIncomingRequests();
        // API returns array of request objects with { _id, fromUserId, toUserId, status }
        const data = Array.isArray(res?.data) ? res.data : res;
        dispatch(setIncomingRequests(Array.isArray(data) ? data : []));
      } catch (err) {
        console.error("Failed to fetch incoming requests:", err);
        dispatch(setIncomingRequests([]));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetch();
  }, []);

  // incoming request shape: { _id, fromUserId: { ...userFields }, toUserId, status }
  const items = incoming.map((req) => ({
    user: req.fromUserId, // the sender's profile
    requestId: req._id,  // used for accept/reject
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Incoming <span className="text-teal-600">Requests</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            People who want to connect with you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" />
          </div>
        ) : (
          <ItemsList
            items={items}
            mode="incoming"
            emptyMessage="No pending requests right now. Check back later!"
          />
        )}
      </div>
    </div>
  );
};

export default IncomingRequestPage;
