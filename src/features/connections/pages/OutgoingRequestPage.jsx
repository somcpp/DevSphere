import React from "react";
import { useSelector } from "react-redux";
import {
  selectOutgoingRequests,
  selectConnectionsLoading,
} from "../connectionsSlice";
import ItemsList from "../components/ItemsList";

const OutgoingRequestPage = () => {
  const outgoing = useSelector(selectOutgoingRequests);
  const loading = useSelector(selectConnectionsLoading);

  // outgoing request shape: { _id, toUserId: { ...userFields }, fromUserId, status }
  const items = outgoing.map((req) => ({
    user: req.toUserId,  // the recipient's profile
    requestId: req._id,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Outgoing <span className="text-blue-600">Requests</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Requests you've sent that are awaiting a response.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : (
          <ItemsList
            items={items}
            mode="outgoing"
            emptyMessage="You haven't sent any connection requests yet."
          />
        )}
      </div>
    </div>
  );
};

export default OutgoingRequestPage;
