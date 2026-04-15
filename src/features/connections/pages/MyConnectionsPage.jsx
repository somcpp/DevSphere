import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyConnections,
  selectConnectionsLoading,
  setMyConnections,
  setLoading,
} from "../connectionsSlice";
import { getAllConnections } from "../../../Api/connectionsApi";
import ItemsList from "../components/ItemsList";

const MyConnectionsPage = () => {
  const dispatch = useDispatch();
  const connections = useSelector(selectMyConnections);
  const loading = useSelector(selectConnectionsLoading);

  useEffect(() => {
    if (connections.length > 0) return; // already in store
    const fetch = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getAllConnections();
        // API returns array of user objects for connections
        const data = Array.isArray(res?.data) ? res.data : res;
        dispatch(setMyConnections(Array.isArray(data) ? data : []));
      } catch (err) {
        console.error("Failed to fetch connections:", err);
        dispatch(setMyConnections([]));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetch();
  }, []);

  // Normalise into { user, requestId } shape expected by ItemsList
  const items = connections.map((u) => ({
    user: u,
    requestId: u._id,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            My <span className="text-blue-600">Connections</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            People you are already connected with.
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
            mode="myConnections"
            emptyMessage="You haven't connected with anyone yet. Start by exploring the feed!"
          />
        )}
      </div>
    </div>
  );
};

export default MyConnectionsPage;