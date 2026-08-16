import React from 'react'
import {
  BriefcaseBusiness,
  MapPin,
  Building2,
  IndianRupee,
  Clock3,
  Laptop
} from 'lucide-react'

import './Preferences.css'

export default function Preferences() {
  return (
    <div className="preferences-page">

      {/* Heading */}
      <div className="preferences-heading">
        <h1>Internship Preferences</h1>

        <p>
          Tell us what kind of internship you are looking for.
          This helps InternSetu find better matches for you.
        </p>
      </div>


      {/* Preference Card */}
      <div className="preferences-card">


        {/* Internship Type */}
        <div className="preference-section">

          <h3>
            <BriefcaseBusiness size={20} />
            Internship Type
          </h3>

          <div className="option-grid">

            <label className="option-card">
              <input type="radio" name="internship-type" />
              <div>
                <strong>Technical</strong>
                <p>Software, AI, Data & Technology</p>
              </div>
            </label>

            <label className="option-card">
              <input type="radio" name="internship-type" />
              <div>
                <strong>Non-Technical</strong>
                <p>Marketing, HR, Finance & Management</p>
              </div>
            </label>

            <label className="option-card">
              <input type="radio" name="internship-type" />
              <div>
                <strong>Research</strong>
                <p>Research and academic opportunities</p>
              </div>
            </label>

            <label className="option-card">
              <input type="radio" name="internship-type" />
              <div>
                <strong>Any</strong>
                <p>Show me all relevant opportunities</p>
              </div>
            </label>

          </div>

        </div>


        {/* Work Mode */}
        <div className="preference-section">

          <h3>
            <Laptop size={20} />
            Work Mode
          </h3>

          <div className="mode-options">

            <label className="mode-card">
              <input type="radio" name="work-mode" />
              <span>🏢</span>
              <strong>On-site</strong>
            </label>

            <label className="mode-card">
              <input type="radio" name="work-mode" />
              <span>🏠</span>
              <strong>Remote</strong>
            </label>

            <label className="mode-card">
              <input type="radio" name="work-mode" />
              <span>🔄</span>
              <strong>Hybrid</strong>
            </label>

            <label className="mode-card">
              <input type="radio" name="work-mode" />
              <span>🌐</span>
              <strong>Any</strong>
            </label>

          </div>

        </div>


        {/* Location */}
        <div className="preference-section">

          <h3>
            <MapPin size={20} />
            Preferred Location
          </h3>

          <div className="preference-grid">

            <div className="preference-field">

              <label>Preferred City</label>

              <select>
                <option>Select city</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Bangalore</option>
                <option>Delhi</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Kolkata</option>
                <option>Any Location</option>
              </select>

            </div>


            <div className="preference-field">

              <label>Location Preference</label>

              <select>
                <option>Select preference</option>
                <option>Same City</option>
                <option>Any City</option>
                <option>Remote Only</option>
              </select>

            </div>

          </div>

        </div>


        {/* Domain */}
        <div className="preference-section">

          <h3>
            <Building2 size={20} />
            Preferred Domain
          </h3>

          <div className="domain-grid">

            <label>
              <input type="checkbox" />
              Software Development
            </label>

            <label>
              <input type="checkbox" />
              AI / Machine Learning
            </label>

            <label>
              <input type="checkbox" />
              Data Science
            </label>

            <label>
              <input type="checkbox" />
              Web Development
            </label>

            <label>
              <input type="checkbox" />
              Cyber Security
            </label>

            <label>
              <input type="checkbox" />
              Cloud Computing
            </label>

            <label>
              <input type="checkbox" />
              UI / UX
            </label>

            <label>
              <input type="checkbox" />
              Any Domain
            </label>

          </div>

        </div>


        {/* Stipend */}
        <div className="preference-section">

          <h3>
            <IndianRupee size={20} />
            Stipend Preference
          </h3>

          <div className="preference-grid">

            <div className="preference-field">

              <label>Minimum Expected Stipend</label>

              <select>
                <option>No Preference</option>
                <option>Unpaid / Any</option>
                <option>₹5,000+</option>
                <option>₹10,000+</option>
                <option>₹20,000+</option>
                <option>₹30,000+</option>
              </select>

            </div>


            <div className="preference-field">

              <label>Duration</label>

              <select>
                <option>No Preference</option>
                <option>1 Month</option>
                <option>2 Months</option>
                <option>3 Months</option>
                <option>6 Months</option>
              </select>

            </div>

          </div>

        </div>


        {/* Availability */}
        <div className="preference-section">

          <h3>
            <Clock3 size={20} />
            Availability
          </h3>

          <div className="availability">

            <label>
              <input type="checkbox" />
              Currently available
            </label>

            <label>
              <input type="checkbox" />
              Available for full-time internship
            </label>

            <label>
              <input type="checkbox" />
              Available for part-time internship
            </label>

          </div>

        </div>


        {/* Save Button */}
        <div className="preference-save">

          <button className="save-preference-btn">
            Save Preferences
          </button>

        </div>

      </div>

    </div>
  )
}