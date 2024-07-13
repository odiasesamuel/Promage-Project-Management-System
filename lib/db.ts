const sql = require("better-sqlite3");

const db = sql("project.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS organization (
    organization_id TEXT PRIMARY KEY,
    organization_name TEXT,
    organization_email TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS employee (
    id TEXT PRIMARY KEY,
    organization_id TEXT,
    employee_name TEXT,
    employee_email TEXT,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS session (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES employee(id) ON DELETE SET NULL
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS project (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id TEXT,
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
    organization_id TEXT,
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
    organization_id TEXT,
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
    organization_id TEXT,
    assigned_to INTEGER,
    description TEXT,
    checked TEXT,
    approval TEXT,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES employee(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS project_workload (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id TEXT,
    employee_id INTEGER,
    employee_name TEXT,
    no_of_project INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE SET NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
  );
`);

// db.exec(`
//   INSERT INTO organization (organization_id, organization_name, organization_email)
//   VALUES
//     ('BOL123', 'Boltzmenn', 'boltzmenn@gmail.com'),
//     ('KUN456', 'Kunle Empire', 'kunle@gmail.com'),
//     ('LAM789', 'Lamdex', 'lamdex@gmail.com');

//   INSERT INTO employee (id, organization_id, employee_name, employee_email)
//   VALUES
//     ('ALI123', 'BOL123', 'Alice Johnson', 'alice.johnson@gmail.com'),
//     ('BOB456', 'BOL123', 'Bob Smith', 'bob.smith@gmail.com'),
//     ('CHA789', 'BOL123', 'Charlie Brown', 'charlie.brown@gmail.com'),
//     ('DAV101', 'KUN456', 'David Williams', 'david.williams@gmail.com'),
//     ('EVE202', 'KUN456', 'Eve Davis', 'eve.davis@gmail.com'),
//     ('FRA303', 'KUN456', 'Frank Miller', 'frank.miller@gmail.com'),
//     ('GRA404', 'LAM789', 'Grace Wilson', 'grace.wilson@gmail.com'),
//     ('HAN505', 'LAM789', 'Hank Moore', 'hank.moore@gmail.com'),
//     ('IVY606', 'LAM789', 'Ivy Taylor', 'ivy.taylor@gmail.com');

//   INSERT INTO project (organization_id, project_name, project_manager, due_date, status, progress)
//   VALUES
//     ('BOL123', 'Nesla Web Application', 'Alice Johnson', '2024-12-31', 'On going', 50),
//     ('BOL123', 'Datascale AI App', 'Bob Smith', '2024-11-30', 'Completed', 100),
//     ('BOL123', 'Photon E-commerce Platform', 'Charlie Brown', '2024-10-31', 'Delayed', 75),
//     ('KUN456', 'Quantum CRM System', 'David Williams', '2024-12-31', 'On going', 60),
//     ('KUN456', 'Nebula Analytics Dashboard', 'Eve Davis', '2024-11-30', 'Completed', 100),
//     ('KUN456', 'Orbit HR Management Tool', 'Frank Miller', '2024-10-31', 'Delayed', 80),
//     ('LAM789', 'Lyra Mobile Banking App', 'Grace Wilson', '2024-12-31', 'On going', 70),
//     ('LAM789', 'Vortex Social Media Platform', 'Hank Moore', '2024-11-30', 'Completed', 100),
//     ('LAM789', 'Hyperion Data Visualization Suite', 'Ivy Taylor', '2024-10-31', 'Delayed', 90);

//   INSERT INTO metric (organization_id, month, total_revenue, project, time, resource)
//   VALUES
//     ('BOL123', 'current_month', 100000, 110, 120, 80),
//     ('BOL123', 'previous_month', 150000, 100, 200, 90),
//     ('KUN456', 'current_month', 110000, 98, 130, 70),
//     ('KUN456', 'previous_month', 160000, 105, 210, 95),
//     ('LAM789', 'current_month', 120000, 60, 140, 75),
//     ('LAM789', 'previous_month', 170000, 110, 220, 100);

//   INSERT INTO progress (organization_id, total_project, completed_project, delayed_project, ongoing_project)
//   VALUES
//     ('BOL123', 110, 30, 10, 70),
//     ('KUN456', 98, 25, 8, 65),
//     ('LAM789', 60, 15, 20, 25);

//   INSERT INTO task_list (organization_id, assigned_to, description, checked, approval)
//   VALUES
//     ('BOL123', 'ALI123', 'Implement Authentication Module', 'Yes', 'Approved'),
//     ('BOL123', 'ALI123', 'Develop API Endpoints', 'No', 'In review'),
//     ('BOL123', 'ALI123', 'Setup CI/CD Pipeline', 'Yes', 'On going'),
//     ('BOL123', 'BOB456', 'Create Frontend Components', 'No', 'In review'),
//     ('BOL123', 'BOB456', 'Design Database Schema', 'Yes', 'In review'),
//     ('BOL123', 'BOB456', 'Write Unit Tests', 'No', 'In review'),
//     ('BOL123', 'CHA789', 'Optimize Backend Performance', 'Yes', 'On going'),
//     ('BOL123', 'CHA789', 'Implement Caching Strategy', 'No', 'Approved'),
//     ('BOL123', 'CHA789', 'Integrate Third-party Services', 'Yes', 'On going'),
//     ('KUN456', 'DAV101', 'Setup Project Environment', 'No', 'Approved'),
//     ('KUN456', 'DAV101', 'Develop User Management System', 'Yes', 'In review'),
//     ('KUN456', 'DAV101', 'Create Reporting Dashboard', 'No', 'On going'),
//     ('KUN456', 'EVE202', 'Implement Security Features', 'Yes', 'In review'),
//     ('KUN456', 'EVE202', 'Conduct Code Reviews', 'No', 'In review'),
//     ('KUN456', 'EVE202', 'Prepare Deployment Scripts', 'Yes', 'In review'),
//     ('KUN456', 'FRA303', 'Implement Payment Gateway', 'No', 'On going'),
//     ('KUN456', 'FRA303', 'Develop Notification System', 'Yes', 'Approved'),
//     ('KUN456', 'FRA303', 'Create Data Migration Plan', 'No', 'On going'),
//     ('LAM789', 'GRA404', 'Implement Logging System', 'Yes', 'Approved'),
//     ('LAM789', 'GRA404', 'Setup Monitoring Tools', 'No', 'In review'),
//     ('LAM789', 'GRA404', 'Conduct Performance Testing', 'Yes', 'On going'),
//     ('LAM789', 'HAN505', 'Develop Mobile App Interface', 'No', 'In review'),
//     ('LAM789', 'HAN505', 'Implement Push Notifications', 'Yes', 'In review'),
//     ('LAM789', 'HAN505', 'Create User Onboarding Process', 'No', 'In review'),
//     ('LAM789', 'IVY606', 'Design User Authentication Flow', 'Yes', 'On going'),
//     ('LAM789', 'IVY606', 'Implement Role-based Access Control', 'No', 'Approved'),
//     ('LAM789', 'IVY606', 'Setup Automated Backups', 'Yes', 'On going');

//   INSERT INTO project_workload (organization_id, employee_id, employee_name, no_of_project)
//   VALUES
//   ('BOL123', 'ALI123', 'Alice Johnson', 10),
//   ('BOL123', 'BOB456', 'Bob Smith', 5),
//   ('BOL123', 'CHA789', 'Charlie Brown', 8),
//   ('KUN456', 'DAV101', 'David Williams', 6),
//   ('KUN456', 'EVE202', 'Eve Davis', 9),
//   ('KUN456', 'FRA303', 'Frank Miller', 4),
//   ('LAM789', 'GRA404', 'Grace Wilson', 10),
//   ('LAM789', 'HAN505', 'Hank Moore', 3),
//   ('LAM789', 'IVY606', 'Ivy Taylor', 4);

// `);

export default db;
