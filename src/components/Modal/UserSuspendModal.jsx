import React, { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-hot-toast";

const SuspendUserModal = ({ isOpen, closeModal, user, refetch }) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSuspend = async () => {
    if (!reason || !feedback) {
      toast.error("Please fill out both fields");
      return;
    }

    const suspendInfo = {
      reason,
      feedback,
      status: "suspended",
      suspendedAt: new Date(),
    };

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/suspend/${user?._id}`,
        suspendInfo,
        { withCredentials: true }
      );

      toast.success("User Suspended Successfully");
      refetch && refetch();
      closeModal();

    } catch (error) {
      toast.error("Failed to suspend user", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    Suspend User
                  </DialogTitle>

                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                  <p><span className="font-semibold">Name:</span> {user?.name}</p>
                  <p><span className="font-semibold">Email:</span> {user?.email}</p>
                  <p><span className="font-semibold">Role:</span> {user?.role}</p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Suspend Reason *</label>
                    <input
                      type="text"
                      placeholder="Enter suspend reason"
                      className="mt-1 w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Feedback / Notes *</label>
                    <textarea
                      rows="3"
                      placeholder="Explain why you are suspending this user"
                      className="mt-1 w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 border rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSuspend}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Confirm Suspend
                  </button>
                </div>

              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuspendUserModal;
