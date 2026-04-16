import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../auth/authSlice";
import { viewloggedInUser, deleteProfile, updateUserProfile } from "../../Api/profileApi";
import { Edit2, Trash2, MapPin, ExternalLink } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userFromRedux = useSelector((state) => state.auth.user);

  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    photoURL: "",
    gender: "",
    institution: "",
    major: "",
    about: "",
    skills: [],
    experience: [],
    location: "",
    phone: "",
    linkedin: "",
    github: "",
    twitter: "",
    interests: [],
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await viewloggedInUser();
      setUserState(data);
      setError(null);
      initializeEditForm(data);
    } catch (err) {
      setError(err || "Failed to fetch profile");
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  const initializeEditForm = (userData) => {
    setEditForm({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      photoURL: userData.photoURL || "",
      gender: userData.gender || "",
      institution: userData.institution || "",
      major: userData.major || "",
      about: userData.about || "",
      skills: userData.skills || [],
      experience: userData.experience || [],
      location: userData.location || "",
      phone: userData.phone || "",
      linkedin: userData.linkedin || "",
      github: userData.github || "",
      twitter: userData.twitter || "",
      interests: userData.interests || [],
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const openEditModal = () => {
    initializeEditForm(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = async () => {
    if (
      !editForm.firstName ||
      !editForm.lastName ||
      !editForm.institution ||
      !editForm.major ||
      !editForm.about ||
      !editForm.location ||
      !editForm.phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await updateUserProfile(editForm);
      setUserState(response);
      dispatch(setUser(response));
      setIsEditModalOpen(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProfile();
      alert("Profile deleted successfully");
      navigate("/auth");
    } catch (err) {
      alert("Failed to delete profile: " + err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Profile</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800">Profile Not Found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-teal-500"></div>

          <div className="px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16 mb-6 justify-between">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />

                <div className="mt-4 md:mt-0 flex-1">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-lg text-blue-600 font-semibold mt-1">
                    {user.major || "Major"}
                  </p>
                  <p className="text-gray-600 mt-1">{user.institution || "Institution"}</p>
                </div>
              </div>

              {/* BUTTONS - RIGHT SIDE */}
              <div className="flex gap-3 mt-4 md:mt-0 flex-col sm:flex-row">
                <button
                  onClick={openEditModal}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Edit2 size={20} />
                  Edit Profile
                </button>
                <button
                  onClick={handleDeleteProfile}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={20} />
                      Delete Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {user.about && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">About</h3>
                <p className="text-gray-700">{user.about}</p>
              </div>
            )}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {user.skills?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 text-blue-700 font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {user.experience?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Experience</h2>
                <div className="space-y-4">
                  {user.experience.map((exp, i) => (
                    <div key={i} className="pb-4 border-b last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-teal-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* INTERESTS */}
            {user.interests?.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-300 text-teal-700 font-semibold text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT INFO */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <div className="space-y-3">
                {user.email && (
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Email</p>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:underline truncate block"
                    >
                      {user.email}
                    </a>
                  </div>
                )}
                {user.phone && (
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Phone</p>
                    <a href={`tel:${user.phone}`} className="text-blue-600 hover:underline">
                      {user.phone}
                    </a>
                  </div>
                )}
                {user.location && (
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Location</p>
                    <div className="flex items-center gap-1 text-gray-700">
                      <MapPin size={16} className="text-gray-600" />
                      {user.location}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SOCIAL */}
            {(user.linkedin || user.github || user.twitter) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Social</h2>
                <div className="space-y-2">
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <span className="font-semibold">LinkedIn</span>
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {user.github && (
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <span className="font-semibold">Github</span>
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {user.twitter && (
                    <a
                      href={user.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <span className="font-semibold">Twitter</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveProfile}
        isSaving={isSaving}
        user={user}
        editForm={editForm}
        setEditForm={setEditForm}
      />
    </div>
  );
};

export default MyProfilePage;