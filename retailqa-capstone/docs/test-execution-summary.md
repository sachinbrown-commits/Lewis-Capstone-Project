Test Execution Summary
Project

Lewis Retail Commerce Platform Capstone Project

Test Execution Period

June 2026

Testing Tools Used
Cypress
Postman
SQL Server
Newman CLI
Swagger UI
Execution Overview

Testing was conducted across the Web UI, REST API, and Database layers to validate the core retail workflows of the Lewis Retail Commerce Platform.

The testing effort focused on:

User Authentication & Session Management
Order Management
Shipment & Delivery Tracking
Data Consistency & Cross-Layer Validation
Cross-Browser Compatibility

A total of 31 test artefacts were executed, including functional tests, database validations, end-to-end validations, cross-browser tests, and defect investigations.

Test Execution Results

Authentication API Tests

Executed: 4
Passed: 4
Failed: 0

Authentication Cypress Tests

Executed: 4
Passed: 4
Failed: 0

Order Management SQL Tests

Executed: 4
Passed: 4
Failed: 0

Shipment API Tests

Executed: 6
Passed: 6
Failed: 0

Delivery API Tests

Executed: 4
Passed: 4
Failed: 0

Cross-Browser Tests

Executed: 2
Passed: 2
Failed: 0

End-to-End Validation Tests

Executed: 5
Passed: 5
Failed: 0

Defects Identified

Logged: 2

Overall Functional Test Results

Total Functional Tests Executed: 29
Total Passed: 29
Total Failed: 0
Functional Test Pass Rate

Pass Rate: 100%

All 29 planned functional tests executed successfully.

Defect Summary
T-API-AUTH-BUG-001

Description: API returns 401 Unauthorized instead of the expected 403 Forbidden after multiple failed login attempts.

Severity: Medium

Status: Open

T-CY-UI-B

Description: Category filter overlaps page content during scrolling on the Furniture page.

Severity: Low

Status: Open

Defect Statistics
Total Defects Logged: 2
Critical Defects: 0
High Severity Defects: 0
Medium Severity Defects: 1
Low Severity Defects: 1
Cross-Browser Validation Summary

Testing was successfully executed on the following browsers:

Chrome – Pass
Microsoft Edge – Pass
Electron – Pass

All six automated Cypress test cases executed successfully across supported browsers with consistent results and no browser-specific failures.

End-to-End Validation Summary

The following cross-layer validations were successfully completed:

Order Validation
Order ID consistency validated across UI, API, and Database.
Order Status consistency validated across UI, API, and Database.
Order Total consistency validated across UI, API, and Database.
Payment Validation
Payment information remained consistent across UI, API, and Database layers.
Delivery Validation
Delivery Status consistency validated across UI, API, and Database.
Tracking Number consistency validated across UI, API, and Database.
Inventory Validation
Inventory quantities remained consistent across UI, API, and Database.

All validated values matched successfully across all three technology layers.

Overall Test Outcome

The Lewis Retail Commerce Platform successfully met the defined testing objectives within the project scope.

Key Achievements:
Successfully validated user authentication functionality.
Successfully validated order management workflows.
Successfully validated shipment and delivery tracking functionality.
Successfully validated database integrity and data consistency.
Successfully executed cross-browser compatibility testing.
Successfully completed end-to-end cross-layer validation.
Achieved a 100% execution success rate for all planned functional tests.

Final Status

Project Testing Status: PASS

Functional Test Pass Rate: 100%

Requirements Coverage: 100%