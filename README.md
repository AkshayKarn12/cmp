CONTRACT MANAGEMENT PLATEFORM : LIVE LINK: https://cmp-orcin.vercel.app

The Contract Management Platform works in **three main steps**:



1️⃣ Creating a Blueprint (Template)

- A blueprint is a **contract template**.
- First, the user creates a blueprint by giving it a name.
- The user can add different types of fields to the blueprint:
  - Text (for names, terms, etc.)
  - Date (for start/end dates)
  - Signature (for signature upload)
  - Checkbox (for agreement confirmation)
- These fields define **what information the contract will contain**.

Once saved, the blueprint can be reused to create multiple contracts.

 2️⃣ Creating a Contract from a Blueprint

- The user selects a blueprint and creates a new contract.
- The contract form is automatically generated based on the fields in the blueprint.
- The user fills in the required details.
- After saving, the contract is created with the status **“Created”**.

Each contract stores:
- Contract name
- Blueprint used
- Field values
- Creation date
- Current contract status

  3️⃣ Managing the Contract Lifecycle

- Every contract follows a fixed status flow:
  - Created → Approved → Sent → Signed → Locked
- At any stage, a contract can also be **Revoked**.
- Only valid next actions are allowed to avoid incorrect status changes.
- When a contract is **Locked**, it becomes final and cannot be changed.
- When a contract is **Revoked**, it is stopped permanently.


 4️⃣ Dashboard & Monitoring

- All contracts are shown in a dashboard table.
- The user can:
  - View contract details
  - Track contract status
  - Filter contracts by Active, Pending, or Signed
- Statistics show:
  - Total contracts
  - Signed contracts
  - Pending contracts
  - Revoked contracts


 5️⃣ Technical Flow (Behind the Scenes)

- React components are used for different sections:
  - Blueprint Editor
  - Contract Form
  - Contract Viewer
  - App.jsx
  - index.css
  - main.jsx
  - index.html
- React `useState` is used to manage:
  - Blueprints
  - Contracts
  - Status changes
- Tailwind CSS is used for styling and responsive layout.
- No backend is used

This project demonstrates a **real-world contract workflow** using React and helps understand dynamic forms, state management, and UI-based process control.
