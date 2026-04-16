import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import {
  selectMyConnections,
  selectIncomingRequests,
  selectOutgoingRequests,
  selectConnectionsLoading,
  setMyConnections,
  setIncomingRequests,
  setOutgoingRequests,
  setLoading,
} from "./connectionsSlice";
import {
  getAllConnections,
  getIncomingRequests,
  getOutgoingRequests,
} from "../../Api/connectionsApi";

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myConnections = useSelector(selectMyConnections);
  const incoming = useSelector(selectIncomingRequests);
  const outgoing = useSelector(selectOutgoingRequests);
  const loading = useSelector(selectConnectionsLoading);

  useEffect(() => {
    // Only fetch if none of the three have been loaded yet
    const alreadyLoaded =
      myConnections.length > 0 || incoming.length > 0 || outgoing.length > 0;
    if (alreadyLoaded) return;

    const fetchAll = async () => {
      dispatch(setLoading(true));
      try {
        const [connectionsRes, incomingRes, outgoingRes] = await Promise.allSettled([
          getAllConnections(),
          getIncomingRequests(),
          getOutgoingRequests(),
        ]);

        // My Connections
        if (connectionsRes.status === "fulfilled") {
          const data = connectionsRes.value;
          const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
          dispatch(setMyConnections(arr));
        } else {
          console.error("Failed to fetch connections:", connectionsRes.reason);
          dispatch(setMyConnections([]));
        }

        // Incoming Requests
        if (incomingRes.status === "fulfilled") {
          const data = incomingRes.value;
          const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
          dispatch(setIncomingRequests(arr));
        } else {
          console.error("Failed to fetch incoming requests:", incomingRes.reason);
          dispatch(setIncomingRequests([]));
        }

        // Outgoing Requests
        if (outgoingRes.status === "fulfilled") {
          const data = outgoingRes.value;
          const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
          dispatch(setOutgoingRequests(arr));
        } else {
          console.error("Failed to fetch outgoing requests:", outgoingRes.reason);
          dispatch(setOutgoingRequests([]));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAll();
  }, []);

  const cards = [
    {
      title: "My Connections",
      description: "View all the people you are currently connected with.",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      countBg: "bg-blue-600",
      route: "/connections/my",
      count: myConnections.length,
    },
    {
      title: "Incoming Requests",
      description: "Review connection requests sent to you and accept or decline.",
      icon: ArrowDownCircle,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      countBg: "bg-teal-600",
      route: "/connections/incoming",
      count: incoming.length,
    },
    {
      title: "Outgoing Requests",
      description: "Track requests you've sent that are still pending a response.",
      icon: ArrowUpCircle,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      countBg: "bg-indigo-600",
      route: "/connections/outgoing",
      count: outgoing.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your <span className="text-blue-600">Network</span>
          </h1>
          <p className="text-gray-500 mt-1.5">
            Manage your connections, incoming requests, and outgoing invites all in one place.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.route}
                  onClick={() => navigate(card.route)}
                  className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {/* Icon + Count badge row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} group-hover:scale-110 transition-transform duration-200`}
                    >
                      <Icon size={24} className={card.iconColor} />
                    </div>

                    {/* Count badge */}
                    <span
                      className={`${card.countBg} text-white text-sm font-bold px-3 py-0.5 rounded-full min-w-[2rem] text-center`}
                    >
                      {card.count}
                    </span>
                  </div>

                  {/* Text */}
                  <h2 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    View <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;