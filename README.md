# On-Site Work Request - ServiceNow Application

ServiceNow application for managing on-site work requests at hotels. Automates equipment request workflow with approval process and intelligent task assignment.

## 🎯 Overview

This application solves common challenges in hotel operations:

- ❌ **Before**: Manual email-based equipment requests leading to:
  - Miscommunication and missed requests
  - Delayed response times
  - Unclear task ownership
  - No visibility into request status

- ✅ **After**: Automated workflow system providing:
  - Intelligent routing to correct teams (Room vs Conference)
  - Automatic approval workflow for conference rooms
  - Email notifications at each step
  - Real-time status tracking
  - Reduced workload for reception staff

## 🏗️ Architecture

### Workflow

```
Request Submission
    |
    v
Automatic Routing
    |
    +---> Room Equipment -----> Hotel Cube Team -----> Completion
    |
    +---> Conference Room ---> Approval Required ---> Conference Prep Team ---> Completion
```

### Key Features

1. **Smart Request Form**
   - Dynamic form based on location type (Room/Conference)
   - Pre-defined equipment options
   - Special notes field for custom requirements

2. **Automatic Assignment**
   - Room requests → Hotel Cube G team
   - Conference requests → Approval workflow

3. **Approval Workflow** (Conference rooms only)
   - Automatic notification to approvers
   - Approval/Rejection with comments
   - Auto-assignment to prep team after approval

4. **Email Notifications**
   - Submission confirmation to requester
   - Assignment notification to fulfiller
   - Approval request to approvers
   - Completion notification to requester

5. **Status Tracking**
   - Draft → Submitted → Pending Approval → In Progress → Completed
   - Real-time visibility for all stakeholders

## 📋 Features

### Request Management
- Create equipment requests for hotel rooms or conference rooms
- Select from predefined equipment options
- Add custom requirements via special notes
- Track request status in real-time

### Automatic Workflow
- Intelligent routing based on location type
- Approval workflow for conference room requests
- Automatic email notifications
- SLA tracking (future enhancement)

### User Roles
- **Requester**: Submit and track requests
- **Hotel Cube Team**: Handle room equipment requests
- **Conference Approvers**: Approve/reject conference room requests
- **Conference Prep Team**: Fulfill approved conference room requests
- **Admin**: Full system access and configuration

## 🚀 Installation

### Prerequisites
- ServiceNow instance (Utah or later)
- Admin access to the instance
- User groups configured:
  - Hotel Cube G
  - Conference Approvers
  - Conference Room Prep G

### Deployment Steps

#### Option 1: Update Set (Recommended)

1. Download the Update Set XML from `update_sets/`
2. Log into your ServiceNow instance
3. Navigate to **System Update Sets** → **Retrieved Update Sets**
4. Click **Import Update Set from XML**
5. Upload the XML file
6. Click **Preview Update Set**
7. Review for conflicts
8. Click **Commit Update Set**

#### Option 2: Manual Installation

1. Create the table using the XML definition in `tables/`
2. Import Business Rules from `scripts/business_rules/`
3. Import Workflows from `workflows/`
4. Configure Notifications using templates in `notifications/`
5. Set up ACLs from `acl/`

### Post-Installation Configuration

1. **Configure User Groups**
   ```
   - Create or verify: Hotel Cube G
   - Create or verify: Conference Approvers
   - Create or verify: Conference Room Prep G
   - Assign appropriate team members to each group
   ```

2. **Customize Choice Lists**
   - Update hotel room options in `hotel_cube` field
   - Update conference room options in `conference_room` field
   - Customize equipment options as needed

3. **Test the Workflow**
   - Submit a test room request
   - Submit a test conference request
   - Verify notifications are sent
   - Test approval workflow

## 📖 Usage

### Submitting a Request

1. Navigate to **On-Site Work Request** → **New**
2. Fill in the form:
   - Select location type (Room or Conference)
   - Choose specific room/space
   - Select required equipment
   - Add special notes if needed
3. Click **Submit**
4. You'll receive a confirmation email with your request number

### Tracking a Request

1. Navigate to **On-Site Work Request** → **My Requests**
2. Click on your request number
3. View current status and assigned team
4. Check work notes for updates

### Fulfilling a Request (For Team Members)

1. Check your email for new assignment
2. Navigate to **On-Site Work Request** → **My Group's Requests**
3. Open the assigned request
4. Update work notes with progress
5. Change state to **Completed** when finished

## 🛠️ Technical Details

### Data Model

**Table**: `x_xxxxx_onsite_work_request`

Key fields:
- `number`: Auto-generated request number
- `location_type`: Room or Conference
- `state`: Current workflow state
- `assignment_group`: Assigned team
- `priority`: Request priority (1-4)

### Business Rules

1. **Auto-Assign on Submit**: Routes requests to appropriate team
2. **Set Default Priority**: Assigns medium priority by default
3. **Set Closed Date**: Records completion timestamp

### Workflows

**Conference Room Approval**:
- Triggered when conference room request is submitted
- Sends approval to Conference Approvers group
- Routes to Conference Prep Team on approval
- Cancels request on rejection

## 📁 Project Structure

```
test4ba-claude/
├── README.md                   # This file
├── docs/                       # Documentation
│   ├── TechnicalDesign.md     # Detailed technical specifications
│   └── UserGuide.md           # End-user documentation
├── tables/                     # Table definitions
│   └── x_xxxxx_onsite_work_request.xml
├── scripts/                    # Business logic
│   ├── business_rules/        # Business Rules
│   ├── client_scripts/        # Client-side scripts
│   └── script_includes/       # Reusable code modules
├── workflows/                  # Workflow definitions
│   └── conference_room_approval.xml
├── notifications/              # Email templates
│   └── email_templates/
├── acl/                        # Access Control Lists
├── update_sets/                # Deployment packages
└── .gitignore                  # Git ignore rules
```

## 🔒 Security

### Access Control

- **Requesters**: Can create and view their own requests
- **Team Members**: Can view and update assigned requests
- **Approvers**: Can approve/reject conference requests
- **Admins**: Full access to all requests and configuration

### Data Privacy

- Requests are only visible to:
  - The requester
  - Assigned team members
  - Approvers (for conference requests)
  - System administrators

## 🧪 Testing

See `docs/TestPlan.md` for detailed test scenarios.

Quick smoke test:
1. Create a room request → Verify auto-assignment to Hotel Cube G
2. Create a conference request → Verify approval workflow triggers
3. Approve request → Verify assignment to Conference Prep G
4. Complete request → Verify completion notification sent

## 🚧 Roadmap

### Phase 2 (Planned)
- [ ] Dashboard for request metrics
- [ ] SLA management
- [ ] Mobile app support
- [ ] Integration with room booking system
- [ ] Recurring request templates
- [ ] Equipment inventory tracking

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Support

For questions or issues:
- Create an issue in this repository
- Contact the ServiceNow development team

## 🙏 Acknowledgments

Developed using:
- ServiceNow Platform
- Claude AI (Anthropic) for design assistance
- Model Context Protocol (MCP) for automation

---

**Version**: 1.0.0  
**Last Updated**: February 9, 2026  
**Status**: In Development
