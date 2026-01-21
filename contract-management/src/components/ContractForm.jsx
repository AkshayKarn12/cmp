import React, { useState } from 'react';

const ContractForm = ({ blueprint, onSave, onCancel }) => {
  const [contractName, setContractName] = useState('');
  const [fieldValues, setFieldValues] = useState({});

  const handleSave = () => {
    if (!contractName.trim()) {
      alert('Contract name is required');
      return;
    }

    const contract = {
      id: Date.now(),
      name: contractName,
      blueprintId: blueprint.id,
      blueprintName: blueprint.name,
      status: 'Created',
      createdDate: new Date().toISOString(),
      fieldValues
    };
    onSave(contract);
  };

  return (
    <div className="card max-w-3xl">
      <h2 className="title">Create Contract from Blueprint</h2>
      <p className="text-indigo-600 mb-8 text-lg">Blueprint: <span className="font-bold text-indigo-700">{blueprint.name}</span></p>

      <div className="mb-8">
        <label className="subtitle">Contract Name</label>
        <input
          type="text"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          className="input"
          placeholder="e.g., John Doe Employment Contract"
        />
      </div>

      <div className="space-y-6 mb-8">
        {blueprint.fields.map(field => (
          <div key={field.id} className="field">
            <label className="subtitle">{field.label}</label>
            {field.type === 'Text' && (
              <input
                type="text"
                value={fieldValues[field.id] || ''}
                onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
                className="input"
              />
            )}
            {field.type === 'Date' && (
              <input
                type="date"
                value={fieldValues[field.id] || ''}
                onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
                className="input"
              />
            )}
            {field.type === 'Signature' && (
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.files[0] })}
                className="input"
              />
            )}
            {field.type === 'Checkbox' && (
              <div className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200">
                <input
                  type="checkbox"
                  checked={fieldValues[field.id] || false}
                  onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.checked })}
                  className="w-6 h-6 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="ml-4 text-lg text-gray-700 font-medium">Check to agree</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="btn btn-primary flex-1"
        >
          Create Contract
        </button>
        <button
          onClick={onCancel}
          className="btn btn-ghost"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContractForm;