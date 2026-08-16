/*import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  UserRound,
  Settings,
  BriefcaseBusiness,
  FileText,
  Heart,
  LogOut
} from 'lucide-react'

import './DashboardSidebar.css'

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">

     
      <div className="dash-logo">
        <h2>
          Intern<span>Setu</span>
        </h2>
      </div>


      
      <nav className="dash-nav">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <UserRound size={20} />
          <span>My Profile</span>
        </NavLink>


        <NavLink
          to="/dashboard/preferences"
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <Settings size={20} />
          <span>Preferences</span>
        </NavLink>


        <NavLink
          to="/dashboard/internships"
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <BriefcaseBusiness size={20} />
          <span>Internships</span>
        </NavLink>


        <NavLink
          to="/dashboard/applications"
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <FileText size={20} />
          <span>Applications</span>
        </NavLink>


        <NavLink
          to="/dashboard/saved"
          className={({ isActive }) =>
            isActive ? 'dash-item active' : 'dash-item'
          }
        >
          <Heart size={20} />
          <span>Saved</span>
        </NavLink>

      </nav>


      
      <div className="logout">
        <LogOut size={20} />
        <span>Logout</span>
      </div>

    </aside>
  )
}*/
import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  LayoutDashboard,
  UserRound,
  Settings,
  BriefcaseBusiness,
  FileText
} from 'lucide-react'

import './DashboardSidebar.css'

export default function DashboardSidebar() {

  return (
    <aside className="dashboard-sidebar">

      <div className="sidebar-title">
        <h2>
            <span className="intern-text">Intern</span>
            <span className="setu-text">Setu</span>
        </h2>
      </div>


      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          end
          className="sidebar-link"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/dashboard/profile"
          className="sidebar-link"
        >
          <UserRound size={20} />
          <span>My Profile</span>
        </NavLink>


        <NavLink
          to="/dashboard/preferences"
          className="sidebar-link"
        >
          <Settings size={20} />
          <span>Preferences</span>
        </NavLink>


        <NavLink
          to="/dashboard/internships"
          className="sidebar-link"
        >
          <BriefcaseBusiness size={20} />
          <span>Internships</span>
        </NavLink>


        <NavLink
          to="/dashboard/applications"
          className="sidebar-link"
        >
          <FileText size={20} />
          <span>Applications</span>
        </NavLink>

      </nav>

    </aside>
  )
}