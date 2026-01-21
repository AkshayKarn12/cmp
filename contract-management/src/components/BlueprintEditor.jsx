import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

// Types
const FIELD_TYPES = ['Text', 'Date', 'Signature', 'Checkbox'];

const BlueprintEditor = ({ onSave, onCancel, editBlueprint = null }) => {
  const [name, setName] = useState(editBlueprint?.name || '');
  const [fields, setFields] = useState(editBlueprint?.fields || []);
  const [draggedField, setDraggedField] = useState(null);

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type}`,
      position: fields.length
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const deleteField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Blueprint name is required');
      return;
    }
    if (fields.length === 0) {
      alert('Add at least one field');
      return;
    }
    onSave({ id: editBlueprint?.id || Date.now(), name, fields });
  };

  return (
    <div className="card max-w-4xl">
      {/* Blueprint title */}
      <h2 className="title">
        {editBlueprint ? 'Edit Blueprint' : 'Create Blueprint'}
      </h2>

      <div className="mb-8">
        <label className="subtitle">Blueprint Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="e.g., Employment Contract Template"
        />
      </div>

      <div className="mb-8">
        <label className="subtitle">Add Fields</label>
        <div className="flex gap-3 flex-wrap">
          {FIELD_TYPES.map(type => (
            <button
              key={type}
              onClick={() => addField(type)}
              className="btn btn-primary"
            >
              + {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="heading-secondary">Fields</label>
        {fields.length === 0 ? (
          <div className="empty">
            <Plus size={48} className="mx-auto mb-4 text-indigo-300" />
            <p>No fields added yet</p>
            <p>Click the buttons above to add fields</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="field flex gap-4 items-center">
                <span className="rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm px-3 py-1">#{index + 1}</span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, 'label', e.target.value)}
                    className="input"
                    placeholder="Field label"
                  />
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-bold border border-indigo-200">
                  {field.type}
                </span>
                <button
                  onClick={() => deleteField(field.id)}
                  className="btn btn-danger p-3"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="btn btn-secondary flex-1"
        >
          Save Blueprint
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

export default BlueprintEditor;