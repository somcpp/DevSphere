import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserCircle, CheckCircle, XCircle, Briefcase, MapPin } from "lucide-react";
import { reviewRequest } from "../../../Api/connectionsApi";
import { removeIncomingRequest } from "../connectionsSlice";

/**
 * ItemsCard — reusable card for all three connections sections.
 *
 * Props:
 *  - user          : the user object (fromUserId / toUserId / plain user)
 *  - requestId     : _id of the connection request (needed for accept/reject)
 *  - mode          : "myConnections" | "incoming" | "outgoing"
 */
const ItemsCard = ({ user, requestId, mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [actionLoading, setActionLoading] = useState(null); // "accepted" | "rejected"
  const [done, setDone] = useState(null); // "accepted" | "rejected"

  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    photoURL,
    major,
    institution,
    skills,
    interests,
    location,
    experience,
  } = user;

  const topSkills = skills?.slice(0, 3) || [];
  const latestExp = experience?.length > 0 ? experience[0] : null;
  const displayTag = interests?.[0] || major;
  const profileId = _id;

  const handleViewProfile = () => {
    navigate(`/view/${profileId}`);
  };

  const handleReview = async (status) => {
    try {
      setActionLoading(status);
      await reviewRequest({ id: requestId, status });
      setDone(status);
      // Remove card from Redux store
      dispatch(removeIncomingRequest(requestId));
    } catch (err) {
      alert("Action failed: " + err);
    } finally {
      setActionLoading(null);
    }
  };

  if (done) {
    return (
      <div
        className={`rounded-xl border p-5 flex items-center gap-3 text-sm font-semibold ${
          done === "accepted"
            ? "bg-teal-50 border-teal-300 text-teal-700"
            : "bg-red-50 border-red-200 text-red-600"
        }`}
      >
        {done === "accepted" ? (
          <CheckCircle size={18} />
        ) : (
          <XCircle size={18} />
        )}
        {done === "accepted"
          ? `Connected with ${firstName}!`
          : `Request from ${firstName} declined.`}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow duration-200">
      {/* Top row — avatar, name, tag */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {photoURL ? (
            <img
              src={photoURL}
              alt={`${firstName} ${lastName}`}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-400 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 border-2 border-blue-300 flex items-center justify-center flex-shrink-0">
              <UserCircle size={32} className="text-blue-400" />
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-gray-800 leading-tight">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-500">
              {major || "Student"}
              {institution ? ` · ${institution.split(" ").slice(0, 2).join(" ")}` : ""}
            </p>
            {latestExp ? (
              <p className="text-xs text-teal-600 font-medium flex items-center gap-1 mt-0.5">
                <Briefcase size={11} />
                {latestExp.position} @ {latestExp.company}
              </p>
            ) : location ? (
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin size={11} />
                {location}
              </p>
            ) : null}
          </div>
        </div>

        {displayTag && (
          <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
            {displayTag.toUpperCase().slice(0, 12)}
          </span>
        )}
      </div>

      {/* Skills */}
      {topSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {topSkills.map((skill, i) => (
            <span
              key={i}
              className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-1">
        {/* View Profile — always present */}
        <button
          onClick={handleViewProfile}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-150"
        >
          View Profile
        </button>

        {/* Incoming: Accept + Reject */}
        {mode === "incoming" && (
          <>
            <button
              onClick={() => handleReview("accepted")}
              disabled={!!actionLoading}
              className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-150"
            >
              {actionLoading === "accepted" ? (
                <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle size={15} />
              )}
              Accept
            </button>
            <button
              onClick={() => handleReview("rejected")}
              disabled={!!actionLoading}
              className="flex items-center gap-1.5 bg-white hover:bg-red-50 disabled:opacity-60 text-red-500 border border-red-300 text-sm font-semibold py-2 px-3 rounded-lg transition-colors duration-150"
            >
              {actionLoading === "rejected" ? (
                <div className="h-3.5 w-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <XCircle size={15} />
              )}
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsCard;