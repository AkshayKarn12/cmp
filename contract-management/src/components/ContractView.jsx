import React from 'react';
import { X, Lock, AlertCircle } from 'lucide-react';

// Types
const CONTRACT_STATUSES = ['Created', 'Approved', 'Sent', 'Signed', 'Locked', 'Revoked'];

const ContractView = ({ contract, blueprint, onClose, onUpdateStatus }) => {
  const getNextStatuses = (currentStatus) => {
    const statusIndex = CONTRACT_STATUSES.indexOf(currentStatus);
    if (currentStatus === 'Locked' || currentStatus === 'Revoked') return [];
    if (currentStatus === 'Created') return ['Approved', 'Revoked'];
    if (currentStatus === 'Approved') return ['Sent', 'Revoked'];
    if (currentStatus === 'Sent') return ['Signed', 'Revoked'];
    if (currentStatus === 'Signed') return ['Locked', 'Revoked'];
    return [];
  };

  const getStatusColor = (status) => {
    const colors = {
      'Created': 'bg-gray-200 text-gray-700',
      'Approved': 'bg-blue-200 text-blue-700',
      'Sent': 'bg-yellow-200 text-yellow-700',
      'Signed': 'bg-purple-200 text-purple-700',
      'Locked': 'bg-green-200 text-green-700',
      'Revoked': 'bg-red-200 text-red-700'
    };
    return colors[status] || 'bg-gray-200 text-gray-700';
  };

  const nextStatuses = getNextStatuses(contract.status);

  return (
    <div className="card max-w-3xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="title mb-3">{contract.name}</h2>
          <p className="text-indigo-600 text-lg">Blueprint: <span className="font-semibold">{contract.blueprintName}</span></p>
        </div>
        <button onClick={onClose} className="btn btn-ghost p-3">
          <X size={28} />
        </button>
      </div>

      <div className="mb-8 field">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold text-gray-700">Status:</span>
            <span className={`ml-4 px-6 py-2 rounded-full text-lg font-bold ${getStatusColor(contract.status)} shadow-sm`}>
              {contract.status}
            </span>
          </div>
          <div className="text-lg text-gray-600 font-medium">
            Created: {new Date(contract.createdDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {(contract.status === 'Locked' || contract.status === 'Revoked') && (
        <div className={`mb-8 p-6 rounded-xl flex items-center gap-4 ${
          contract.status === 'Locked' ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200' : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200'
        }`}>
          {contract.status === 'Locked' ? <Lock size={24} /> : <AlertCircle size={24} />}
          <span className="font-bold text-lg">
            {contract.status === 'Locked'
              ? 'This contract is locked and cannot be edited'
              : 'This contract has been revoked and cannot proceed further'
            }
          </span>
        </div>
      )}

      <div className="space-y-6 mb-8">
        <h3 className="title">Contract Details</h3>
        {blueprint.fields.map(field => (
          <div key={field.id} className="field">
            <label className="subtitle mb-3">{field.label}</label>
            <div className="text-gray-900 text-lg">
              {field.type === 'Checkbox'
                ? (contract.fieldValues[field.id] ? '✓ Checked' : '✗ Unchecked')
                : field.type === 'Signature' && contract.fieldValues[field.id] instanceof File
                  ? contract.fieldValues[field.id].name
                  : contract.fieldValues[field.id] || '(Not provided)'
              }
            </div>
          </div>
        ))}
      </div>

      {nextStatuses.length > 0 && (
        <div className="mb-8">
          <h3 className="title mb-6">Available Actions</h3>
          <div className="flex gap-4 flex-wrap">
            {nextStatuses.map(status => (
              <button
                key={status}
                onClick={() => onUpdateStatus(contract.id, status)}
                className={`btn ${status === 'Revoked' ? 'btn-danger' : 'btn-primary'}`}
              >
                {status === 'Revoked' ? 'Revoke Contract' : `Mark as ${status}`}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onClose}
        className="btn btn-ghost w-full"
      >
        Close
      </button>
    </div>
  );
};

export default ContractView;