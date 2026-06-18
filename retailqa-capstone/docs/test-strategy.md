Lewis Retail Commerce Platform
Test Strategy
1. Introduction

The purpose of this Test Strategy is to define the testing approach used for the Lewis Retail Commerce Platform Capstone Project.

The project consists of a React-based web application, a .NET REST API, and a SQL Server database. Testing was conducted across all three layers to ensure that core retail business processes function correctly and consistently.

The testing effort focused on validating customer authentication, order management, shipment and delivery tracking, and data consistency across the user interface, API layer, and database layer.

2. Test Approach

The project followed a Risk-Based Testing approach combined with a Shift-Left Testing strategy.

Risk-Based Testing

Testing efforts were prioritised according to business risk and customer impact.

The highest priority areas included:

User Authentication
Order Creation
Order Management
Delivery Tracking
Inventory Accuracy
Data Consistency

These areas directly affect customer experience and business operations.

If defects occur within these workflows, customers may be unable to log in, place orders, track deliveries, or receive correct inventory information.

Shift-Left Testing

Testing activities were introduced as early as possible during development.

Validation was performed continuously throughout the project rather than waiting until the end of development.

Examples included:

API testing during endpoint development
Database validation during data creation
UI testing during feature implementation
Continuous defect reporting and validation

This approach helped identify issues early and reduce rework.

3. Test Scope
In Scope
FR-001 User Authentication & Session Management

Testing included:

Successful login validation
Invalid login validation
JWT token validation
Session persistence
Logout functionality
Validation handling

Tools Used:

Cypress
Postman
FR-002 Order Management

Testing included:

Order creation
Order retrieval
Order cancellation
Inventory restoration validation
Order status validation
Order data integrity validation

Tools Used:

SQL Server
Postman
FR-004 Shipment & Delivery Tracking

Testing included:

Shipment retrieval
Delivery retrieval
Delivery filtering
Tracking validation
Proof of Delivery verification
Delivery activity validation

Tools Used:

Postman
FR-007 Data Consistency & Cross-Layer Validation

Testing included:

Cross-browser validation
UI to API validation
API to Database validation
End-to-End workflow validation
Inventory consistency validation
Order consistency validation
Payment consistency validation
Delivery consistency validation

Tools Used:

Cypress
Postman
SQL Server
Out of Scope

The following testing activities were not included:

Load Testing
Stress Testing
Performance Testing
Security Penetration Testing
Accessibility Testing
Production Environment Testing
Third-Party Integration Testing
4. Test Environment

The following environment was used throughout testing:

Component	Technology
Frontend	React + Vite
Backend	.NET 8 REST API
Database	SQL Server
API Tool	Postman
UI Automation	Cypress
Version Control	GitHub
IDE	Visual Studio Code

Application URLs:

Frontend:
http://localhost:3000

API:
http://localhost:5000

Swagger:
http://localhost:5000/docs/index.html

5. Entry Criteria

Testing could begin once the following conditions were met:

Application deployed successfully
API services available
Database seeded with test data
Test environment configured
Test cases prepared
Required tools installed and operational
6. Exit Criteria

Testing would be considered complete when:

All Functional Requirements have been tested
Test execution completed successfully
Critical and High defects documented
Cross-layer validation completed
Test evidence collected
Regression testing completed
Requirements Traceability Matrix shows full requirement coverage
7. Regression Strategy

An automated smoke regression suite was created to verify critical business functionality after system changes.

The smoke suite covers:

Authentication
Login validation
Invalid login handling
Session persistence
Logout validation
Orders
Order creation
Order retrieval
Order updates
Deliveries
Delivery retrieval
Delivery tracking
Delivery filtering
Data Consistency
Cross-layer validation
Inventory verification
Order verification

Regression tests are executed:

After code changes
Before releases
During CI/CD pipeline execution
After defect fixes

The objective is to ensure that existing functionality remains stable after system updates.

8. Risks and Mitigation
Risk	Impact	Mitigation
Authentication failure	Users cannot access system	UI and API authentication testing
Order processing failure	Customers cannot place orders	Order validation testing
Delivery tracking failure	Customers cannot track deliveries	Delivery API testing
Inventory inconsistencies	Incorrect stock information	Database validation queries
Data mismatch between layers	Business reporting inaccuracies	End-to-End cross-layer testing
Browser compatibility issues	User experience degradation	Cross-browser Cypress testing
9. Test Summary

Testing was successfully completed across the Web UI, API, and Database layers.

The project achieved:

Authentication validation
Order validation
Delivery validation
Database integrity validation
Cross-browser validation
End-to-End validation

Defects identified during testing were documented and reported for remediation.