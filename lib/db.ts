const sql = require("better-sqlite3");

const db = sql("project.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS organization (
    organization_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT,
    organization_email TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS employee (
    employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    employee_name TEXT,
    employee_email TEXT,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS project (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    project_name TEXT,
    project_manager TEXT,
    due_date DATE,
    status TEXT,
    progress INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS metric (
    metric_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    month TEXT,
    total_revenue INTEGER,
    project INTEGER,
    time INTEGER,
    resource INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    progress_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    total_project INTEGER,
    completed_project INTEGER,
    delayed_project INTEGER,
    ongoing_project INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS task_list (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    assigned_to INTEGER,
    description TEXT,
    checked TEXT,
    approval TEXT,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES employee(employee_id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS project_workload (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER,
    employee_id INTEGER,
    employee_name TEXT,
    no_of_project INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
  );
`);

db.exec(`
  INSERT INTO organization (organization_name, organization_email) 
  VALUES 
    ('Boltzmenn', 'boltzmenn@gmail.com'),
    ('Kunle Empire', 'kunle@gmail.com'),
    ('Lamdex', 'lamdex@gmail.com');

  INSERT INTO employee (organization_id, employee_name, employee_email) 
  VALUES 
    (1, 'Alice Johnson', 'alice.johnson@gmail.com'),
    (1, 'Bob Smith', 'bob.smith@gmail.com'),
    (1, 'Charlie Brown', 'charlie.brown@gmail.com'),
    (2, 'David Williams', 'david.williams@gmail.com'),
    (2, 'Eve Davis', 'eve.davis@gmail.com'),
    (2, 'Frank Miller', 'frank.miller@gmail.com'),
    (3, 'Grace Wilson', 'grace.wilson@gmail.com'),
    (3, 'Hank Moore', 'hank.moore@gmail.com'),
    (3, 'Ivy Taylor', 'ivy.taylor@gmail.com');


  INSERT INTO project (organization_id, project_name, project_manager, due_date, status, progress) 
  VALUES 
    (1, 'Nesla Web Application', 'Alice Johnson', '2024-12-31', 'On going', 50),
    (1, 'Datascale AI App', 'Bob Smith', '2024-11-30', 'Completed', 100),
    (1, 'Photon E-commerce Platform', 'Charlie Brown', '2024-10-31', 'Delayed', 75),
    (2, 'Quantum CRM System', 'David Williams', '2024-12-31', 'On going', 60),
    (2, 'Nebula Analytics Dashboard', 'Eve Davis', '2024-11-30', 'Completed', 100),
    (2, 'Orbit HR Management Tool', 'Frank Miller', '2024-10-31', 'Delayed', 80),
    (3, 'Lyra Mobile Banking App', 'Grace Wilson', '2024-12-31', 'On going', 70),
    (3, 'Vortex Social Media Platform', 'Hank Moore', '2024-11-30', 'Completed', 100),
    (3, 'Hyperion Data Visualization Suite', 'Ivy Taylor', '2024-10-31', 'Delayed', 90);

  
  INSERT INTO metric (organization_id, month, total_revenue, project, time, resource) 
  VALUES 
    (1, 'current_month', 100000, 110, 120, 80),
    (1, 'previous_month', 150000, 100, 200, 90),
    (2, 'current_month', 110000, 98, 130, 70),
    (2, 'previous_month', 160000, 105, 210, 95),
    (3, 'current_month', 120000, 60, 140, 75),
    (3, 'previous_month', 170000, 110, 220, 100);

  INSERT INTO progress (organization_id, total_project, completed_project, delayed_project, ongoing_project) 
  VALUES 
    (1, 110, 30, 10, 70),
    (2, 98, 25, 8, 65),
    (3, 60, 15, 20, 25);

 INSERT INTO task_list (organization_id, assigned_to, description, checked, approval) 
VALUES 
(1, 1, 'Implement Authentication Module', 'Yes', 'Approved'),
(1, 1, 'Develop API Endpoints', 'No', 'In review'),
(1, 1, 'Setup CI/CD Pipeline', 'Yes', 'On going'),
(1, 2, 'Create Frontend Components', 'No', 'In review'),
(1, 2, 'Design Database Schema', 'Yes', 'In review'),
(1, 2, 'Write Unit Tests', 'No', 'In review'),
(1, 3, 'Optimize Backend Performance', 'Yes', 'On going'),
(1, 3, 'Implement Caching Strategy', 'No', 'Approved'),
(1, 3, 'Integrate Third-party Services', 'Yes', 'On going'),
(2, 4, 'Setup Project Environment', 'No', 'Approved'),
(2, 4, 'Develop User Management System', 'Yes', 'In review'),
(2, 4, 'Create Reporting Dashboard', 'No', 'On going'),
(2, 5, 'Implement Security Features', 'Yes', 'In review'),
(2, 5, 'Conduct Code Reviews', 'No', 'In review'),
(2, 5, 'Prepare Deployment Scripts', 'Yes', 'In review'),
(2, 6, 'Implement Payment Gateway', 'No', 'On going'),
(2, 6, 'Develop Notification System', 'Yes', 'Approved'),
(2, 6, 'Create Data Migration Plan', 'No', 'On going'),
(3, 7, 'Implement Logging System', 'Yes', 'Approved'),
(3, 7, 'Setup Monitoring Tools', 'No', 'In review'),
(3, 7, 'Conduct Performance Testing', 'Yes', 'On going'),
(3, 8, 'Develop Mobile App Interface', 'No', 'In review'),
(3, 8, 'Implement Push Notifications', 'Yes', 'In review'),
(3, 8, 'Create User Onboarding Process', 'No', 'In review'),
(3, 9, 'Design User Authentication Flow', 'Yes', 'On going'),
(3, 9, 'Implement Role-based Access Control', 'No', 'Approved'),
(3, 9, 'Setup Automated Backups', 'Yes', 'On going');

INSERT INTO project_workload (organization_id, employee_id, employee_name, no_of_project) 
VALUES 
  (1, 1, 'Alice Johnson', 10),
  (1, 2, 'Bob Smith', 5),
  (1, 3, 'Charlie Brown', 8),
  (2, 4, 'David Williams', 6),
  (2, 5, 'Eve Davis', 9),
  (2, 6, 'Frank Miller', 4),
  (3, 7, 'Grace Wilson', 10),
  (3, 8, 'Hank Moore', 3),
  (3, 9, 'Ivy Taylor', 4);

`);

export default db;
