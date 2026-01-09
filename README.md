# Pre-Alert Management System

A modern React-based dashboard for managing shipment pre-alerts, built with performance and user experience in mind.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Overview

The **Pre-Alert Management System** is designed to streamline the tracking and management of inbound and outbound shipments. It provides a comprehensive dashboard for visualizing shipment data, filtering records, and performing discrepancy checks using a comparison tool.

## 🛠️ Tech Stack

This project uses a modern frontend stack to ensure scalability and maintainability:

- **Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Component Library**: [Mantine](https://mantine.dev/) (v7)
- **Data Grid**: [AG Grid](https://www.ag-grid.com/)
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **Date Handling**: [Day.js](https://day.js.org/)
- **Styling**: PostCSS with Mantine's styling system

## ✨ Key Features

- **📊 Interactive Dashboard**: A central hub for monitoring shipments.
- **🔍 Advanced Filtering**: Filter data by:
  - Direction (Inbound/Outbound)
  - MAWB (Master Air Waybill) number
  - Date Ranges (From/To)
- **⚡ Real-time Search**: Instant search capabilities for finding specific shipment records.
- **🔄 Comparison Tool**: A built-in `MismatchModal` to compare datasets and identify discrepancies.
- **📁 Data Management**:
  - View detailed shipment tables.
  - Soft delete functionality for shipment items.
  - Export capabilities (UI placeholder).

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **Package Manager**: npm (comes with Node.js) or yarn/pnpm.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

A quick look at the top-level files and directories:

```
.
├── src/
│   ├── components/       # UI Components (Dashboard, ShipmentTable, etc.)
│   ├── data/             # Mock data for development
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── package.json          # Project metadata and dependencies
└── vite.config.ts        # Vite configuration
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
