/*import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../Components/DashboardSidebar'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard">

     
      <DashboardSidebar />

     
      <main className="dashboard-main">

        <Outlet />

      </main>

    </div>
  )
}*/

import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../Components/DashboardSidebar'

import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Side */}
      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  )
}